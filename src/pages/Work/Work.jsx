import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { uxCategory, postersCategory, logosCategory } from '../../data/categoryFolders'
import { motion as motionPresets } from '../../theme/motion'
import usePageTheme from '../../hooks/usePageTheme'
import ProjectFolder from '../../components/ui/ProjectFolder'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import ClosingCta from '../../components/ui/ClosingCta'
import styles from './Work.module.css'

// Category order on the page: UI/UX, Posters, Logos & Identities
const categories = [uxCategory, postersCategory, logosCategory]

// "Work" is the page's one name everywhere (navbar, breadcrumbs, heading)
const workLabel = siteContent.nav.work.label

/**
 * Work — the portfolio hub. Home's "view more" button lands here first;
 * the visitor then picks a category (UI/UX, Posters, Logos & Identities).
 */
export default function Work() {
  usePageTheme('dark')

  return (
    <div className={styles.page}>
      <motion.section
        className={`container ${styles.inner}`}
        data-nav-title={workLabel}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <Reveal variant="fadeIn" className={styles.eyebrowRow}>
          <span className={styles.rule} aria-hidden="true" />
          <h1 className={styles.eyebrow}>{workLabel}</h1>
          <span className={styles.rule} aria-hidden="true" />
        </Reveal>

        <Reveal variant="fadeUp" as="p" className={styles.lead}>
          Explore my work.
        </Reveal>

        <div className={styles.folders}>
          {categories.map(({ to, ...project }) => (
            <ScrollRevealSection key={project.id} as="div">
              <Reveal variant="fadeUp">
                <ProjectFolder project={project} to={to} />
              </Reveal>
            </ScrollRevealSection>
          ))}
        </div>
      </motion.section>

      {/* CTA — same as the About page and the homepage */}
      <ClosingCta />
    </div>
  )
}
