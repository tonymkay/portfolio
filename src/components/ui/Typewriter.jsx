import { useEffect, useState } from 'react'
import styles from './Typewriter.module.css'

/**
 * Typewriter — types a word, holds it, erases it, then types the next.
 *
 * Props:
 *   words       — string[] to cycle through
 *   typeSpeed   — ms per character while typing   (default 95)
 *   eraseSpeed  — ms per character while erasing  (default 55)
 *   hold        — ms to hold a fully typed word    (default 1800)
 *   gap         — ms pause before typing the next  (default 350)
 *
 * Users with prefers-reduced-motion see the first word, static.
 */
export default function Typewriter({
  words,
  typeSpeed = 95,
  eraseSpeed = 55,
  hold = 1800,
  gap = 350,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [erasing, setErasing] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduced) return undefined
    const word = words[index]
    let timer

    if (!erasing && text === word) {
      timer = setTimeout(() => setErasing(true), hold)
    } else if (erasing && text === '') {
      timer = setTimeout(() => {
        setErasing(false)
        setIndex((i) => (i + 1) % words.length)
      }, gap)
    } else {
      timer = setTimeout(
        () => setText(erasing ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        erasing ? eraseSpeed : typeSpeed,
      )
    }

    return () => clearTimeout(timer)
  }, [text, erasing, index, words, reduced, typeSpeed, eraseSpeed, hold, gap])

  if (reduced) return <span className={className}>{words[0]}</span>

  return (
    <span className={className} aria-label={words[index]}>
      <span aria-hidden="true">{text}</span>
      <span className={styles.caret} aria-hidden="true" />
    </span>
  )
}
