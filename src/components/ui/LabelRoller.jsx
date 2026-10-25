import { useEffect, useRef, useState } from 'react'
import styles from './WordRotator.module.css'

/**
 * LabelRoller — the homepage WordRotator's cube roll (same styles, same
 * easing, same colour alternation), but driven by a `value` prop instead
 * of a timer. Whenever `value` changes, the cube rolls up and the new
 * text swings in from below.
 *
 * If `value` changes again mid-roll, the roll in flight finishes first and
 * the next one starts straight after, so fast scrolling never glitches.
 *
 * Props:
 *   value     — the text to show ('' shows nothing)
 *   words     — every value it can take; reserves width so nothing shifts
 *   duration  — seconds per roll (default 0.9)
 *
 * Users with prefers-reduced-motion get the text swapped with no roll.
 */
export default function LabelRoller({ value, words = [], duration = 0.9, className = '' }) {
  const [tick, setTick] = useState(0)
  const [front, setFront] = useState(value)
  const [incoming, setIncoming] = useState(value)
  const [rolling, setRolling] = useState(false)
  const [reduced, setReduced] = useState(false)

  const frontRef = useRef(value)
  const latestRef = useRef(value)
  const busyRef = useRef(false)
  const timerRef = useRef(0)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    latestRef.current = value
    if (reduced || busyRef.current || value === frontRef.current) return

    const roll = () => {
      const target = latestRef.current
      if (target === frontRef.current) {
        busyRef.current = false
        return
      }
      busyRef.current = true
      setIncoming(target)
      setRolling(true)
      timerRef.current = setTimeout(() => {
        frontRef.current = target
        setFront(target)
        setTick((t) => t + 1)
        setRolling(false)
        // Value moved on while we were rolling? Go again.
        timerRef.current = setTimeout(roll, 0)
      }, duration * 1000 + 40)
    }
    roll()
  }, [value, reduced, duration])

  if (reduced) return <span className={className}>{value}</span>

  const sizers = [...new Set([...words, value].filter(Boolean))]

  return (
    <span
      className={`${styles.wrap} ${className}`}
      style={{ '--wr-duration': `${duration}s` }}
      aria-live="polite"
    >
      {sizers.map((w) => (
        <span key={w} className={styles.sizer} aria-hidden="true">{w}</span>
      ))}

      <span
        className={[
          styles.cube,
          rolling ? styles.rolling : '',
          tick % 2 === 1 ? styles.odd : '',
        ].filter(Boolean).join(' ')}
      >
        <span className={`${styles.face} ${styles.front}`}>{front}</span>
        <span className={`${styles.face} ${styles.next}`} aria-hidden="true">{incoming}</span>
      </span>
    </span>
  )
}
