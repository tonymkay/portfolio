import ScrollRevealSection from '../ui/ScrollRevealSection'
import Reveal from '../ui/Reveal'
import styles from './TextSection.module.css'

/**
 * A heading + text block that reveals on scroll. Pass `body` for one
 * paragraph or `paragraphs` for several; `children` renders after the text
 * (lists, a quote, ...). Heading is optional.
 */
export default function TextSection({ heading, body, paragraphs, children }) {
  return (
    <ScrollRevealSection as="div" className={styles.text}>
      {heading && (
        <Reveal variant="fadeUp" as="h2" className={styles.heading}>{heading}</Reveal>
      )}
      {body && <Reveal variant="fadeUp" as="p" className={styles.body}>{body}</Reveal>}
      {paragraphs?.map((p, i) => (
        <Reveal key={i} variant="fadeUp" as="p" className={styles.body}>{p}</Reveal>
      ))}
      {children}
    </ScrollRevealSection>
  )
}
