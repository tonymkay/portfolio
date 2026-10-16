/**
 * StepsArc.jsx
 *
 * Pinned "dial" timeline for a short list of steps. A small circle sits beside
 * the step text, both centred on the page. There is ONE number per step and it
 * lives on the dial: as you scroll the dial turns, the number reaching the
 * pointer grows big, and the one leaving shrinks back to a small tilted label.
 * The step text next to the dial switches when a number snaps to the pointer.
 * Motion is written straight to the DOM each frame (no React state per tick).
 *
 * Props: items = [{ number, title, description }]
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CubeButton from './CubeButton'
import styles from './StepsArc.module.css'

const STEP_DEG = 15 // angle between neighbouring steps (small = gentle curve)
const EASE = 0.14 // 0–1, how quickly the dial catches up with the scroll
const EXTRA_TICKS = 4 // empty dots shown before / after the real steps
const SMALL = 0.3 // size of a number that is away from the pointer (1 = big)

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
const pad = (n) => String(n).padStart(2, '0')

export default function StepsArc({ items, className }) {
  const count = items.length
  const sectionRef = useRef(null)
  const dotsWheelRef = useRef(null)
  const labelsWheelRef = useRef(null)
  const labelRefs = useRef([])
  const [active, setActive] = useState(0)
  const s = useRef({ target: 0, current: 0, idx: -1, frame: 0 })

  /** Draw the dial at a fractional step position. Touches the DOM only. */
  const apply = (pos) => {
    const st = s.current
    const turn = `rotate(${(-pos * STEP_DEG).toFixed(3)}deg)`
    if (dotsWheelRef.current) dotsWheelRef.current.style.transform = turn
    if (labelsWheelRef.current) labelsWheelRef.current.style.transform = turn

    labelRefs.current.forEach((el, i) => {
      if (!el) return
      // 1 when the number sits on the pointer, 0 when a full step away
      const dist = Math.abs(i - pos)
      const near = 1 - Math.min(dist, 1)
      const e = near * near * (3 - 2 * near) // smoothstep
      // numbers more than one step away fade out completely by two steps
      const far = 1 - clamp(dist - 1, 0, 1)
      el.style.transform = `translateY(-50%) scale(${(SMALL + (1 - SMALL) * e).toFixed(3)})`
      el.style.opacity = ((0.35 + 0.65 * e) * far).toFixed(3)
    })

    const idx = clamp(Math.round(pos), 0, count - 1)
    if (idx !== st.idx) {
      st.idx = idx
      setActive(idx)
    }
  }

  useLayoutEffect(() => {
    apply(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const st = s.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduceMotion ? 1 : EASE

    const step = () => {
      st.frame = 0
      const diff = st.target - st.current
      st.current = Math.abs(diff) < 0.002 ? st.target : st.current + diff * ease
      apply(st.current)
      if (st.current !== st.target) st.frame = requestAnimationFrame(step)
    }

    const measure = () => {
      const el = sectionRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const p = total > 0 ? clamp(-el.getBoundingClientRect().top / total, 0, 1) : 0
      st.target = p * (count - 1)
      if (!st.frame) st.frame = requestAnimationFrame(step)
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      if (st.frame) cancelAnimationFrame(st.frame)
      st.frame = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const ticks = Array.from({ length: count + EXTRA_TICKS * 2 }, (_, k) => k - EXTRA_TICKS)
  const current = items[active]

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${className || ''}`}
      style={{ '--n': count }}
      aria-label="Design process steps"
    >
      <div className={styles.stage}>

        {/* Small turning dial — decorative; the text beside it is the real content */}
        <div className={styles.dial} aria-hidden="true">

          {/* 1 + 2. circle + dots, with a soft fade around the pointer (clipped box) */}
          <div className={styles.clip}>
            <div ref={dotsWheelRef} className={`${styles.wheel} ${styles.dotsWheel}`}>
              <span className={styles.circle} />
              {ticks.map((i) => (
                <span
                  key={i}
                  className={styles.arm}
                  style={{ transform: `rotate(${i * STEP_DEG}deg)` }}
                >
                  <span className={`${styles.dot} ${i >= 0 && i < count ? styles.dotReal : ''}`} />
                </span>
              ))}
            </div>
            <span className={styles.fade} />
          </div>

          {/* 3. the numbers — one per step, same rotation as the circle */}
          <div ref={labelsWheelRef} className={`${styles.wheel} ${styles.labelsWheel}`}>
            {items.map((item, i) => (
              <span
                key={item.number}
                className={styles.arm}
                style={{ transform: `rotate(${i * STEP_DEG}deg)` }}
              >
                <span ref={(el) => { labelRefs.current[i] = el }} className={styles.label}>
                  {pad(i + 1)}
                </span>
              </span>
            ))}
          </div>

          {/* Fixed marker on the rim, level with the text */}
          <span className={styles.pointer} />
        </div>

        <div key={active} className={styles.content} aria-live="polite">
          <span className={styles.sr}>Step {active + 1}</span>
          <h3 className={styles.title}>{current.title}</h3>
          <p className={styles.desc}>{current.description}</p>
          {active === 0 && (
            <CubeButton to="/contact" variant="light" spaced style={{ marginTop: '1.25rem' }}>
              Book a Call ↗
            </CubeButton>
          )}
        </div>

      </div>
    </section>
  )
}
