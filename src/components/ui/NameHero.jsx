import { siteContent } from '../../data/siteContent'
import Reveal from './Reveal'
import PillVideo from './PillVideo'
import styles from './NameHero.module.css'

const { designer, images: pageImages } = siteContent

/**
 * NameHero — first name, upright pill portrait with a waving emoji, surname,
 * and the role line. Shared by the About hero and the first-visit Intro.
 * Pass `videoId` (YouTube) to make the pill a button that zooms open a video preview.
 * Must sit inside a motion parent with the staggerContainer variants (Reveal).
 */
export default function NameHero({ videoId }) {
  const pillContent = (
    <>
      <span className={styles.wave} aria-hidden="true">👋</span>
      {pageImages.heroPortrait && (
        <img src={pageImages.heroPortrait} alt={`Portrait of ${designer.fullName}`} />
      )}
      {videoId && (
        <span className={styles.play} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M9 6v12l10-6Z" />
          </svg>
        </span>
      )}
    </>
  )

  return (
    <>
      <Reveal variant="fadeUp" as="h1" className={styles.nameRow}>
        <span>{designer.firstName}</span>
        {videoId ? (
          <PillVideo videoId={videoId} className={`${styles.pill} ${styles.pillButton}`}>
            {pillContent}
          </PillVideo>
        ) : (
          <span className={styles.pill}>{pillContent}</span>
        )}
        <span>{designer.lastName}</span>
      </Reveal>

      <Reveal variant="fadeUp" as="p" className={styles.role}>
        Product Designer (UX/UI)
      </Reveal>
    </>
  )
}
