import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { setSheetOrigin } from '../../hooks/sheetOrigin'
import {
  PINTEREST_GAP_ALLOWANCE,
  buildColumns,
  columnWidths,
  useColumnCount,
  useMeasure,
} from './MasonryGrid'
import styles from './PosterGrid.module.css'

/**
 * PosterGrid — the Posters page grid.
 *
 * 1. Every poster's width/height is read from the first bytes of its file, so
 *    the whole layout is known before any image shows. It is computed once and
 *    never changes: no tile moves or resizes when images arrive.
 * 2. Every slot shows a skeleton at its exact final size.
 * 3. Images load in reading order (top row first, then downwards), a few ahead
 *    of the one being revealed. Each image fades in only after it is fully
 *    decoded, one at a time, in that same order.
 */

const FALLBACK_RATIO = 1.25
const REVEAL_DELAY = 140 // ms between one poster appearing and the next
const PLACEHOLDER_RATIOS = [1.4, 1.2, 1.5]

/** height / width from the first bytes of a WebP or PNG file, or null. */
function ratioFromHeader(b) {
  const ascii = (from, len) => String.fromCharCode(...b.slice(from, from + len))

  if (b.length >= 30 && ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WEBP') {
    const type = ascii(12, 4)
    let w = 0
    let h = 0
    if (type === 'VP8X') {
      w = 1 + (b[24] | (b[25] << 8) | (b[26] << 16))
      h = 1 + (b[27] | (b[28] << 8) | (b[29] << 16))
    } else if (type === 'VP8L') {
      w = 1 + (((b[22] & 0x3f) << 8) | b[21])
      h = 1 + (((b[24] & 0x0f) << 10) | (b[23] << 2) | ((b[22] & 0xc0) >> 6))
    } else if (type === 'VP8 ') {
      w = (b[26] | (b[27] << 8)) & 0x3fff
      h = (b[28] | (b[29] << 8)) & 0x3fff
    }
    return w && h ? h / w : null
  }

  if (b.length >= 24 && b[0] === 0x89 && ascii(1, 3) === 'PNG') {
    const w = ((b[16] << 24) | (b[17] << 16) | (b[18] << 8) | b[19]) >>> 0
    const h = ((b[20] << 24) | (b[21] << 16) | (b[22] << 8) | b[23]) >>> 0
    return w && h ? h / w : null
  }

  return null
}

/** Reads just the header of an image to get its height/width ratio. */
async function measureRatio(src) {
  try {
    const res = await fetch(src, { headers: { Range: 'bytes=0-4095' } })
    const reader = res.body.getReader()
    const chunks = []
    let total = 0
    while (total < 64) {
      const { value, done } = await reader.read()
      if (done) break
      chunks.push(value)
      total += value.length
    }
    reader.cancel()
    const bytes = new Uint8Array(total)
    let offset = 0
    chunks.forEach((chunk) => {
      bytes.set(chunk, offset)
      offset += chunk.length
    })
    const ratio = ratioFromHeader(bytes)
    if (ratio) return ratio
  } catch {
    // fall through to the slower image-decode measurement
  }
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img.naturalHeight / img.naturalWidth || FALLBACK_RATIO)
    img.onerror = () => resolve(FALLBACK_RATIO)
    img.src = src
  })
}

/** Measured once per image for the whole session, so reopening the grid is instant. */
const ratioCache = new Map()
function probeRatio(src) {
  if (!ratioCache.has(src)) ratioCache.set(src, measureRatio(src))
  return ratioCache.get(src)
}

/** Ratios for every poster, or null until all of them are known. */
function useRatios(projects) {
  const [ratios, setRatios] = useState(null)

  useEffect(() => {
    let cancelled = false
    Promise.all(projects.map((p) => probeRatio(p.coverImage))).then((list) => {
      if (cancelled) return
      const map = {}
      projects.forEach((p, i) => {
        map[p.coverImage] = list[i]
      })
      setRatios(map)
    })
    return () => {
      cancelled = true
    }
  }, [projects])

  return ratios
}

