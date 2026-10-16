import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { logoProjects } from '../../data/logos'
import { motion as motionPresets } from '../../theme/motion'
import BigStatHeader from '../../components/ui/BigStatHeader'
import GlassHeader from '../../components/ui/GlassHeader'
import ClosingCta from '../../components/ui/ClosingCta'
import MasonryGrid from '../../components/ui/MasonryGrid'
import Reveal from '../../components/ui/Reveal'
import styles from './Projects.module.css'

const { header } = siteContent.projects
const allProjects = logoProjects

// Filters come from the categories actually present ("All" always first).
// With only one category there is nothing to filter, so the row is hidden.
const categories = ['All', ...new Set(allProjects.map((p) => p.category))]
const showFilters = categories.length > 2

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

      {/* ══ HEADER — compact title + rule row (+ filters); pins to the top as liquid glass ══ */}
      <GlassHeader>
        <motion.header
          className={`container ${styles.header}`}
          data-nav-title="Selected Projects"
          initial="hidden"
          animate="visible"
          variants={motionPresets.staggerContainer}
        >
          <Reveal variant="fadeUp">
            <BigStatHeader compact title={header.title} count={filtered.length} label={label} />
          </Reveal>

          {showFilters && (
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
          )}
        </motion.header>
      </GlassHeader>

      {/* ══ LOGO GRID — staggered masonry, rounded tiles, hover overlay ══ */}
      <div className={`container ${styles.list}`}>
        {/* linkable={false}: detail pages are switched off for now.
            Remove the prop (or set it to true) to bring the links and the
            "View Project" hover overlay back. */}
        <MasonryGrid projects={filtered} basePath="/projects" linkable={false} />

        {filtered.length === 0 && (
          <p className={styles.empty}>No projects in this category yet.</p>
        )}
      </div>

      {/* ══ CTA — same closing banner as About / Home ══ */}
      <ClosingCta />

    </div>
  )
}
