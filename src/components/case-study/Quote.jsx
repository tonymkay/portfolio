import Reveal from '../ui/Reveal'
import styles from './Quote.module.css'

/** Testimonial / pull quote with an optional attribution line. */
export default function Quote({ text, by }) {
  if (!text) return null
  return (
    <Reveal variant="fadeUp" as="blockquote" className={styles.quote}>
      <p className={styles.quoteText}>{text}</p>
      {by && <cite className={styles.quoteBy}>{by}</cite>}
    </Reveal>
  )
}
