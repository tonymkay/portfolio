import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './SiteMap.module.css'

/**
 * SiteMap — information-architecture diagram: cards with a header band and
 * a connector from each Home row to its section card.
 *
 * Desktop (≥1024px): Home on the left, section cards staggered on the right;
 * connectors are measured from the real card positions and run in a clear
 * channel to the left of every card, so they stay attached at any width.
 * Below that: no connectors, one spine from Home down to the cards, which
 * pack into 3 columns (tablet) or 2 (phone).
 *
 * data: { title, home: { title, rows }, cards: [{ id, title, rows }] }
 * row:  { id?, label, tone: 'red' | 'orange' | 'sand' | 'gold' | 'sage' | 'solid', card? }
 */

const DESKTOP = '(min-width: 1024px)'
const RADIUS = 12 // connector corner radius
const STEP = 12 // spacing between parallel connector verticals
const PAD = 20 // clearance from the cards
const INK = '#1a1a1a'

// How far each section card sits across the stagger range (0 = left, 1 = right).
const SHIFTS = [0, 0.8, 0.3, 1, 0.5]

function useDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches
  )

  useEffect(() => {
    const query = window.matchMedia(DESKTOP)
    const onChange = () => setDesktop(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return desktop
}

/** Horizontal → vertical → horizontal connector with rounded corners. */
function elbow(sx, sy, tx, ty, x) {
  const d = Math.sign(ty - sy)
  if (d === 0) return `M${sx} ${sy} H${tx}`
  const r = Math.min(RADIUS, Math.abs(ty - sy) / 2, x - sx, tx - x)
  return `M${sx} ${sy} H${x - r} Q${x} ${sy} ${x} ${sy + d * r} V${ty - d * r} Q${x} ${ty} ${x + r} ${ty} H${tx}`
}

function Card({ id, title, rows, home = false, style }) {
  return (
    <section className={`${styles.card} ${home ? styles.home : ''}`} data-card={id} style={style}>
      <header className={styles.band}>
        <h3 className={styles.name} data-title>
          {title}
        </h3>
        {!home && <span className={styles.count}>{rows.length}</span>}
      </header>
      <ul className={styles.rows}>
        {rows.map((row) => (
          <li
            key={row.id ?? row.label}
            className={`${styles.row} ${styles[row.tone]}`}
            data-link={home && row.card ? row.id : undefined}
          >
            {row.label}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function SiteMap({ data }) {
  const desktop = useDesktop()
  const flowRef = useRef(null)
  const [wires, setWires] = useState({ w: 0, h: 0, paths: [] })

  useLayoutEffect(() => {
    const flow = flowRef.current
    if (!desktop || !flow) return undefined

    const measure = () => {
      const box = flow.getBoundingClientRect()
      const items = []

      data.home.rows.forEach((row) => {
        if (!row.card) return
        const from = flow.querySelector(`[data-link="${row.id}"]`)
        const card = flow.querySelector(`[data-card="${row.id}"]`)
        if (!from || !card) return
        const a = from.getBoundingClientRect()
        const c = card.getBoundingClientRect()
        items.push({
          sx: a.right - box.left - 7,
          sy: a.top + a.height / 2 - box.top,
          tx: c.left - box.left - 3,
          ty: c.top + c.height / 2 - box.top,
        })
      })

      if (items.length === 0) {
        setWires({ w: box.width, h: box.height, paths: [] })
        return
      }

      // Every vertical run sits in the channel between Home and the leftmost
      // card. Lines going down stack from the cards side (lowest source
      // innermost); lines going up stack from the Home side. Parallel lines
      // never cross.
      const channelLeft = items[0].sx + PAD
      const channelRight = Math.min(...items.map((it) => it.tx)) - PAD
      const step = Math.max(4, Math.min(STEP, (channelRight - channelLeft) / items.length))

      let up = 0
      let down = 0
      const paths = items.map((it) => {
        let x
        if (it.ty > it.sy) {
          x = channelRight - down * step
          down += 1
        } else {
          x = channelLeft + up * step
          up += 1
        }
        x = Math.max(channelLeft, Math.min(channelRight, x))
        return { ...it, d: elbow(it.sx, it.sy, it.tx, it.ty, x) }
      })

      setWires({ w: box.width, h: box.height, paths })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(flow)
    document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [desktop, data])

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{data.title}</h2>

      <div ref={flowRef} className={styles.flow}>
        <Card id="home" title={data.home.title} rows={data.home.rows} home />

        <div className={styles.spine} aria-hidden="true" />

        <div className={styles.cards}>
          {data.cards.map((card, i) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              rows={card.rows}
              style={{ '--shift': SHIFTS[i % SHIFTS.length] }}
            />
          ))}
        </div>

        {desktop && wires.w > 0 && (
          <svg className={styles.wires} width={wires.w} height={wires.h} aria-hidden="true">
            <defs>
              <marker
                id="siteMapArrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M1.5 1.5 L7.5 5 L1.5 8.5"
                  fill="none"
                  stroke={INK}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            {wires.paths.map((p, i) => (
              <g key={i}>
                <path
                  d={p.d}
                  fill="none"
                  stroke={INK}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  markerEnd="url(#siteMapArrow)"
                />
                <circle cx={p.sx} cy={p.sy} r="4.5" fill={INK} />
              </g>
            ))}
          </svg>
        )}
      </div>
    </div>
  )
}
