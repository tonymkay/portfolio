import ScrollRevealSection from '../ui/ScrollRevealSection'
import Reveal from '../ui/Reveal'
import styles from './ImagePair.module.css'

/** Two images side by side (stacked on mobile). */
export default function ImagePair({ sources, title }) {
  const valid = sources.filter(Boolean)
  if (!valid.length) return null
  return (
    <ScrollRevealSection as="div" className={styles.pair}>
      {valid.map((src, i) => (
        <Reveal key={i} variant="fadeUp" className={styles.pairCell}>
          <img src={src} alt={`${title} detail ${i + 1}`} loading="lazy" />
        </Reveal>
      ))}
    </ScrollRevealSection>
  )
}
