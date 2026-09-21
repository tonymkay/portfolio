import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getAllProjects, projectCategories } from '../../data/projects'
import { motion as motionPresets } from '../../theme/motion'
import CtaBanner from '../../components/ui/CtaBanner'
import CubeButton from '../../components/ui/CubeButton'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import WorkTabs from '../../components/ui/WorkTabs'
import styles from './Projects.module.css'

const { projects: projectsContent, images: pageImages } = siteContent
const allProjects = getAllProjects()

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter)

  return (
    <div className={styles.page}>

      {/* ── Hero — animated on mount ── */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <div
          className={styles.heroOverlay}
          style={pageImages.projectsHero ? { backgroundImage: `url(${pageImages.projectsHero})` } : {}}
        />
        <div className={`container ${styles.heroContent}`}>
          <Reveal variant="popIn" as="span" className={styles.eyebrow}>
            {projectsContent.hero.eyebrow}
          </Reveal>
          <Reveal variant="fadeUp" as="h1" className={styles.heroHeading}>
            {projectsContent.hero.heading}
          </Reveal>
        </div>
      </motion.section>

      {/* ── Filter Tabs — fade in as a row ── */}
      <ScrollRevealSection className={styles.filterSection}>
        <div className="container">
          <Reveal variant="fadeUp">
            <WorkTabs />
          </Reveal>
          <Reveal variant="fadeUp" className={styles.filterRow}>
            {projectCategories.map((cat) => (
              <CubeButton
                key={cat}
                size="sm"
                rounded
                variant={activeFilter === cat ? 'active' : 'solid'}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </CubeButton>
            ))}
          </Reveal>
        </div>
      </ScrollRevealSection>

      {/* ── Masonry Grid — cards stagger in ── */}
      <ScrollRevealSection className={styles.gridSection}>
        <div className="container">
          <div className={styles.masonryGrid}>
            {filtered.map((project, i) => {
              const isWide = i === 3 || i === 6
              return (
                <Reveal
                  key={project.id}
                  variant="scaleUp"
                  className={isWide ? styles.wideCell : ''}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className={styles.gridItem}
                    aria-label={`View ${project.title} project`}
                  >
                    <div className={styles.gridImage}>
                      {project.coverImage ? (
                        <img src={project.coverImage} alt={project.title} loading="lazy" />
                      ) : (
                        <div className={styles.placeholder}>
                          <span>{project.title}</span>
                        </div>
                      )}
                      <div className={styles.gridOverlay}>
                        <span className={styles.arrowCircle}>↗</span>
                      </div>
                    </div>
                    <p className={styles.gridTitle}>{project.title}</p>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className={styles.empty}>No projects in this category yet.</p>
          )}
        </div>
      </ScrollRevealSection>

      <CtaBanner
        heading={projectsContent.cta.heading}
        description={projectsContent.cta.description}
        ctaLabel={projectsContent.cta.ctaLabel}
        ctaHref={projectsContent.cta.ctaHref}
        image={pageImages.homeCta}
      />

    </div>
  )
}
