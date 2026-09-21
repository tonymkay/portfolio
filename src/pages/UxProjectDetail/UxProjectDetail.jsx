import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getUxProjectBySlug, getOtherUxProjects, uxPageContent } from '../../data/uxProjects'
import { motion as motionPresets } from '../../theme/motion'
import CtaBanner from '../../components/ui/CtaBanner'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import UxProjectCard from '../../components/ui/UxProjectCard'
import styles from './UxProjectDetail.module.css'

const { images: pageImages } = siteContent

function Block({ block, title }) {
  switch (block.type) {
    case 'text':
      return (
        <ScrollRevealSection as="div" className={styles.text}>
          {block.heading && (
            <Reveal variant="fadeUp" as="h2" className={styles.heading}>{block.heading}</Reveal>
          )}
          {block.paragraphs?.map((p, i) => (
            <Reveal key={i} variant="fadeUp" as="p" className={styles.body}>{p}</Reveal>
          ))}
          {block.bullets && (
            <Reveal variant="fadeUp" as="ul" className={styles.bullets}>
              {block.bullets.map((b) => <li key={b}>{b}</li>)}
            </Reveal>
          )}
          {block.dashes && (
            <Reveal variant="fadeUp" as="ul" className={styles.dashes}>
              {block.dashes.map((d) => <li key={d}>{d}</li>)}
            </Reveal>
          )}
        </ScrollRevealSection>
      )

    case 'image':
      return (
        <ScrollRevealSection as="div" className={styles.media}>
          <Reveal variant="fadeUp">
            <img src={block.src} alt={`${title} screen`} loading="lazy" />
          </Reveal>
        </ScrollRevealSection>
      )

    case 'pair':
      return (
        <ScrollRevealSection as="div" className={styles.pair}>
          {block.images.map((src, i) => (
            <Reveal key={i} variant="fadeUp" className={styles.pairCell}>
              <img src={src} alt={`${title} detail ${i + 1}`} loading="lazy" />
            </Reveal>
          ))}
        </ScrollRevealSection>
      )

    case 'quote':
      return (
        <ScrollRevealSection as="div" className={styles.text}>
          <Reveal variant="fadeUp" as="blockquote" className={styles.quote}>{block.text}</Reveal>
        </ScrollRevealSection>
      )

    default:
      return null
  }
}

export default function UxProjectDetail() {
  const { slug } = useParams()
  const project = getUxProjectBySlug(slug)

  if (!project) return <Navigate to="/ui-ux" replace />

  const others = getOtherUxProjects(slug)
  const meta = [
    { label: 'Category', value: project.category },
    { label: 'Service', value: project.service },
    { label: 'Year', value: project.year },
  ]

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <motion.header
        className={`container ${styles.header}`}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <Reveal variant="fadeUp" as="h1" className={styles.title}>{project.title}</Reveal>
        <Reveal variant="fadeUp" as="p" className={styles.subtitle}>{project.subtitle}</Reveal>

        <Reveal variant="fadeUp" className={styles.meta}>
          {meta.map((m) => (
            <div key={m.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{m.label}</span>
              <span className={styles.metaValue}>{m.value}</span>
            </div>
          ))}
          {project.website && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Website</span>
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.metaValue}
              >
                See live ↗
              </a>
            </div>
          )}
        </Reveal>

        <Reveal variant="fadeUp" className={styles.hero}>
          <img src={project.heroImage} alt={`${project.title} hero`} loading="eager" />
        </Reveal>
      </motion.header>

      {/* ── Story ── */}
      <div className={`container ${styles.story}`}>
        {project.sections.map((block, i) => (
          <Block key={i} block={block} title={project.title} />
        ))}
      </div>

      {/* ── Other projects ── */}
      <ScrollRevealSection className={styles.others}>
        <div className={`container ${styles.othersInner}`}>
          <Reveal variant="fadeUp" as="h2" className={styles.othersHeading}>Other Projects</Reveal>
          <div className={styles.othersList}>
            {others.map((p) => (
              <Reveal key={p.id} variant="fadeUp">
                <UxProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <Reveal variant="fadeIn">
            <Link to="/ui-ux" className={styles.all}>ALL UI/UX PROJECTS</Link>
          </Reveal>
        </div>
      </ScrollRevealSection>

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
