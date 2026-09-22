import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getAllProjects, projectCategories } from '../../data/projects'
import { motion as motionPresets } from '../../theme/motion'
import BigStatHeader from '../../components/ui/BigStatHeader'
import ClosingCta from '../../components/ui/ClosingCta'
import ProjectGrid from '../../components/ui/ProjectGrid'
import Reveal from '../../components/ui/Reveal'
import styles from './Projects.module.css'

const { header } = siteContent.projects
const allProjects = getAllProjects()

// Only offer filters that actually have projects ("All" always stays)
const categories = projectCategories.filter(
  (cat) => cat === 'All' || allProjects.some((p) => p.category === cat),
)

// The section tabs and the dark theme come from <WorkLayout>.
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter)

  const label = activeFilter === 'All' ? header.label : activeFilter

  return (
    <div className={styles.page}>

      {/* ══ HEADER — big thin title, — 08 PROJECTS — rule row, filters ══ */}
      <motion.header
        className={`container ${styles.header}`}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <Reveal variant="fadeUp">
          <BigStatHeader title={header.title} count={filtered.length} label={label} />
        </Reveal>

        <Reveal variant="fadeUp" className={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </Reveal>
      </motion.header>

      {/* ══ PROJECT LIST — same cards as the homepage, each reveals on scroll ══ */}
      <div className={`container ${styles.list}`}>
        <ProjectGrid projects={filtered} basePath="/projects" scrollEach />

        {filtered.length === 0 && (
          <p className={styles.empty}>No projects in this category yet.</p>
        )}
      </div>

      {/* ══ CTA — same closing banner as About / Home ══ */}
      <ClosingCta />

    </div>
  )
}
