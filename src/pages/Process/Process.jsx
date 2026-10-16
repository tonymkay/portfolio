import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { logoProjects } from '../../data/logos'
import { motion as motionPresets } from '../../theme/motion'
import ClosingCta from '../../components/ui/ClosingCta'
import ProcessTimeline from '../../components/ui/ProcessTimeline'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import usePageTheme from '../../hooks/usePageTheme'
import styles from './Process.module.css'

const { process, images: pageImages } = siteContent

// A few logos for the moodboard — change MOODBOARD_LOGO_COUNT to show more/fewer.
const MOODBOARD_LOGO_COUNT = 6
const moodboardLogos = logoProjects.slice(0, MOODBOARD_LOGO_COUNT)

// siteContent eyebrows carry a leading "● " — the dark pages use rule-flanked labels instead
const clean = (s) => s.replace('●', '').trim()

/**
 * The three steps shown in the pinned timeline.
 * 1 Discovery Call  — text + "Book a Call" CTA
 * 2 Visual Tone     — text, then the moodboard reveals inside this step
 * 3 Brand Direction — text, then the direction images reveal inside this step
 * Step 3 only appears once step 2 (moodboard included) has scrolled past.
 */
const timelineSteps = [
  {
    navTitle: clean(process.steps.eyebrow),
    title: process.steps.items[0].title,
    description: process.steps.items[0].description,
    cta: { label: process.cta.ctaLabel, href: process.cta.ctaHref },
  },
  {
    navTitle: clean(process.moodboard.eyebrow),
    title: process.steps.items[1].title,
    description: process.steps.items[1].description,
    // Even 3 × 2 grid of square tiles (no staggering); each tile reveals as it scrolls in
    media: (
      <div className={styles.moodGrid}>
        {moodboardLogos.map((logo) => (
          <ScrollRevealSection key={logo.id} as="div" threshold={0.15}>
            <Reveal variant="fadeUp" className={styles.moodTile}>
              <img
                src={logo.coverImage}
                alt={logo.title}
                className={styles.moodTileImg}
                loading="lazy"
              />
            </Reveal>
          </ScrollRevealSection>
        ))}
      </div>
    ),
  },
  {
    navTitle: clean(process.direction.eyebrow),
    title: process.direction.heading,
    description: process.direction.description,
    media: (
      <ScrollRevealSection as="div" className={styles.dirGrid} threshold={0.15}>
        {pageImages.brandDirection.map((img, i) => (
          <Reveal key={i} variant="scaleUp" className={styles.dirPanel}>
            {img ? (
              <img
                src={img}
                alt={`Brand direction ${i + 1}`}
                className={styles.dirPanelImg}
                loading="lazy"
              />
            ) : (
              <div className={styles.placeholder} aria-hidden="true" />
            )}
          </Reveal>
        ))}
      </ScrollRevealSection>
    ),
  },
]

/** Centered eyebrow with a rule on each side — same label as Home / Contact. */
function EyebrowRow({ children }) {
  return (
    <Reveal variant="fadeIn" className={styles.eyebrowRow}>
      <span className={styles.rule} aria-hidden="true" />
      <span className={styles.eyebrow}>{children}</span>
      <span className={styles.rule} aria-hidden="true" />
    </Reveal>
  )
}

export default function Process() {
  usePageTheme('dark')

  return (
    <div className={styles.page}>

      {/* ── Design Process (workflow) — comes first ── */}
      <ScrollRevealSection className={styles.workflow} data-nav-title={clean(process.workflow.eyebrow)}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <EyebrowRow>{clean(process.workflow.eyebrow)}</EyebrowRow>
            <Reveal variant="fadeUp" as="h2" className={styles.sectionHeading}>
              {process.workflow.heading}
            </Reveal>
          </div>
          {/* Floating tilted cards — one row, wraps to two if they don't fit */}
          <div className={styles.cards}>
            {process.workflow.cards.map((card, i) => (
              <Reveal key={card.title} variant="fadeUp" className={styles.cardSlot}>
                <div className={styles.card}>
                  <span className={styles.cardBadge}>{i + 1}</span>
                  <span className={styles.cardLabel}>{card.label}</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* ── "My Creative Workflow" heading — sits between the cards and the steps ── */}
      <motion.section
        className={styles.hero}
        data-nav-title={clean(process.hero.eyebrow)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={motionPresets.staggerContainer}
      >
        <div className={`container ${styles.heroContent}`}>
          <EyebrowRow>{clean(process.hero.eyebrow)}</EyebrowRow>
          <Reveal variant="fadeUp" as="h1" className={styles.heroHeading}>
            {process.hero.heading}
          </Reveal>
        </div>
      </motion.section>

      {/* ── Steps — pinned number wheel; moodboard + brand direction reveal inside their steps ── */}
      <ProcessTimeline steps={timelineSteps} />

      {/* ── CTA — shared closing banner, same as Home / About / Projects ── */}
      <ClosingCta />

    </div>
  )
}
