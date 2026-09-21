import { useEffect, useState } from 'react'
import styles from './WordRotator.module.css'

/**
 * WordRotator — cycles through words with the same 3D cube roll as CubeButton,
 * minus the fills and outlines: text only.
 *
 * Two faces of a cube: the current word on the front, the next word underneath.
 * Each tick the cube rolls up (rotateX +90deg) with a long ease-out, so the next
 * word swings in from below and glides to a stop. Then the faces swap silently.
 *
 * Colour rotates with the words: the two faces carry different colours — the
 * resting text colour (the muted gray) and the accent (navy, like the rest of
 * the headline) — and they alternate every roll. So as a word flips away you
 * can see the new word arrive already in the other colour.
 * Set --wr-accent on the element (or a parent) to change the accent.
 *
 * Width is reserved for the longest word so surrounding text never shifts.
 *
 * Props:
 *   words     — string[] to cycle through
 *   interval  — ms between rolls (default 3000; keep it above duration)
 *   duration  — seconds per roll (default 1.1)
 *
 * Users with prefers-reduced-motion see the first word, static.
 */
export default function WordRotator({ words, interval = 3000, duration = 1.1, className = '' }) {
  // tick counts completed rolls: it picks the word AND the colour (even = rest, odd = accent)
  const [tick, setTick] = useState(0)
  const [rolling, setRolling] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduced || words.length < 2) return undefined
    let settle
    const id = setInterval(() => {
      setRolling(true)
      // After the roll finishes, swap faces and snap the cube back (no transition)
      settle = setTimeout(() => {
        setTick((t) => t + 1)
        setRolling(false)
      }, duration * 1000 + 40)
    }, interval)
    return () => {
      clearInterval(id)
      clearTimeout(settle)
    }
  }, [reduced, words.length, interval, duration])

  if (reduced) return <span className={className}>{words[0]}</span>

  const current = words[tick % words.length]
  const next = words[(tick + 1) % words.length]

  return (
    <span
      className={`${styles.wrap} ${className}`}
      style={{ '--wr-duration': `${duration}s` }}
    >
      {/* Invisible sizers reserve the width (and line height) of the longest word */}
      {words.map((w) => (
        <span key={w} className={styles.sizer} aria-hidden="true">{w}</span>
      ))}

      <span
        className={[
          styles.cube,
          rolling ? styles.rolling : '',
          tick % 2 === 1 ? styles.odd : '',
        ].filter(Boolean).join(' ')}
      >
        <span className={`${styles.face} ${styles.front}`}>{current}</span>
        <span className={`${styles.face} ${styles.next}`} aria-hidden="true">{next}</span>
      </span>
    </span>
  )
}
