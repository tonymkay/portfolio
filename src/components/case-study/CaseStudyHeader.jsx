import { ArrowUpRight } from 'lucide-react'
import CubeButton from '../ui/CubeButton'
import Breadcrumbs from '../ui/Breadcrumbs'
import styles from './CaseStudyHeader.module.css'

/**
 * Case-study header: a sticky bar (breadcrumbs + "Visit Site" CTA, with
 * its own background) stays pinned to the top of the viewport while the
 * page scrolls, followed by the title, a divider, and the hero image.
 * Static — no scroll-reveal animation.
 */
export default function CaseStudyHeader({
  breadcrumbs,
  title,
  website,
  heroImage,
}) {
  return (
    <>
      <div className={styles.stickyBar}>
        <div className={`container ${styles.stickyBarInner}`}>
          <Breadcrumbs items={breadcrumbs} />
          {website && (
            <CubeButton href={website} external variant="light" size="sm" className={styles.visitBtn}>
              Visit Site
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </CubeButton>
          )}
        </div>
      </div>

      <header className={`container ${styles.header}`} data-nav-title={title}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.divider} />

        {heroImage && (
          <div className={styles.hero}>
            <img src={heroImage} alt={`${title} hero`} loading="eager" />
          </div>
        )}
      </header>
    </>
  )
}
