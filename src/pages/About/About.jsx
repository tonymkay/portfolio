import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { motion as motionPresets } from '../../theme/motion'
import usePageTheme from '../../hooks/usePageTheme'
import Tag from '../../components/ui/Tag'
import CubeButton from '../../components/ui/CubeButton'
import SocialLinks from '../../components/ui/SocialLinks'
import ClosingCta from '../../components/ui/ClosingCta'
import CountUp from '../../components/ui/CountUp'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './About.module.css'

const { home, designer, about: aboutContent, images: pageImages } = siteContent
const { hero, numbers } = aboutContent

/** Renders [{ text, muted? }] as inline spans; muted ones turn grey. */
function Segments({ items }) {
  return items.map((s, i) => (
    <span key={i} className={s.muted ? styles.muted : undefined}>{s.text}</span>
  ))
}

/**
 * NumbersBand — "My Numbers" strip.
 * Uses ONE scroll trigger (isVisible) for both the fadeUp reveal on each
 * stat AND its CountUp, so the digits start counting in the same instant
 * the card fades in — not on a separate, later-firing observer with a
 * guessed delay bolted on top.
 */
function NumbersBand({ numbers }) {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <motion.section
      ref={ref}
      className={styles.numbers}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={motionPresets.staggerContainer}
    >
      <div className={`container ${styles.numbersInner}`}>
        <Reveal variant="fadeIn" className={styles.numbersEyebrowRow}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 className={styles.numbersEyebrow}>{numbers.eyebrow}</h2>
          <span className={styles.rule} aria-hidden="true" />
        </Reveal>

        <ul className={styles.numbersGrid}>
          {numbers.items.map((item, i) => (
            <Reveal key={item.label} variant="fadeUp" as="li" className={styles.stat}>
              <span className={styles.statValueWrap}>
                <CountUp
                  to={item.value}
                  active={isVisible}
                  duration={1600}
                  delay={i * 120}
                  pad={item.suffix ? 1 : 2}
                  className={styles.statValue}
                />
                {item.suffix && <span className={styles.statSuffix}>{item.suffix}</span>}
              </span>
              <span className={styles.statLabel}>{item.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </motion.section>
  )
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

      {/* ══ MY NUMBERS — each figure counts up as it scrolls into view ══ */}
      <NumbersBand numbers={numbers} />

      {/* ══ EXPERIENCE ══ */}
      <ScrollRevealSection className={styles.experience}>
        <div className={`container ${styles.expGrid}`}>

          <Reveal variant="slideLeft" className={styles.expLeft}>
            <span className={styles.eyebrow}>● Experiences</span>
            <h2 className={styles.expHeading}>{home.experience.heading}</h2>
            <p className={styles.expDesc}>{home.experience.description}</p>
            <Link to="/contact" className={styles.expCta}>{home.experience.ctaLabel}</Link>
          </Reveal>

          <div className={styles.expRight}>
            {home.experience.roles.map((role, i) => (
              <Reveal key={i} variant="fadeUp" className={styles.roleRow}>
                {/* Always-visible summary line */}
                <div className={styles.roleSummary}>
                  <span className={styles.roleYear}>{role.year}</span>
                  <span className={styles.roleCompanyInline}>{role.company}</span>
                  <span className={styles.roleDescInline}>{role.description}</span>
                </div>
                {/* Expanded details — revealed on hover via CSS */}
                <div className={styles.roleDetails}>
                  <div className={styles.roleLeftInfo}>
                    <span className={styles.roleYear}>{role.year}</span>
                    <div>
                      <p className={styles.roleCompany}>{role.company}</p>
                      <p className={styles.rolePeriod}>· {role.period}</p>
                    </div>
                  </div>
                  <div className={styles.roleRightInfo}>
                    <p className={styles.roleDesc}>{role.description}</p>
                    <div className={styles.roleTags}>
                      {role.tags.map((t) => <Tag key={t} variant="outline">{t}</Tag>)}
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
