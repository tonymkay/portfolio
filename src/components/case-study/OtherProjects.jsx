import ScrollRevealSection from '../ui/ScrollRevealSection'
import Reveal from '../ui/Reveal'
import ProjectGrid from '../ui/ProjectGrid'
import styles from './OtherProjects.module.css'

/** "Other Projects" band at the bottom of a case study. */
export default function OtherProjects({ projects, basePath }) {
  if (!projects?.length) return null
  return (
    <ScrollRevealSection className={styles.others}>
      <div className={`container ${styles.othersInner}`}>
        <Reveal variant="fadeUp" as="h2" className={styles.heading}>Other Projects</Reveal>
        <ProjectGrid projects={projects} basePath={basePath} ratio="1 / 1" variant="compact" />
      </div>
    </ScrollRevealSection>
  )
}
