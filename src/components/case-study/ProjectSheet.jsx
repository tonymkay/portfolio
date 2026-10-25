
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { ScrollRootContext } from '../../hooks/scrollRoot'
import { clearSheetOrigin, getSheetOrigin } from '../../hooks/sheetOrigin'
import ProjectSideRail from './ProjectSideRail'
import styles from './ProjectSheet.module.css'

const CLOSE_MS = 260 // fallback exit (no tile to shrink back into)
const GROW_MS = 620 // tile → sheet
const SHRINK_MS = 400 // sheet → tile
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_IN = 'cubic-bezier(0.5, 0, 0.75, 0)'
const SHEET_RADIUS = 0 // full page: square corners once fully open
const TILE_RADIUS = 16

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * clip-path that frames the clicked tile, expressed relative to the sheet's
 * own box. Animating from this to `inset(0 round …)` makes the sheet look
 * like it grows out of the tile (content stays undistorted).
 */
function tileClip(sheetEl, origin) {
  const s = sheetEl.getBoundingClientRect()
  const top = origin.top - s.top
  const left = origin.left - s.left
  const right = s.right - (origin.left + origin.width)
  const bottom = s.bottom - (origin.top + origin.height)
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${TILE_RADIUS}px)`
}

const FULL_CLIP = `inset(0px 0px 0px 0px round ${SHEET_RADIUS}px)`

/**
 * ProjectSheet — shows a case study as a full page over the listing. The
 * page scrolls on its own (inner scroller), tells scroll-aware children
 * (progress bar) which element is scrolling, and carries the action bar
 * (close / visit website / Figma / contact) pinned at the bottom centre,
 * inside the page itself.
 *
 * Opening: when the project was opened from a tile, the page expands out of
 * that tile; closing shrinks it back into the tile. (Opened any other way —
 * direct link, "Other projects" — it just rises in.)
 *
 * Closing (X, Esc) plays the exit and then returns to `closeTo`. The page
 * behind stays mounted, so the listing keeps its scroll position.
 */
export default function ProjectSheet({ website, prototype, closeTo = '/ui-ux', children }) {
  const navigate = useNavigate()
  const sheetRef = useRef(null)
  const [scrollEl, setScrollEl] = useState(null)
  const [closing, setClosing] = useState(false)
  const closeTimer = useRef(0)

  // Tile this sheet grows out of (null = no tile → plain rise-in)
  const [origin] = useState(() => (prefersReducedMotion() ? null : getSheetOrigin()))

  const setScroller = useCallback((node) => {
    setScrollEl(node)
  }, [])

  // Grow out of the tile
  useLayoutEffect(() => {
    const el = sheetRef.current
    if (!origin || !el) return undefined
    const anim = el.animate(
      [
        { clipPath: tileClip(el, origin), opacity: 0.25 },
        { clipPath: FULL_CLIP, opacity: 1 },
      ],
      { duration: GROW_MS, easing: EASE_OUT },
    )
    return () => anim.cancel()
  }, [origin])

  const close = useCallback(() => {
    if (closing) return
    setClosing(true)

    const el = sheetRef.current
    if (origin && el) {
      el.animate(
        [
          { clipPath: FULL_CLIP, opacity: 1 },
          { clipPath: tileClip(el, origin), opacity: 0 },
        ],
        { duration: SHRINK_MS, easing: EASE_IN, fill: 'forwards' },
      )
      closeTimer.current = setTimeout(() => navigate(closeTo), SHRINK_MS)
    } else {
      closeTimer.current = setTimeout(() => navigate(closeTo), CLOSE_MS)
    }
  }, [closing, navigate, closeTo, origin])

  // Esc closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  // Lock the page behind the sheet (and tuck the navbar away — the sheet
  // runs almost to the top edge); restore on the way out.
  //
  // The listing must not move at all while this happens. Hiding the body's
  // overflow removes the page scrollbar, which would widen the layout and
  // re-centre it. So if a scrollbar is showing, reserve its gutter first
  // (scrollbar-gutter: stable keeps that space even with overflow hidden).
  // Done in a layout effect so it lands before the sheet's first paint.
  useLayoutEffect(() => {
    const root = document.documentElement
    const prevOverflow = document.body.style.overflow
    const prevGutter = root.style.scrollbarGutter
    const hasScrollbar = window.innerWidth > root.clientWidth

    if (hasScrollbar) root.style.scrollbarGutter = 'stable'
    document.body.style.overflow = 'hidden'
    document.body.dataset.sheetOpen = 'true'
    return () => {
      document.body.style.overflow = prevOverflow
      root.style.scrollbarGutter = prevGutter
      delete document.body.dataset.sheetOpen
      clearTimeout(closeTimer.current)
      clearSheetOrigin()
    }
  }, [])

  const cls = [
    styles.overlay,
    origin ? styles.fromTile : '',
    closing ? styles.closing : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls} role="dialog" aria-modal="true">
      {/* The animated full-page frame. The scroller fills it; the close button
          (top right) and the action bar (bottom centre) live inside the frame,
          not the scroller, so they stay put while the page scrolls and grow /
          shrink together with the page. */}
      <div className={styles.sheet} ref={sheetRef}>
        <div className={styles.scroller} ref={setScroller}>
          <ScrollRootContext.Provider value={scrollEl}>{scrollEl && children}</ScrollRootContext.Provider>
        </div>

        <button
          type="button"
          className={styles.closeBtn}
          data-label="Close"
          aria-label="Close project"
          onClick={close}
        >
          <X size={16} strokeWidth={1.75} />
        </button>

        <ProjectSideRail website={website} prototype={prototype} />
      </div>
    </div>
  )
}
