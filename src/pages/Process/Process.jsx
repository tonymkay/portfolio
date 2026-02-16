import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { motion as motionPresets } from '../../theme/motion'
import CtaBanner from '../../components/ui/CtaBanner'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import styles from './Process.module.css'

const { process, images: pageImages } = siteContent

export default function Process() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <div
          className={styles.heroOverlay}
          style={pageImages.processHero ? { backgroundImage: `url(${pageImages.processHero})` } : {}}
        />
        <div className={`container ${styles.heroContent}`}>
          <Reveal variant="popIn" as="span" className={styles.eyebrow}>
            {process.hero.eyebrow}
          </Reveal>
          <Reveal variant="fadeUp" as="h1" className={styles.heroHeading}>
            {process.hero.heading}
          </Reveal>
        </div>
      </motion.section>

      {/* ── Three Steps ── */}
      <ScrollRevealSection className={styles.steps}>
        <div className={`container ${styles.stepsGrid}`}>

          <Reveal variant="slideLeft" className={styles.stepsLeft}>
            <span className={styles.eyebrowDark}>{process.steps.eyebrow}</span>
            <h2 className={styles.stepsHeading}>{process.steps.heading}</h2>
          </Reveal>

          <div className={styles.stepsRight}>
            {process.steps.items.map((step, i) => (
              <Reveal key={step.number} variant="fadeUp" className={styles.step}>
                {/* Left col: number circle + dashed connector */}
                <div className={styles.stepIndicator}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  {i < process.steps.items.length - 1 && (
                    <span className={styles.stepConnector} aria-hidden="true" />
                  )}
                </div>
                {/* Right col: content */}
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                  {/* Book a Call CTA after step 1 only */}
                  {i === 0 && (
                    <Link to="/contact" className={styles.stepCta}>
                      Book a Call ↗
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </ScrollRevealSection>

      {/* ── Moodboard ── */}
      <ScrollRevealSection className={styles.moodboard}>
        <div className="container">
          <div className={styles.moodHeader}>
            <Reveal variant="popIn" as="span" className={styles.eyebrowDark}>
              {process.moodboard.eyebrow}
            </Reveal>
            <Reveal variant="fadeUp" as="h2" className={styles.moodHeading}>
              {process.moodboard.heading}
            </Reveal>
            <Reveal variant="fadeIn" as="span" className={styles.viewMore}>
              {process.moodboard.viewMoreLabel}
            </Reveal>
          </div>
          <div className={styles.moodGrid}>
            {pageImages.moodboard.map((img, i) => (
              <Reveal
                key={i}
                variant="scaleUp"
                className={`${styles.moodCell} ${i === 3 ? styles.moodCellWide : ''}`}
              >
                {img ? (
                  <img src={img} alt={`Moodboard ${i + 1}`} className={styles.moodImg} loading="lazy" />
                ) : (
                  <div className={styles.moodPlaceholder} aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* ── Brand Direction ── */}
      <ScrollRevealSection className={styles.direction}>
        <div className="container">
          <div className={styles.dirHeader}>
            <Reveal variant="popIn" as="span" className={styles.eyebrowDark}>
              {process.direction.eyebrow}
            </Reveal>
            <Reveal variant="fadeUp" as="h2" className={styles.dirHeading}>
              {process.direction.heading}
            </Reveal>
            <Reveal variant="fadeIn" as="span" className={styles.viewMore}>
              {process.direction.viewMoreLabel}
            </Reveal>
          </div>
          <div className={styles.dirGrid}>
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
                  <div className={styles.dirPanelPlaceholder} aria-hidden="true">
                    <span className={styles.dirPanelLabel}>
                      {['Heritage & Craft', 'Modern & Digital', 'Bold & Iconic'][i]}
                    </span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* ── Workflow Diagram ── */}
      <ScrollRevealSection className={styles.workflow}>
        <div className="container">
          <div className={styles.wfHeader}>
            <Reveal variant="popIn" as="span" className={styles.eyebrowDark}>
              {process.workflow.eyebrow}
            </Reveal>
            <Reveal variant="fadeUp" as="h2" className={styles.wfHeading}>
              {process.workflow.heading}
            </Reveal>
          </div>
          <Reveal variant="slideLeft" className={styles.wfDiagram}>
            {process.workflow.steps.map((s, i) => (
              <div key={i} className={styles.wfStepWrapper}>
                <div className={styles.wfStep}>
                  <span className={styles.wfStepLabel}>{s.label}</span>
                  <span className={styles.wfStepValue}>{s.value}</span>
                </div>
                {i < process.workflow.steps.length - 1 && (
                  <span className={styles.wfArrow}>→</span>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </ScrollRevealSection>

      {/* ── CTA card above footer — normal light style ── */}
      <CtaBanner
        heading={process.cta.heading}
        description={process.cta.description}
        ctaLabel={process.cta.ctaLabel}
        ctaHref={process.cta.ctaHref}
        image={pageImages.homeCta}
      />

    </div>
  )
}
