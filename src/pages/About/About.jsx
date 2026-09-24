import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { motion as motionPresets } from '../../theme/motion'
import usePageTheme from '../../hooks/usePageTheme'
import Tag from '../../components/ui/Tag'
import CubeButton from '../../components/ui/CubeButton'
import SocialLinks from '../../components/ui/SocialLinks'
import ClosingCta from '../../components/ui/ClosingCta'
import BigStatHeader from '../../components/ui/BigStatHeader'
import ExperienceTimeline from '../../components/ui/ExperienceTimeline'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import styles from './About.module.css'

const { home, designer, about: aboutContent, images: pageImages } = siteContent
const { hero, numbers, projects } = aboutContent

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
        className={`container ${styles.hero}`}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <Reveal variant="scaleUp" className={styles.portrait}>
          <span className={styles.portraitInner}>
            {pageImages.heroPortrait && (
              <img src={pageImages.heroPortrait} alt={`Portrait of ${designer.fullName}`} />
            )}
          </span>
        </Reveal>

        <Reveal variant="fadeUp" as="h1" className={styles.statement}>
          <Segments items={hero.statement} />
        </Reveal>

        <Reveal variant="fadeUp" as="p" className={styles.intro}>
          <Segments items={hero.intro} />
        </Reveal>

        <Reveal variant="fadeUp" className={styles.actions}>
          <SocialLinks />
          <CubeButton to={home.hero.contactHref} variant="light" spaced>
            {home.hero.contactLabel}
          </CubeButton>
        </Reveal>
      </motion.section>

      {/* ══ EXPERIENCE — pinned; scrolling steps through months and companies ══ */}
      <ExperienceTimeline roles={home.experience.roles} years={numbers.years.value} />

      {/* ══ PROJECTS — centered count header, project list below ══ */}
      <ScrollRevealSection className={styles.projects}>
        <div className={`container ${styles.block}`}>

          <Reveal variant="fadeUp">
            <BigStatHeader
              title="Designed"
              count={numbers.projects.value}
              suffix={numbers.projects.suffix}
              label={numbers.projects.label}
              as="h2"
              duration={1600}
              pad={1}
            />
          </Reveal>

          <div className={styles.listRight}>
            {projects.map((project) => (
              <Reveal key={project.index} variant="fadeUp" className={styles.roleRow}>
                <div className={styles.roleDetails}>
                  <div className={styles.roleLeftInfo}>
                    <span className={styles.roleYear}>{project.index}</span>
                    <p className={styles.roleCompany}>{project.name}</p>
                  </div>
                  <div className={styles.roleRightInfo}>
                    <p className={styles.roleDesc}>{project.description}</p>
                    <div className={styles.roleTags}>
                      {project.tags.map((t) => <Tag key={t} variant="outline">{t}</Tag>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </ScrollRevealSection>

      {/* ══ CTA — same as the homepage ══ */}
      <ClosingCta />

    </div>
  )
}
