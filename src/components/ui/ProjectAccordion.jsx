import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getUxProjectBySlug } from '../../data/uxProjects'
import CubeButton from './CubeButton'
import styles from './ProjectAccordion.module.css'

/**
 * ProjectAccordion — numbered list, one row open at a time.
 * The open row shows the project's UX/UI cover (looked up by `slug`),
 * a short paragraph and a "Read More" link to the case study.
 * Projects without a slug (e.g. print work) show text only.
 */
export default function ProjectAccordion({ projects }) {
  const [openIndex, setOpenIndex] = useState(projects[0]?.index ?? null)

  return (
    <div className={styles.list}>
      {projects.map((project) => {
        const isOpen = openIndex === project.index
        const ux = project.slug ? getUxProjectBySlug(project.slug) : null
        const cover = ux?.coverImage
        const text = Array.isArray(project.description)
          ? project.description.join(' ')
          : project.description

        return (
          <div
            key={project.index}
            className={`${styles.row} ${isOpen ? styles.open : ''}`}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpenIndex(project.index) }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setOpenIndex((cur) => (cur === project.index ? null : cur))
            }}
          >
            <button
              type="button"
              className={styles.head}
              onClick={() => setOpenIndex(isOpen ? null : project.index)}
              aria-expanded={isOpen}
            >
              <span className={styles.num}>{project.index}</span>
              <span className={styles.title}>{project.name}</span>
              <span className={styles.arrow} aria-hidden="true">
                <ArrowRight className={styles.arrowIcon} size={20} strokeWidth={1.5} />
                <span className={styles.plus}>
                  <span className={styles.barH} />
                  <span className={styles.barV} />
                </span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className={styles.bodyWrap}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { type: 'spring', bounce: 0, duration: 0.65 },
                    opacity: { duration: 0.35, ease: 'easeOut' },
                  }}
                >
                  <div className={`${styles.body} ${cover ? '' : styles.noCover}`}>
                    {cover && (
                      <div className={styles.media}>
                        <img src={cover} alt={`${project.name} cover`} loading="lazy" />
                      </div>
                    )}
                    <div className={styles.info}>
                      <p className={styles.desc}>{text}</p>
                      {ux && (
                        <CubeButton to={`/ui-ux/${ux.slug}`} variant="light" spaced>
                          Read More
                        </CubeButton>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
