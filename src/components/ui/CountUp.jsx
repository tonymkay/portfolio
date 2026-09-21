import { useEffect, useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * CountUp — a number that counts from 0 up to `to`, either the first time
 * it scrolls into view on its own, or when a parent tells it to.
 *
 * Props:
 *   to        — final value
 *   duration  — ms for the whole count (default 1800)
 *   delay     — ms to wait after it's told to start (default 0). Use a small
 *               per-item value (e.g. i * 120) to cascade a row of counters —
 *               NOT to wait out a separate reveal animation. If `active` is
 *               driven by the same trigger as a parent fade/slide-in, the
 *               count starts in step with it instead of fighting it.
 *   active    — optional controlled visibility (boolean). When provided,
 *               this drives the count instead of CountUp's own scroll
 *               detection — pass the same `isVisible` your reveal animation
 *               uses so both fire off one shared trigger.
 *   pad       — minimum digits, zero-padded (default 2 → "08"); use 1 for none
 *   className — passed to the wrapper
 *
 * Accessibility: the moving digits are aria-hidden and the final value is
 * exposed once in visually-hidden text, so screen readers don't read every step.
 * Users who prefer reduced motion see the final value straight away.
 * Pair it with `font-variant-numeric: tabular-nums` so digits don't jitter.
 */
export default function CountUp({ to, duration = 1800, delay = 0, pad = 2, active, className = '' }) {
  const { ref, isVisible: autoVisible } = useScrollReveal(0.4)
  const isVisible = active !== undefined ? active : autoVisible
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return undefined
    }

    let frame
    let timeout
    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        setValue(Math.round(easeOutCubic(progress) * to))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    timeout = setTimeout(run, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [isVisible, to, duration, delay])

  const format = (n) => String(n).padStart(pad, '0')

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{format(value)}</span>
      <span className="visually-hidden">{format(to)}</span>
    </span>
  )
}
