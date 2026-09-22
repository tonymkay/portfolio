/**
 * ExperienceTimeline.jsx
 *
 * One timeline pinned on the left while the company cards scroll past on the
 * right. The timeline is a wheel of 7 months: the middle (4th) row is always
 * the highlighted month and the months glide up to it as you scroll. Motion is
 * written straight to the DOM each frame with easing (no React state per
 * scroll tick), so it stays smooth.
 *
 * The wheel is one unbroken list of every month from today back to the first
 * role's start (newest → oldest). Each card owns a slice of that list. The page
 * scrolls normally; the wheel speeds up or slows down so each company's months
 * pass through the middle row while that company is on screen.
 *
 * Each role needs `start: [year, month]` and `end: [year, month] | null`
 * (null = present) in siteContent.js.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ScrollRevealSection from './ScrollRevealSection'
import Reveal from './Reveal'
import styles from './ExperienceTimeline.module.css'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const VISIBLE_MONTHS = 7
const CENTER = Math.floor(VISIBLE_MONTHS / 2) // 3 → the 4th row
const EASE = 0.2 // 0–1, how quickly the wheel catches up with the scroll

const MAX_STEP = 0.6

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

/** One unbroken month list, newest first, plus each company's slice of it */
function buildAllMonths(roles) {
  const now = new Date()
  const endKey = now.getFullYear() * 12 + now.getMonth()
  const startKey = Math.min(...roles.map((r) => r.start[0] * 12 + r.start[1] - 1))
  const months = []
  for (let k = endKey; k >= startKey; k -= 1) {
    months.push({ label: MONTH_NAMES[k % 12], year: Math.floor(k / 12) })
  }
  const indexOf = ([y, m]) => endKey - (y * 12 + m - 1)
  const slices = roles.map((r, i) => {
    const to = indexOf(r.start)
    const from = i === 0 ? 0 : Math.min(indexOf(roles[i - 1].start) + 1, to)
    return { from, to, count: to - from + 1 }
  })
  return { months, slices }
}

/** Years shown above / below the line = first and last month currently in view */
function yearsFor(months, idx) {
  const top = months[clamp(idx - CENTER, 0, months.length - 1)].year
  const bottom = months[clamp(idx + CENTER, 0, months.length - 1)].year
  return [top, bottom]
}

function PinnedTimeline({ months, slices, cardRefs }) {
  const [years, setYears] = useState(() => yearsFor(months, 0))
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const s = useRef({
    target: 0,
    current: 0,
    idx: -1,
    ready: false,
    frame: 0,
  })

  /** Draw the wheel at a fractional month position. Touches the DOM only. */
  const apply = (pos) => {
    const st = s.current
    const list = listRef.current
    if (!list) return

    list.style.setProperty('--pos', pos.toFixed(4))
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const d = Math.abs(i - pos)
      el.style.opacity = clamp(1 - d * 0.3, 0, 1).toFixed(3)
    })

    const idx = Math.round(pos)
    if (idx !== st.idx) {
      st.idx = idx
      setYears(yearsFor(months, idx))
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
    const limit = reduceMotion ? Infinity : MAX_STEP

    const step = () => {
      st.frame = 0
      const diff = st.target - st.current
      const move = clamp(diff * ease, -limit, limit)
      st.current = Math.abs(diff) < 0.002 ? st.target : st.current + move
      apply(st.current)
      if (st.current !== st.target) st.frame = requestAnimationFrame(step)
    }

    const kick = () => {
      if (!st.frame) st.frame = requestAnimationFrame(step)
    }

    const measure = () => {
      const cards = cardRefs.current
      const centerY = window.innerHeight / 2

      const first = cards[0]
      const second = cards[1]
      const gap = first && second
        ? second.getBoundingClientRect().top - first.getBoundingClientRect().bottom
        : 0

      let r = 0
      cards.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top - gap / 2 <= centerY) r = i
      })
      const card = cards[r]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const slice = slices[r]
      const start = rect.top - gap / 2
      const nextCard = cards[r + 1]

      if (nextCard) {
        const pitch = nextCard.getBoundingClientRect().top - rect.top
        const t = pitch > 0 ? clamp((centerY - start) / pitch, 0, 1) : 0
        st.target = slice.from + t * slice.count
      } else {
        const half = rootRef.current ? rootRef.current.offsetHeight / 2 : 0
        const span = rect.bottom - half - start
        const t = span > 0 ? clamp((centerY - start) / span, 0, 1) : 0
        st.target = slice.from + t * (slice.count - 1)
      }
      st.target = Math.min(st.target, months.length - 1)

      if (!st.ready) {
        st.ready = true
        st.current = st.target
        apply(st.current)
      }
      kick()
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
  }, [months, slices])

  return (
    <div ref={rootRef} className={styles.timeline}>
      <span className={`${styles.year} ${styles.yearTop}`}>{years[0]}</span>

      <div className={styles.monthsViewport}>
        <ol ref={listRef} className={styles.monthList}>
          {months.map((m, i) => (
            <li
              key={`${m.year}-${m.label}`}
              ref={(el) => { itemRefs.current[i] = el }}
              className={styles.month}
            >
              {m.label}
            </li>
          ))}
        </ol>
      </div>

      <span className={styles.line} />

      <span className={`${styles.year} ${styles.yearBottom}`}>{years[1]}</span>
    </div>
  )
}

export default function ExperienceTimeline({ roles, years }) {
  const cardRefs = useRef([])
  const { months, slices } = useMemo(() => buildAllMonths(roles), [roles])

  return (
    <section
      className={styles.section}
      style={{ '--visible': VISIBLE_MONTHS, '--center': CENTER }}
      aria-label="Experience"
    >
      <div className={`container ${styles.inner}`}>

        <ScrollRevealSection as="header" className={styles.header}>
          <Reveal variant="fadeUp" as="h2" className={styles.title}>{years} Years</Reveal>
          <Reveal variant="fadeIn" className={styles.eyebrowRow}>
            <span className={styles.rule} />
            <span className={styles.eyebrow}>Experience</span>
            <span className={styles.rule} />
          </Reveal>
        </ScrollRevealSection>

        <div className={styles.layout}>

          {/* One timeline, pinned while the cards scroll */}
          <div className={styles.timelineCol} aria-hidden="true">
            <PinnedTimeline months={months} slices={slices} cardRefs={cardRefs} />
          </div>

          <ol className={styles.list}>
            {roles.map((role, i) => (
              <li
                key={role.company}
                ref={(el) => { cardRefs.current[i] = el }}
                className={styles.card}
              >
                <ScrollRevealSection className={styles.cardInner} threshold={0.25}>
                  <Reveal variant="fadeUp" className={styles.content}>
                    <h3 className={styles.company}>{role.company}</h3>
                    <p className={styles.sr}>{role.period}</p>
                    <p className={styles.desc}>{role.description}</p>
                    <ul className={styles.tags}>
                      {role.tags.map((t) => (
                        <li key={t} className={styles.tag}>{t}</li>
                      ))}
                    </ul>
                  </Reveal>
                </ScrollRevealSection>
              </li>
            ))}
          </ol>

        </div>
      </div>
    </section>
  )
}
