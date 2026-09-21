import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getFeaturedProjects } from '../../data/projects'
import { motion as motionPresets } from '../../theme/motion'
import UxProjectCard from '../../components/ui/UxProjectCard'
import CubeButton from '../../components/ui/CubeButton'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import WordRotator from '../../components/ui/WordRotator'
import TestimonialLoop from '../../components/ui/TestimonialLoop'
import usePageTheme from '../../hooks/usePageTheme'
import styles from './Home.module.css'

const { home, designer, social, images: pageImages } = siteContent
const about = home.about
const featuredProjects = getFeaturedProjects()

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const socialLinks = [
  {
    key: 'twitter',
    label: 'X',
    href: social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: 'dribbble',
    label: 'Dribbble',
    href: social.dribbble,
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </svg>
    ),
  },
  {
    key: 'behance',
    label: 'Behance',
    href: social.behance,
    icon: <span className={styles.behance} aria-hidden="true">Bē</span>,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: social.instagram,
    icon: (
      <svg {...svgProps}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: social.linkedin,
    icon: (
      <svg {...svgProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
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
            <ul className={styles.heroSocials}>
              {socialLinks.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={styles.heroSocial}
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
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
      <ScrollRevealSection className={styles.projects}>
        <div className={`container ${styles.sectionInner}`}>

          <Reveal variant="fadeIn" className={styles.sectionEyebrowRow}>
            <span className={styles.rule} aria-hidden="true" />
            <h2 className={styles.sectionEyebrow}>{home.projects.eyebrow}</h2>
            <span className={styles.rule} aria-hidden="true" />
          </Reveal>

          <div className={styles.projectsGrid}>
            {featuredProjects.slice(0, 6).map((project) => (
              <Reveal key={project.id} variant="fadeUp">
                <UxProjectCard project={project} to={`/projects/${project.slug}`} ratio="4 / 3" />
              </Reveal>
            ))}
          </div>

        </div>
      </ScrollRevealSection>

      {/* ══════════════════════════════════════
          ABOUT TEASER — dark band: eyebrow, statement
          (white lead + gray rest), outlined button
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.aboutBand}>
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
          TESTIMONIALS — vertical seamless loop,
          pauses on hover
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.testimonials}>
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

      {/* ══════════════════════════════════════
          CTA — dark band: big faded word, button,
          statement with muted highlights
          ══════════════════════════════════════ */}
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
