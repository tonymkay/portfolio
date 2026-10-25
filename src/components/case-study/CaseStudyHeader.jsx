import CubeButton from '../ui/CubeButton'
import Breadcrumbs from '../ui/Breadcrumbs'
import ScrollProgressBar from '../ui/ScrollProgressBar'
import styles from './CaseStudyHeader.module.css'

/**
 * Case-study header: a sticky bar stays pinned to the top of the viewport
 * while the page scrolls, followed by the title, a divider, and the hero
 * image. With `breadcrumbs` the bar holds breadcrumbs + "Visit Site" CTA +
 * the scroll-progress line; without them (UX project pages) the bar is just
 * the scroll-progress line. Static — no scroll-reveal animation.
 */
export default function CaseStudyHeader({
  breadcrumbs,
  title,
  website,
  heroImage,
}) {
  const hasCrumbs = Boolean(breadcrumbs?.length)

  return (
    <>
      <div className={`${styles.stickyBar} ${hasCrumbs ? '' : styles.progressOnly}`}>
        <div className={`container ${styles.stickyBarInner}`}>
          {hasCrumbs && <Breadcrumbs items={breadcrumbs} />}
          {hasCrumbs && website && (
            <CubeButton href={website} external variant="light" size="sm" className={styles.visitBtn}>
              Visit Site
            </CubeButton>
          )}
          <ScrollProgressBar />
        </div>
      </div>

      <header className={`container ${styles.header}`} data-nav-title={title}>
        <h1 className={styles.title}>{title}</h1>

        {heroImage && (
          <div className={styles.hero}>
            <img src={heroImage} alt={`${title} hero`} loading="eager" />
          </div>
        )}
      </header>
    </>
  )
}
