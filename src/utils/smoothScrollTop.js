const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const CANCEL_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown']

/** Eased scroll to the top. Duration scales with distance (600-1100ms). */
export function smoothScrollTop() {
  const start = window.scrollY
  if (start <= 0) return

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return
  }

  const duration = Math.min(1100, Math.max(600, start * 0.35))
  const t0 = performance.now()
  let raf = 0

  const stop = () => {
    cancelAnimationFrame(raf)
    CANCEL_EVENTS.forEach((e) => window.removeEventListener(e, stop))
  }

  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration)
    window.scrollTo({ top: start * (1 - easeInOutCubic(p)), behavior: 'instant' })
    if (p < 1) raf = requestAnimationFrame(step)
    else stop()
  }

  CANCEL_EVENTS.forEach((e) => window.addEventListener(e, stop, { passive: true }))
  raf = requestAnimationFrame(step)
}
