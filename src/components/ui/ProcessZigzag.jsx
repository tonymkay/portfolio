/**
 * ProcessZigzag.jsx
 *
 * "Our Process" style layout: rounded pills that zig-zag left / right, each with
 * a white number circle, joined by a dotted S-curve with a ringed node at the
 * inner end of every pill.
 *
 * Hover: the pill pops forward, the rest blurs back, and a small detail card
 * (goal + the tools used) opens in the empty space beside the pill.
 *
 * Props: { id, navTitle, intro, steps: [{ title, objective, tools: [{ name, role }], output }] }
 */
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './ProcessZigzag.module.css'

// Muted tints of the site palette on the dark page (solid, so the dotted line
// never shows through), a thin edge, and a ring colour for nodes / card accents.
const TONES = [
  { bg: '#2A3036', edge: 'rgba(45, 106, 143, 0.30)', ring: '#6F8CA3' },  // teal
  { bg: '#32312F', edge: 'rgba(201, 168, 76, 0.24)', ring: '#A89A6C' },  // gold
  { bg: '#2B3237', edge: 'rgba(61, 127, 168, 0.28)', ring: '#7497AE' },  // teal light
  { bg: '#2E2E34', edge: 'rgba(255, 255, 255, 0.14)', ring: '#9C9CA6' }, // surface
]

// Where the ringed node sits (% of row width)
const LAYOUT = {
  wide: { near: 36, far: 64 },
  narrow: { near: 6, far: 94 },
}

const pad = (n) => String(n).padStart(2, '0')

function useIsWide() {
  const [wide, setWide] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 700px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return wide
}

export default function ProcessZigzag({ id, navTitle, intro, steps }) {
  const wide = useIsWide()
  const reduce = useReducedMotion()
  const { near, far } = wide ? LAYOUT.wide : LAYOUT.narrow
  const count = steps.length

  return (
    <section id={id} data-nav-title={navTitle} className={styles.section}>
      <div className={styles.inner}>
        {intro && <div className={styles.intro}>{intro}</div>}

        <ol className={styles.list}>
          {steps.map((step, i) => {
            const tone = TONES[i % TONES.length]
            const onRight = i % 2 === 0 // even → pill on the right, odd → on the left
            const nodeX = onRight ? near : far
            const nextX = onRight ? far : near
            const toolLine = step.tools.map((t) => t.name).join(' · ')

            return (
              <li
                key={step.title}
                className={styles.row}
                style={{ '--ring': tone.ring }}
              >
                {/* Dotted S-curve down to the next pill's node */}
                {i < count - 1 && (
                  <svg
                    className={styles.connector}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d={`M ${nodeX} 0 C ${nodeX} 85, ${nextX} 15, ${nextX} 100`} />
                  </svg>
                )}

                <span className={styles.node} style={{ left: `${nodeX}%` }} aria-hidden="true" />

                <motion.div
                  className={`${styles.pill} ${onRight ? styles.pillRight : styles.pillLeft}`}
                  style={{ background: tone.bg, borderColor: tone.edge }}
                  initial={reduce ? false : { opacity: 0, x: onRight ? 56 : -56 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.num}>{pad(i + 1)}</span>
                  <div className={styles.text}>
                    <h3 className={styles.title}>{step.title}</h3>
                    <p className={styles.tools}>{toolLine}</p>
                    <p className={styles.output}>
                      <span className={styles.label}>Output</span> {step.output}
                    </p>
                  </div>
                </motion.div>

                {/* Detail card — opens in the empty space beside the pill on hover */}
                <aside
                  className={`${styles.card} ${onRight ? styles.cardLeft : styles.cardRight}`}
                  style={{ borderColor: tone.edge }}
                >
                  <span className={styles.label}>Goal</span>
                  <p className={styles.goal}>{step.objective}</p>

                  <span className={`${styles.label} ${styles.labelGap}`}>
                    {step.tools.length > 1 ? 'Tools' : 'Tool'}
                  </span>
                  <ul className={styles.toolList}>
                    {step.tools.map((t) => (
                      <li key={t.name} className={styles.tool}>
                        <span className={styles.mono} aria-hidden="true">{t.name.charAt(0)}</span>
                        <span>
                          <span className={styles.toolName}>{t.name}</span>
                          <span className={styles.toolRole}>{t.role}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