function Tile({ project, ratio, visible, replace }) {
  return (
    <Link
      to={`/posters/${project.slug}`}
      replace={replace}
      onClick={(e) => setSheetOrigin(e.currentTarget)}
      className={`${styles.tile} ${visible ? styles.loaded : ''}`}
      style={{ aspectRatio: `1 / ${ratio}` }}
      data-nav-hover={project.title}
      aria-label={project.title}
    >
      {visible && (
        <img className={styles.img} src={project.coverImage} alt={project.title} decoding="async" />
      )}
    </Link>
  )
}

export default function PosterGrid({ projects, replace = false }) {
  const columnCount = useColumnCount(true)
  const ratios = useRatios(projects)
  const gridRef = useRef(null)
  const { width, gap } = useMeasure(gridRef)
  const [shown, setShown] = useState(0)

  // Column layout — depends only on the posters' shapes, so it is fixed.
  const columns = useMemo(
    () =>
      ratios ? buildColumns(projects, columnCount, ratios, true, PINTEREST_GAP_ALLOWANCE) : null,
    [projects, columnCount, ratios]
  )

  // Reading order: top of the page first, left to right within a row.
  const order = useMemo(() => {
    if (!columns) return []
    const rows = []
    columns.forEach((column, c) => {
      let top = 0
      column.forEach((p) => {
        rows.push({ p, c, top })
        top += ratios[p.coverImage] + PINTEREST_GAP_ALLOWANCE
      })
    })
    rows.sort((a, b) => a.top - b.top || a.c - b.c)
    return rows.map((r) => r.p)
  }, [columns, ratios])

  const rank = useMemo(() => new Map(order.map((p, i) => [p.id, i])), [order])

  const widths = useMemo(() => {
    if (!columns || !width) return null
    return (
      columnWidths(columns, ratios, width, gap) ??
      columns.map(() => (width - gap * (columns.length - 1)) / columns.length)
    )
  }, [columns, ratios, width, gap])

  // Loader: preload a few posters ahead, reveal them strictly in order.
  useEffect(() => {
    setShown(0)
    if (order.length === 0) return undefined

    let cancelled = false
    let timer = null
    let revealed = 0
    let next = 0
    const ready = new Array(order.length).fill(false)
    const windowSize = columnCount * 2

    const advance = () => {
      if (cancelled || timer || revealed >= order.length || !ready[revealed]) return
      timer = setTimeout(
        () => {
          timer = null
          revealed += 1
          setShown(revealed)
          pump()
          advance()
        },
        revealed === 0 ? 0 : REVEAL_DELAY
      )
    }

    const start = (i) => {
      const img = new Image()
      img.fetchPriority = i < columnCount ? 'high' : 'low'
      img.src = order[i].coverImage
      const done = () => {
        ready[i] = true
        advance()
      }
      if (img.decode) img.decode().then(done, done)
      else {
        img.onload = done
        img.onerror = done
      }
    }

    const pump = () => {
      while (next < order.length && next < revealed + windowSize) {
        start(next)
        next += 1
      }
    }

    pump()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [order, columnCount])

  return (
    <div ref={gridRef} className={styles.grid}>
      {columns && widths
        ? columns.map((column, c) => (
            <div key={c} className={styles.column} style={{ flex: `0 0 ${widths[c]}px` }}>
              {column.map((project) => (
                <Tile
                  key={project.id}
                  project={project}
                  ratio={ratios[project.coverImage]}
                  visible={rank.get(project.id) < shown}
                  replace={replace}
                />
              ))}
            </div>
          ))
        : Array.from({ length: columnCount }, (_, c) => (
            <div key={c} className={styles.column}>
              {[0, 1, 2].map((r) => (
                <div
                  key={r}
                  className={styles.tile}
                  style={{ aspectRatio: `1 / ${PLACEHOLDER_RATIOS[(c + r) % 3]}` }}
                />
              ))}
            </div>
          ))}
    </div>
  )
}
