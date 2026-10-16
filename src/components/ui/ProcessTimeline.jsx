/**
 * ProcessTimeline.jsx
 *
 * Same idea as the About page's ExperienceTimeline: a small timeline is pinned
 * on the left while the steps scroll past on the right. Instead of months, the
 * wheel holds the step numbers — the number for the step you are reading sits
 * on the highlighted row, and the wheel glides to the next one as that step's
 * heading approaches the middle of the screen.
 *
 * Each step is a normal block in the page flow: title, description and an
 * optional CTA, followed by optional `media` (e.g. the moodboard or the brand
 * direction panels) that reveals as you scroll. The next step only comes into
 * view once the previous one — media included — has scrolled past.
 *
 * Motion is written straight to the DOM each frame with easing (no React state
 * per scroll tick), like ExperienceTimeline.
 *
 * Props: steps = [{
 *   title, description,
 *   navTitle?,              // data-nav-title for the navbar
 *   cta?: { label, href },  // renders a CubeButton under the description
 *   media?: ReactNode,      // revealed below the text, inside the step
 * }]
 */
import { useEffect, useLayoutEffect, useRef } from 'react'
import ScrollRevealSection from './ScrollRevealSection'
import Reveal from './Reveal'
import CubeButton from './CubeButton'
import styles from './ProcessTimeline.module.css'

const VISIBLE_ROWS = 5
const CENTER = Math.floor(VISIBLE_ROWS / 2) // 2 → the 3rd row
const EASE = 0.18 // 0–1, how quickly the wheel catches up with the scroll
// The wheel turns to the next number while the next step's top travels this
// share of the viewport height up to the middle of the screen.
const SWITCH_SPAN = 0.6

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
const pad = (n) => String(n).padStart(2, '0')

export default function ProcessTimeline({ steps }) {
  const listRef = useRef(null)
  const numberRefs = useRef([])
  const blockRefs = useRef([])
  const s = useRef({ target: 0, current: 0, ready: false, frame: 0 })

  /** Draw the wheel at a fractional step position. Touches the DOM only. */
  const apply = (pos) => {
    const list = listRef.current
    if (!list) return
    list.style.setProperty('--pos', pos.toFixed(4))
    numberRefs.current.forEach((el, i) => {
      if (!el) return
      const dist = Math.abs(i - pos)
      const near = 1 - Math.min(dist, 1) // 1 on the highlighted row, 0 a step away
      const far = 1 - clamp(dist - 1, 0, 1)
      el.style.opacity = ((0.3 + 0.7 * near) * far).toFixed(3)
      el.style.transform = `scale(${(1 + 0.45 * near).toFixed(3)})`
    })
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
      const blocks = blockRefs.current
      const centerY = window.innerHeight / 2

      // Current step = the last one whose top has reached the middle of the screen
      let r = 0
      blocks.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= centerY) r = i
      })

      // Ease toward the next number as the next step's top nears the middle
      let t = 0
      const next = blocks[r + 1]
      if (next) {
        const span = window.innerHeight * SWITCH_SPAN
        t = clamp(1 - (next.getBoundingClientRect().top - centerY) / span, 0, 1)
      }

      st.target = r + t
      if (!st.ready) {
        st.ready = true
        st.current = st.target
        apply(st.current)
      }
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
  }, [steps.length])

  return (
    <section
      className={styles.section}
      style={{ '--visible': VISIBLE_ROWS, '--center': CENTER }}
      aria-label="Design process steps"
    >
      <div className={`container ${styles.layout}`}>

        {/* Number wheel + line, pinned while the steps scroll */}
        <div className={styles.railCol} aria-hidden="true">
          <div className={styles.rail}>
            <div className={styles.viewport}>
              <ol ref={listRef} className={styles.numberList}>
                {steps.map((step, i) => (
                  <li
                    key={step.title}
                    ref={(el) => { numberRefs.current[i] = el }}
                    className={styles.number}
                  >
                    {pad(i + 1)}
                  </li>
                ))}
              </ol>
            </div>
            <span className={styles.track}>
              <span className={styles.line} />
              <span className={styles.dot} />
            </span>
          </div>
        </div>

        <ol className={styles.list}>
          {steps.map((step, i) => (
            <li
              key={step.title}
              ref={(el) => { blockRefs.current[i] = el }}
              className={styles.block}
              data-nav-title={step.navTitle}
            >
              <ScrollRevealSection as="div" className={styles.text} threshold={0.25}>
                <Reveal variant="fadeUp" as="h3" className={styles.title}>{step.title}</Reveal>
                <Reveal variant="fadeUp" as="p" className={styles.desc}>{step.description}</Reveal>
                {step.cta && (
                  <Reveal variant="fadeUp" className={styles.cta}>
                    <CubeButton to={step.cta.href} variant="light" spaced>
                      {step.cta.label}
                    </CubeButton>
                  </Reveal>
                )}
              </ScrollRevealSection>

              {step.media && <div className={styles.media}>{step.media}</div>}
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
