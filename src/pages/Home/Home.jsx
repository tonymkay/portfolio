import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getAllUxProjects } from '../../data/uxProjects'
import { logosCategory, postersCategory } from '../../data/categoryFolders'
import { motion as motionPresets } from '../../theme/motion'
import CubeButton from '../../components/ui/CubeButton'
import ScrollCue from '../../components/ui/ScrollCue'
import ProjectFolder from '../../components/ui/ProjectFolder'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import WordRotator from '../../components/ui/WordRotator'
import usePageTheme from '../../hooks/usePageTheme'
import styles from './Home.module.css'

const { home, designer, images: pageImages } = siteContent

// Order on Home: Klima, ESSA (UI/UX), then Logos, then Posters.
const uxById = Object.fromEntries(getAllUxProjects().map((p) => [p.id, p]))
const folderProjects = [
  ...['ux-klima', 'ux-essa']
    .map((id) => uxById[id])
    .filter(Boolean)
    .map((p) => ({ ...p, to: `/ui-ux/${p.slug}` })),
  logosCategory,
  postersCategory,
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
            <ScrollCue />
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

          <div className={styles.folders}>
            {folderProjects.map(({ to, ...project }) => (
              <ScrollRevealSection key={project.id} as="div">
                <Reveal variant="fadeUp">
                  <ProjectFolder project={project} to={to} />
                </Reveal>
              </ScrollRevealSection>
            ))}
          </div>
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

    </div>
  )
}
