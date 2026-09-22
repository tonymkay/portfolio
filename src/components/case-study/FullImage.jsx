import ScrollRevealSection from '../ui/ScrollRevealSection'
import Reveal from '../ui/Reveal'
import styles from './FullImage.module.css'

/** One full-width image that reveals on scroll. */
export default function FullImage({ src, alt }) {
  if (!src) return null
  return (
    <ScrollRevealSection as="div" className={styles.media}>
      <Reveal variant="fadeUp">
        <img src={src} alt={alt} loading="lazy" />
      </Reveal>
    </ScrollRevealSection>
  )
}
