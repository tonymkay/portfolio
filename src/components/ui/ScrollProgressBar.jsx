import { useEffect, useRef } from 'react'
import { useScrollRoot } from '../../hooks/scrollRoot'
import styles from './ScrollProgressBar.module.css'

// Smoothing time constant (seconds). Lower = snappier, higher = floatier.
const TAU = 0.1

/**
 * Reading-progress pill for a `position: relative` bar. Thin at the top of
 * the page, grows thick once scrolling starts. Rounded track + rounded fill,
 * teal with a green shimmer flowing against the fill direction.
 *
 * Smoothness: a rAF loop eases the fill toward the real scroll progress with
 * a frame-rate-independent exponential lerp. The loop sleeps when caught up.
 * No React state — everything is written straight to the DOM.
 */
export default function ScrollProgressBar() {
  const root = useScrollRoot()
  const trackRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const fill = fillRef.current
    if (!track || !fill) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let current = 0
    let target = 0
    let raf = 0
    let last = 0

    const readScroll = () => {
      if (root) {
        const max = root.scrollHeight - root.clientHeight
        const y = root.scrollTop
        return { y, p: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0 }
      }
      const el = document.documentElement
      const y = window.scrollY || el.scrollTop
      const max = el.scrollHeight - window.innerHeight
      return { y, p: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0 }
    }

    const paint = () => {
      fill.style.width = `${(current * 100).toFixed(3)}%`
    }

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      current += (target - current) * (1 - Math.exp(-dt / TAU))
      if (Math.abs(target - current) < 0.0004) {
        current = target
        paint()
        raf = 0
        return
      }
      paint()
      raf = requestAnimationFrame(tick)
    }

    const wake = () => {
      const { y, p } = readScroll()
      target = p
      track.dataset.active = y > 2 ? 'true' : 'false'
      if (reduced) {
        current = target
        paint()
        return
      }
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    // Initial state: no animation from 0 on mount.
    const init = readScroll()
    target = init.p
    current = init.p
    track.dataset.active = init.y > 2 ? 'true' : 'false'
    paint()

    const scroller = root ?? window
    scroller.addEventListener('scroll', wake, { passive: true })
    window.addEventListener('resize', wake)
    // Page height changes as images load.
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(wake) : null
    if (root) {
      ro?.observe(root)
      if (root.firstElementChild) ro?.observe(root.firstElementChild)
    } else {
      ro?.observe(document.body)
    }

    return () => {
      scroller.removeEventListener('scroll', wake)
      window.removeEventListener('resize', wake)
      ro?.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [root])

  return (
    <div className={styles.lane} aria-hidden="true">
      <div ref={trackRef} className={styles.track} data-active="false">
        <div ref={fillRef} className={styles.fill} />
      </div>
    </div>
  )
}
