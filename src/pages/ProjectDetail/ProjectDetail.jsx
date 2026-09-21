import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug, getOtherProjects } from '../../data/projects'
import { siteContent } from '../../data/siteContent'
import { motion as motionPresets } from '../../theme/motion'
import usePageTheme from '../../hooks/usePageTheme'
import CubeButton from '../../components/ui/CubeButton'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import UxProjectCard from '../../components/ui/UxProjectCard'
import styles from './ProjectDetail.module.css'

const { home, process: processContent } = siteContent

/**
 * Testimonials are stored as '"Quote text." — Name, Role'.
 * Split them so the quote and its attribution can be styled separately.
 */
function splitQuote(raw = '') {
  const value = raw.trim()
  const cut = value.lastIndexOf(' — ')
  const body = cut === -1 ? value : value.slice(0, cut)
  return {
    text: body.replace(/^["“]|["”]$/g, '').trim(),
    by: cut === -1 ? '' : value.slice(cut + 3).trim(),
  }
}

/** A heading + paragraph block that reveals on scroll. */
function TextSection({ heading, body, children }) {
  return (
    <ScrollRevealSection as="div" className={styles.text}>
      <Reveal variant="fadeUp" as="h2" className={styles.heading}>{heading}</Reveal>
      {body && <Reveal variant="fadeUp" as="p" className={styles.body}>{body}</Reveal>}
      {children}
    </ScrollRevealSection>
  )
}

/** One full-width image that reveals on scroll. */
function FullImage({ src, alt }) {
  if (!src) return null
  return (
    <ScrollRevealSection as="div" className={styles.media}>
      <Reveal variant="fadeUp">
        <img src={src} alt={alt} loading="lazy" />
      </Reveal>
    </ScrollRevealSection>
  )
}

/** Two images side by side (stacked on mobile). */
function ImagePair({ sources, title }) {
  const valid = sources.filter(Boolean)
  if (!valid.length) return null
  return (
    <ScrollRevealSection as="div" className={styles.pair}>
      {valid.map((src, i) => (
        <Reveal key={i} variant="fadeUp" className={styles.pairCell}>
          <img src={src} alt={`${title} detail ${i + 1}`} loading="lazy" />
        </Reveal>
      ))}
    </ScrollRevealSection>
  )
}

/**
 * "The Process" — numbered steps joined by a dashed connector (same look as
 * the Process page). The project's own note sits under the title on the left.
 */
function ProcessSteps({ intro, steps }) {
  if (!steps?.length) return null
  return (
    <ScrollRevealSection className={styles.process}>
      <div className={`container ${styles.processInner}`}>

        <div className={styles.processLeft}>
          <Reveal variant="fadeUp" as="h2" className={styles.heading}>The Process</Reveal>
          {intro && <Reveal variant="fadeUp" as="p" className={styles.body}>{intro}</Reveal>}
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal key={step.number ?? i} variant="fadeUp" className={styles.step}>
              <div className={styles.stepIndicator}>
                <span className={styles.stepNumber}>{step.number ?? i + 1}</span>
                {i < steps.length - 1 && (
                  <span className={styles.stepConnector} aria-hidden="true" />
                )}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </ScrollRevealSection>
  )
}

export default function ProjectDetail() {
  usePageTheme('dark')

  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/projects" replace />

  const { title, summary, brief, inspiration, applications, testimonial, externalUrl } = project
  const images = project.images ?? []
  const heroImage = project.heroImage || project.coverImage || images[0]
  const others = getOtherProjects(slug)
  // Steps come from the Process page content; a project may override them
  // by adding its own `processSteps: [{ number, title, description }]`.
  const steps = project.processSteps ?? processContent.steps.items

  const quote = splitQuote(testimonial)
  const quoteBy =
    quote.by || [project.testimonialAuthor, project.testimonialRole].filter(Boolean).join(', ')
  // Some entries reuse the same quote for both fields — don't show it twice.
  const resultsBody = applications && applications !== testimonial ? applications : ''
  const hasResults = Boolean(resultsBody || quote.text)

  const meta = [
    { label: 'Category', value: project.category },
    { label: 'Client', value: project.client },
    { label: 'Year', value: project.year },
  ].filter((m) => m.value)

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <motion.header
        className={`container ${styles.header}`}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <Reveal variant="fadeUp" as="h1" className={styles.title}>{title}</Reveal>
        {summary && (
          <Reveal variant="fadeUp" as="p" className={styles.subtitle}>{summary}</Reveal>
        )}

        <Reveal variant="fadeUp" className={styles.meta}>
          {meta.map((m) => (
            <div key={m.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{m.label}</span>
              <span className={styles.metaValue}>{m.value}</span>
            </div>
          ))}
          {externalUrl && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Website</span>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.metaValue}
              >
                See live ↗
              </a>
            </div>
          )}
        </Reveal>

        {heroImage && (
          <Reveal variant="fadeUp" className={styles.hero}>
            <img src={heroImage} alt={`${title} hero`} loading="eager" />
          </Reveal>
        )}
      </motion.header>

      {/* ── Challenge ── */}
      <div className={`container ${styles.story}`}>
        {brief && <TextSection heading="The Challenge" body={brief} />}

        <FullImage src={images[1]} alt={`${title} application`} />
      </div>

      {/* ── Process (full-width band) ── */}
      <ProcessSteps intro={inspiration} steps={steps} />

      {/* ── Results ── */}
      <div className={`container ${styles.story} ${styles.storyAfter}`}>
        <ImagePair sources={[images[2], images[3]]} title={title} />

        {hasResults && (
          <TextSection heading="The Results" body={resultsBody}>
            {quote.text && (
              <Reveal variant="fadeUp" as="blockquote" className={styles.quote}>
                <p className={styles.quoteText}>{quote.text}</p>
                {quoteBy && <cite className={styles.quoteBy}>{quoteBy}</cite>}
              </Reveal>
            )}
          </TextSection>
        )}
      </div>

      {/* ── Other projects ── */}
      {others.length > 0 && (
        <ScrollRevealSection className={styles.others}>
          <div className={`container ${styles.othersInner}`}>
            <Reveal variant="fadeUp" as="h2" className={styles.othersHeading}>Other Projects</Reveal>
            <div className={styles.othersGrid}>
              {others.map((p) => (
                <Reveal key={p.id} variant="fadeUp">
                  <UxProjectCard project={p} to={`/projects/${p.slug}`} ratio="1 / 1" />
                </Reveal>
              ))}
            </div>
          </div>
        </ScrollRevealSection>
      )}

      {/* ── CTA — same structure as the homepage ── */}
      <ScrollRevealSection className={styles.ctaBand}>
        <div className={`container ${styles.ctaInner}`}>

          <Reveal variant="fadeIn" className={styles.ctaBigWord}>
            <span aria-hidden="true">{home.cta.buttonLabel}</span>
          </Reveal>

          <Reveal variant="scaleUp">
            <CubeButton to={home.cta.ctaHref} variant="light" size="xl">
              {home.cta.buttonLabel}
            </CubeButton>
          </Reveal>

          <Reveal variant="fadeUp" as="p" className={styles.ctaText}>
            {home.cta.segments.map((s, i) => (
              <span key={i} className={s.muted ? styles.ctaMuted : styles.ctaLight}>
                {s.text}
              </span>
            ))}
          </Reveal>

        </div>
      </ScrollRevealSection>
    </div>
  )
}
