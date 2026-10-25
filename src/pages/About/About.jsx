import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { motion as motionPresets } from '../../theme/motion'
import usePageTheme from '../../hooks/usePageTheme'
import ScrollCue from '../../components/ui/ScrollCue'
import ClosingCta from '../../components/ui/ClosingCta'
import ExperienceTimeline from '../../components/ui/ExperienceTimeline'
import NameHero from '../../components/ui/NameHero'
import Reveal from '../../components/ui/Reveal'
import styles from './About.module.css'

const { home, about: aboutContent, designer } = siteContent
const { hero, numbers } = aboutContent

/** Renders [{ text, muted? }] as inline spans; muted ones turn grey. */
function Segments({ items }) {
  return items.map((s, i) => (
    <span key={i} className={s.muted ? styles.muted : undefined}>{s.text}</span>
  ))
}

export default function About() {
  usePageTheme('dark')

  return (
    <div className={styles.page}>

      {/* ══ HERO — portrait, statement, intro, socials + button ══ */}
      <motion.section
        id="about-me"
        className={`container ${styles.hero}`}
        data-nav-title="About Me"
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <NameHero videoId={designer.introVideoId} />

        <Reveal variant="fadeUp" as="p" className={styles.intro}>
          <Segments items={hero.intro} />
        </Reveal>

        <Reveal variant="fadeUp" className={styles.actions}>
          <ScrollCue />
        </Reveal>
      </motion.section>

      {/* ══ EXPERIENCE — pinned; scrolling steps through months and companies ══ */}
      <div id="experience" data-nav-title="Experience">
        <ExperienceTimeline roles={home.experience.roles} years={numbers.years.value} />
      </div>

      {/* ══ CTA — same as the homepage ══ */}
      <ClosingCta />

    </div>
  )
}
