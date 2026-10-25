import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllUxProjects, uxPageContent } from '../../data/uxProjects'
import { motion as motionPresets } from '../../theme/motion'
import BigStatHeader from '../../components/ui/BigStatHeader'
import GlassHeader from '../../components/ui/GlassHeader'
import ClosingCta from '../../components/ui/ClosingCta'
import ProjectFolder from '../../components/ui/ProjectFolder'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import styles from './UxProjects.module.css'

const { header } = uxPageContent
const projects = getAllUxProjects()

// The section tabs and the dark theme come from <WorkLayout>.
export default function UxProjects() {
  return (
    <>
    <div className={styles.page}>

      {/* ══ HEADER — compact title + rule row; pins to the top as liquid glass ══ */}
      <GlassHeader>
        <motion.header
          className={`container ${styles.header}`}
          data-nav-title={header.title}
          initial="hidden"
          animate="visible"
          variants={motionPresets.staggerContainer}
        >
          <Reveal variant="fadeUp">
            <BigStatHeader compact title={header.title} count={projects.length} label={header.label} />
          </Reveal>
        </motion.header>
      </GlassHeader>

      {/* ══ CASE STUDIES — glass folders, each reveals on scroll ══ */}
      <div className={`container ${styles.list}`}>
        <div className={styles.folders}>
          {projects.map((project) => (
            <ScrollRevealSection key={project.id} as="div">
              <Reveal variant="fadeUp">
                <ProjectFolder project={project} to={`/ui-ux/${project.slug}`} />
              </Reveal>
            </ScrollRevealSection>
          ))}
        </div>
      </div>

      {/* ══ CTA — same closing banner as About / Home ══ */}
      <ClosingCta />

    </div>

    {/* The open project (child route :slug) — a sheet over this listing */}
    <Outlet />
    </>
  )
}
