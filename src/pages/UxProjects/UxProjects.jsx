import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getAllUxProjects, uxPageContent } from '../../data/uxProjects'
import { motion as motionPresets } from '../../theme/motion'
import CtaBanner from '../../components/ui/CtaBanner'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import WorkTabs from '../../components/ui/WorkTabs'
import UxProjectCard from '../../components/ui/UxProjectCard'
import styles from './UxProjects.module.css'

const { images: pageImages } = siteContent
const projects = getAllUxProjects()

export default function UxProjects() {
  return (
    <div className={styles.page}>

      <motion.header
        className={`container ${styles.header}`}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <Reveal variant="fadeUp">
          <WorkTabs />
        </Reveal>
        <Reveal variant="fadeIn" className={styles.eyebrowRow}>
          <span className={styles.line} aria-hidden="true" />
          <h1 className={styles.eyebrow}>{uxPageContent.eyebrow}</h1>
          <span className={styles.line} aria-hidden="true" />
        </Reveal>
      </motion.header>

      <div className={`container ${styles.list}`}>
        {projects.map((project) => (
          <ScrollRevealSection key={project.id} as="div" className={styles.item}>
            <Reveal variant="fadeUp">
              <UxProjectCard project={project} />
            </Reveal>
          </ScrollRevealSection>
        ))}
      </div>

      <CtaBanner
        heading={uxPageContent.cta.heading}
        description={uxPageContent.cta.description}
        ctaLabel={uxPageContent.cta.ctaLabel}
        ctaHref={uxPageContent.cta.ctaHref}
        image={pageImages.homeCta}
      />

    </div>
  )
}
