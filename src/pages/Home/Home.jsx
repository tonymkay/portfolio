import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { logoProjects } from '../../data/logos'
import { posterProjects } from '../../data/posters'
import { getAllUxProjects } from '../../data/uxProjects'
import { motion as motionPresets } from '../../theme/motion'
import MasonryGrid from '../../components/ui/MasonryGrid'
import CubeButton from '../../components/ui/CubeButton'
import SocialLinks from '../../components/ui/SocialLinks'
import ClosingCta from '../../components/ui/ClosingCta'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import WordRotator from '../../components/ui/WordRotator'
import TestimonialLoop from '../../components/ui/TestimonialLoop'
import usePageTheme from '../../hooks/usePageTheme'
import styles from './Home.module.css'

const { home, designer, images: pageImages } = siteContent
const about = home.about
const sampleProjects = [
  ...logoProjects.slice(0, 4),
  ...posterProjects.slice(0, 4),
  ...getAllUxProjects().slice(0, 3),
]

export default function Home() {
  usePageTheme('dark')

  return (
    <div className={styles.page}>

      {/* ══════════════════════════════════════
          HERO — centered statement with a circular
          portrait and a typewriter word.
          Animated on mount (not scroll).
          ══════════════════════════════════════ */}
      <motion.section
        className={styles.hero}
        data-nav-title={home.hero.eyebrow}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <div className={`container ${styles.heroInner}`}>

          <Reveal variant="fadeIn" className={styles.heroEyebrowRow}>
            <span className={styles.heroRule} aria-hidden="true" />
            <span className={styles.heroEyebrow}>{home.hero.eyebrow}</span>
            <span className={styles.heroRule} aria-hidden="true" />
          </Reveal>

          <Reveal variant="fadeUp" as="h1" className={styles.heroTitle}>
            <span className={styles.heroRow}>
              <span>{home.hero.lead}</span>
              <span className={styles.heroAvatar}>
                {pageImages.heroPortrait && (
                  <img src={pageImages.heroPortrait} alt={`Portrait of ${designer.fullName}`} />
                )}
              </span>
            </span>
            <span className={`${styles.heroRow} ${styles.heroMuted}`}>
              <WordRotator words={home.hero.words} />
            </span>
            <span className={styles.heroRow}>
              <span>{home.hero.trail[0]}</span>
              <span className={`${styles.heroMuted} ${styles.trailDesktop}`}>{home.hero.trail[1]}</span>
              <span className={`${styles.heroMuted} ${styles.trailMobile}`}>{home.hero.trail[1].split(' ')[0]}</span>
              <span className={`${styles.heroMuted} ${styles.trailMobile} ${styles.trailLast}`}>{home.hero.trail[1].split(' ').slice(1).join(' ')}</span>
            </span>
          </Reveal>

          <Reveal variant="fadeUp" className={styles.heroActions}>
            <SocialLinks />
            <CubeButton to={home.hero.contactHref} variant="light" spaced className={styles.heroCta}>
              {home.hero.contactLabel}
            </CubeButton>
          </Reveal>

        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          PROJECTS — header fades in, cards
          stagger up one by one
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.projects} data-nav-title={home.projects.eyebrow}>
        <div className={`container ${styles.sectionInner}`}>

          <Reveal variant="fadeIn" className={styles.sectionEyebrowRow}>
            <span className={styles.rule} aria-hidden="true" />
            <h2 className={styles.sectionEyebrow}>Selected Projects</h2>
            <span className={styles.rule} aria-hidden="true" />
          </Reveal>

          {/* One mixed sample grid: logos, posters and UX covers together. */}
          <MasonryGrid projects={sampleProjects} basePath="/posters" linkable={false} />

          <Reveal
            variant="fadeUp"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
          >
            <CubeButton to={home.projects.viewMoreHref} variant="light" spaced>
              {home.projects.viewMoreLabel}
            </CubeButton>
          </Reveal>

        </div>
      </ScrollRevealSection>

      {/* ══════════════════════════════════════
          ABOUT TEASER — dark band: eyebrow, statement
          (white lead + gray rest), outlined button
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.aboutBand} data-nav-title={about.eyebrow}>
        <div className={`container ${styles.aboutInner}`}>

          <Reveal variant="fadeIn" className={styles.aboutEyebrowRow}>
            <span className={styles.aboutRule} aria-hidden="true" />
            <h2 className={styles.aboutEyebrow}>{about.eyebrow}</h2>
            <span className={styles.aboutRule} aria-hidden="true" />
          </Reveal>

          <Reveal variant="fadeUp" as="p" className={styles.aboutText}>
            <span className={styles.aboutLead}>{about.teaser.lead}</span>{' '}
            <span className={styles.aboutRest}>{about.teaser.rest}</span>
          </Reveal>

          <Reveal variant="fadeUp">
            <CubeButton to={about.teaser.ctaHref} variant="light" spaced>
              {about.teaser.ctaLabel}
            </CubeButton>
          </Reveal>

        </div>
      </ScrollRevealSection>

      {/* ══════════════════════════════════════
          TESTIMONIALS — horizontal seamless loop,
          right to left, pauses on hover
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.testimonials} data-nav-title={home.testimonials.eyebrow}>
        <div className={`container ${styles.sectionInner}`}>

          <Reveal variant="fadeIn" className={styles.sectionEyebrowRow}>
            <span className={styles.rule} aria-hidden="true" />
            <h2 className={styles.sectionEyebrow}>{home.testimonials.eyebrow}</h2>
            <span className={styles.rule} aria-hidden="true" />
          </Reveal>

          <Reveal variant="fadeUp" className={styles.testimonialWrap}>
            <TestimonialLoop items={home.testimonials.items} />
          </Reveal>

        </div>
      </ScrollRevealSection>

      {/* ── CTA — shared closing banner ── */}
      <ClosingCta />

    </div>
  )
}
