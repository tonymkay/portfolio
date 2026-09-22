import { motion } from 'framer-motion'
import { getAllUxProjects, uxPageContent } from '../../data/uxProjects'
import { motion as motionPresets } from '../../theme/motion'
import BigStatHeader from '../../components/ui/BigStatHeader'
import ClosingCta from '../../components/ui/ClosingCta'
import ProjectGrid from '../../components/ui/ProjectGrid'
import Reveal from '../../components/ui/Reveal'
import styles from './UxProjects.module.css'

const { header } = uxPageContent
const projects = getAllUxProjects()

// The section tabs and the dark theme come from <WorkLayout>.
export default function UxProjects() {
  return (
    <div className={styles.page}>

      {/* ══ HEADER — big thin title, — 03 CASE STUDIES — rule row ══ */}
      <motion.header
        className={`container ${styles.header}`}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <Reveal variant="fadeUp">
          <BigStatHeader title={header.title} count={projects.length} label={header.label} />
        </Reveal>
      </motion.header>

      {/* ══ CASE STUDIES — same two-column grid as Projects, each reveals on scroll ══ */}
      <div className={`container ${styles.list}`}>
        <ProjectGrid projects={projects} basePath="/ui-ux" scrollEach />
      </div>

      {/* ══ CTA — same closing banner as About / Home ══ */}
      <ClosingCta />

    </div>
  )
}
