import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug, getAdjacentProjects } from '../../data/projects'
import CtaBanner from '../../components/ui/CtaBanner'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import { siteContent } from '../../data/siteContent'
import { motion as motionPresets } from '../../theme/motion'
import styles from './ProjectDetail.module.css'

const { home, images: pageImages } = siteContent

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/projects" replace />

  const { prev, next } = getAdjacentProjects(slug)
  const { images, coverImage } = project
  const img = (index) => (images && images[index]) ? images[index] : null

  return (
    <div className={styles.page}>
      <motion.div
        className={`container ${styles.layout}`}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >

        {/* ── LEFT: Stacked Images ── */}
        <div className={styles.imageCol}>

          <Reveal variant="fadeUp" className={`${styles.imgBlock} ${styles.imgTall}`}>
            {coverImage || img(0) ? (
              <img src={coverImage || img(0)} alt={`${project.title} cover`} loading="eager" />
            ) : (
              <div className={styles.imgPlaceholder} style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-navy))' }}>
                <span>{project.title}</span>
              </div>
            )}
          </Reveal>

          <Reveal variant="fadeUp" className={`${styles.imgBlock} ${styles.imgTall}`}>
            {img(1) ? (
              <img src={img(1)} alt={`${project.title} application`} loading="lazy" />
            ) : (
              <div className={styles.imgPlaceholder} style={{ background: 'var(--color-light-gray)' }}>
                <span className={styles.imgPlaceholderLabel}>Image 2</span>
              </div>
            )}
          </Reveal>

          <div className={styles.imgPair}>
            <Reveal variant="scaleUp" className={`${styles.imgBlock} ${styles.imgHalf}`}>
              {img(2) ? (
                <img src={img(2)} alt={`${project.title} detail 1`} loading="lazy" />
              ) : (
                <div className={styles.imgPlaceholder} style={{ background: 'var(--color-off-white)' }}>
                  <span className={styles.imgPlaceholderLabel}>Image 3</span>
                </div>
              )}
            </Reveal>
            <Reveal variant="scaleUp" className={`${styles.imgBlock} ${styles.imgHalf}`}>
              {img(3) ? (
                <img src={img(3)} alt={`${project.title} detail 2`} loading="lazy" />
              ) : (
                <div className={styles.imgPlaceholder} style={{ background: 'var(--color-light-gray)' }}>
                  <span className={styles.imgPlaceholderLabel}>Image 4</span>
                </div>
              )}
            </Reveal>
          </div>

        </div>

        {/* ── RIGHT: Content ── */}
        <div className={styles.contentCol}>
          {[
            { heading: 'Brief', body: project.brief },
            { heading: 'Inspiration', body: project.inspiration },
            { heading: 'Applications', body: project.applications },
            { heading: 'Testimonial', body: project.testimonial },
          ].map((sec, i) => (
            <Reveal key={i} variant="fadeUp" className={styles.section}>
              <h2 className={styles.sectionHeading}>{sec.heading}</h2>
              <p className={styles.sectionBody}>{sec.body}</p>
              {sec.heading === 'Brief' && project.externalUrl && (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  Visit Site ↗
                </a>
              )}
            </Reveal>
          ))}
        </div>

      </motion.div>

      {/* ── Prev / Next ── */}
      <ScrollRevealSection className={styles.navWrapper} as="div">
        <div className={`container ${styles.navRow}`}>
          <Reveal variant="slideLeft">
            <Link to={`/projects/${prev.slug}`} className={styles.navBtn}>← PREVIOUS</Link>
          </Reveal>
          <Reveal variant="slideRight">
            <Link to={`/projects/${next.slug}`} className={styles.navBtn}>NEXT →</Link>
          </Reveal>
        </div>
      </ScrollRevealSection>

      {/* ── CTA ── */}
      <CtaBanner
        heading={home.cta.heading}
        description={home.cta.description}
        ctaLabel={home.cta.ctaLabel}
        ctaHref={home.cta.ctaHref}
        image={pageImages.homeCta}
      />
    </div>
  )
}
