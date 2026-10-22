import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './MasonryGrid.module.css'

/** 1 column on phones, 2 on large phones, 3 on tablets, 4 on desktop. */
function getColumnCount() {
  if (typeof window === 'undefined') return 4
  if (window.matchMedia('(min-width: 1024px)').matches) return 4
  if (window.matchMedia('(min-width: 768px)').matches) return 3
  if (window.matchMedia('(min-width: 640px)').matches) return 2
  return 1
}

/** Pinterest density: 2 columns even on phones, up to 5 on wide screens. */
function getPinterestColumnCount() {
  if (typeof window === 'undefined') return 5
  if (window.matchMedia('(min-width: 1440px)').matches) return 5
  if (window.matchMedia('(min-width: 1024px)').matches) return 4
  if (window.matchMedia('(min-width: 768px)').matches) return 3
  return 2
}

function useColumnCount(pinterest) {
  const read = pinterest ? getPinterestColumnCount : getColumnCount
  const [count, setCount] = useState(read)

  useEffect(() => {
    const onResize = () => setCount(read())
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [read])

  return count
}

/** Loads each cover once and records its height/width ratio. */
function useImageRatios(projects) {
  const [ratios, setRatios] = useState({})
  const requested = useRef(new Set())

  useEffect(() => {
    projects.forEach(({ coverImage: src }) => {
      if (requested.current.has(src)) return
      requested.current.add(src)
      const img = new Image()
      const done = (ratio) => setRatios((prev) => ({ ...prev, [src]: ratio }))
      img.onload = () => done(img.naturalHeight / img.naturalWidth || 1)
      img.onerror = () => done(1)
      img.src = src
    })
  }, [projects])

  return ratios
}

// Small allowance per tile for the gap between tiles (as a share of tile width).
const GAP_ALLOWANCE = 0.04
const PINTEREST_GAP_ALLOWANCE = 0.065

// How much a tile sitting out of its natural reading order costs, compared
// with the columns ending at different heights (both measured in tile widths).
const ORDER_WEIGHT = 0.02

/**
 * Deal projects into columns so the bottoms of all columns end level, even
 * when one image is much taller than the rest (e.g. a roll-up banner).
 *
 * 1. Start with the simple approach: each project goes to the currently
 *    shortest column.
 * 2. Then improve it: try moving single tiles to other columns and swapping
 *    pairs of tiles, keeping any change that shrinks the gap between the
 *    tallest and shortest column. A small penalty for pulling tiles far out
 *    of their original order keeps the layout reading roughly left-to-right.
 *
 * Until image ratios are known it falls back to a plain round-robin.
 */
function buildColumns(projects, count, ratios, ready, gapAllowance = GAP_ALLOWANCE) {
  const n = projects.length

  if (!ready || count < 2 || n < 2) {
    const columns = Array.from({ length: count }, () => [])
    projects.forEach((project, i) => columns[i % count].push(project))
    return columns
  }

  const h = projects.map((p) => (ratios[p.coverImage] ?? 1) + gapAllowance)

  // ── 1. greedy start ──
  const col = new Array(n)
  const start = new Array(count).fill(0)
  h.forEach((height, i) => {
    let target = 0
    for (let c = 1; c < count; c++) {
      if (start[c] < start[target] - 0.001) target = c
    }
    col[i] = target
    start[target] += height
  })

  // Column spread plus a small penalty for out-of-order tiles.
  const cost = () => {
    const heights = new Array(count).fill(0)
    const tops = new Array(n)
    for (let i = 0; i < n; i++) {
      tops[i] = heights[col[i]]
      heights[col[i]] += h[i]
    }
    const spread = Math.max(...heights) - Math.min(...heights)
    const readingOrder = Array.from({ length: n }, (_, i) => i).sort(
      (a, b) => tops[a] - tops[b] || col[a] - col[b]
    )
    let displacement = 0
    readingOrder.forEach((item, rank) => {
      displacement += Math.abs(item - rank)
    })
    return spread + ORDER_WEIGHT * displacement
  }

  // ── 2. improve by moves and swaps ──
  let best = cost()
  let improved = true
  for (let pass = 0; improved && pass < 40; pass++) {
    improved = false

    for (let i = 0; i < n; i++) {
      const original = col[i]
      for (let c = 0; c < count; c++) {
        if (c === original) continue
        col[i] = c
        const value = cost()
        if (value < best - 1e-9) {
          best = value
          improved = true
          break
        }
        col[i] = original
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (col[i] === col[j]) continue
        ;[col[i], col[j]] = [col[j], col[i]]
        const value = cost()
        if (value < best - 1e-9) {
          best = value
          improved = true
        } else {
          ;[col[i], col[j]] = [col[j], col[i]]
        }
      }
    }
  }

  const columns = Array.from({ length: count }, () => [])
  projects.forEach((project, i) => columns[col[i]].push(project))
  return columns
}

/** Tracks the grid's pixel width and its column gap (px). */
function useMeasure(ref) {
  const [size, setSize] = useState({ width: 0, gap: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const read = () => {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      setSize({ width: el.getBoundingClientRect().width, gap })
    }
    read()
    const observer = new ResizeObserver(read)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return size
}

/**
 * Column widths (px) that make every column exactly the same height.
 * A column's height is width × (sum of its poster ratios) + its inner gaps, so
 * giving each column the width that solves "all heights equal" while the widths
 * add up to the grid width lines every bottom edge up. Posters always fill their
 * column's width, uncropped. Returns null until it can be computed.
 */
function columnWidths(columns, ratios, width, gap) {
  if (!width) return null
  const sums = columns.map((column) =>
    column.reduce((total, p) => total + (ratios[p.coverImage] ?? 1), 0)
  )
  if (sums.some((s) => s === 0)) return null
  const inner = columns.map((column) => Math.max(column.length - 1, 0))
  const available = width - gap * (columns.length - 1)
  const inverse = sums.reduce((total, s) => total + 1 / s, 0)
  const extra = inner.reduce((total, n, i) => total + (n * gap) / sums[i], 0)
  const height = (available + extra) / inverse
  return sums.map((s, i) => (height - inner[i] * gap) / s)
}

/**
 * MasonryGrid — staggered, image-driven project grid (Logos & Identities).
 *
 * Every tile is the same width; its height comes from the cover image's own
 * ratio, so the columns stagger. Tiles have rounded corners and a white
 * background. On hover a black overlay fades in with a "View Project" button.
 *
 * Columns are balanced by real image height (see buildColumns), so no column
 * ends up much longer than the others. The grid stays hidden for a moment
 * while the covers load, then appears already balanced.
 *
 * Props:
 *   projects — array of project objects (id, slug, title, coverImage)
 *   basePath — route prefix, each tile links to `${basePath}/${slug}`
 *   linkable — when false, tiles are plain images: no link to a detail page
 *              and no hover overlay / "View Project" button (default true)
 *   pinterest — denser, Pinterest-style layout: more (smaller) columns, wider
 *              gaps, softer corners, no hover zoom (default false)
 *
 * Tiles appear straight away — no scroll-reveal animation.
 */
export default function MasonryGrid({ projects, basePath, linkable = true, pinterest = false, batchSize = 0 }) {
  const columnCount = useColumnCount(pinterest)
  const total = projects.length

  // Batched loading: `requested` images are being preloaded; `shownCount` are
  // on screen. A batch is shown only once all of its images have loaded, then
  // the next batch is requested when the bottom of the grid nears the viewport.
  const [requested, setRequested] = useState(batchSize > 0 ? Math.min(batchSize, total) : total)
  const [shownCount, setShownCount] = useState(0)
  const sentinelRef = useRef(null)

  const loading = useMemo(() => projects.slice(0, requested), [projects, requested])
  const ratios = useImageRatios(loading)
  const loaded = loading.every((p) => ratios[p.coverImage])
  const visibleProjects = useMemo(() => projects.slice(0, shownCount), [projects, shownCount])
  const ready = shownCount > 0 || total === 0

  useEffect(() => {
    if (loaded && shownCount < requested) setShownCount(requested)
  }, [loaded, requested, shownCount])

  useEffect(() => {
    if (batchSize <= 0 || !loaded || shownCount < requested || requested >= total) return undefined
    const el = sentinelRef.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRequested((r) => Math.min(r + batchSize, total))
      },
      { rootMargin: '600px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [batchSize, loaded, shownCount, requested, total])

  const gridRef = useRef(null)
  const { width, gap } = useMeasure(gridRef)

  const columns = useMemo(
    () =>
      buildColumns(
        visibleProjects,
        columnCount,
        ratios,
        ready,
        pinterest ? PINTEREST_GAP_ALLOWANCE : GAP_ALLOWANCE
      ),
    [visibleProjects, columnCount, ratios, ready, pinterest]
  )

  const widths = ready ? columnWidths(columns, ratios, width, gap) : null

  return (
    <>
    <div
      ref={gridRef}
      className={`${styles.masonry} ${pinterest ? styles.pinterest : ''} ${ready ? '' : styles.pending}`}
    >
      {columns.map((column, c) => (
        <div
          key={c}
          className={styles.column}
          style={widths ? { flex: `0 0 ${widths[c]}px` } : undefined}
        >
          {column.map((project, i) =>
            linkable ? (
              <Link
                key={project.id}
                to={`${basePath}/${project.slug}`}
                className={styles.tile}
                aria-label={`View ${project.title} project`}
                data-nav-hover={project.title}
              >
                <img src={project.coverImage} alt={project.title} loading={i === 0 ? 'eager' : 'lazy'} />
                <span className={styles.overlay} aria-hidden="true">
                  <span className={styles.button}>View Project</span>
                </span>
              </Link>
            ) : (
              <div
                key={project.id}
                className={`${styles.tile} ${styles.static}`}
                data-nav-hover={project.title}
              >
                <img src={project.coverImage} alt={project.title} loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            )
          )}
        </div>
      ))}
    </div>
    {batchSize > 0 && <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />}
    </>
  )
}
