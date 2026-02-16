import { Link } from 'react-router-dom'
import ScrollRevealSection from './ScrollRevealSection'
import Reveal from './Reveal'
import styles from './CtaBanner.module.css'

/**
 * CtaBanner — reused on every page above the footer.
 *
 * Props:
 *   heading    — main heading text
 *   description — optional sub-text
 *   ctaLabel   — link label
 *   ctaHref    — link target
 *   dark       — boolean: renders dark navy/photo card (Process page style)
 *   bgImage    — optional photo URL; only used when dark=true
 *   image      — optional image URL for light mode CTA
 */
export default function CtaBanner({ heading, description, ctaLabel, ctaHref, dark = false, bgImage = null, image = null }) {
  return (
    <ScrollRevealSection className={dark ? styles.sectionDark : styles.section} as="div">
      <div className={`container`}>
        <div className={dark ? styles.innerDark : styles.inner}>
          {/* Background photo layer — only in dark mode */}
          {dark && (
            <div
              className={styles.bgLayer}
              style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
            />
          )}
          {/* Image for light mode CTA */}
          {!dark && image && (
            <div className={styles.imageWrapper}>
              <img src={image} alt="" className={styles.image} />
            </div>
          )}
          <div className={dark ? styles.contentDark : styles.content}>
            <Reveal variant="fadeUp" as="h2" className={dark ? styles.headingDark : styles.heading}>
              {heading}
            </Reveal>
            {description && (
              <Reveal variant="fadeIn" as="p" className={dark ? styles.descriptionDark : styles.description}>
                {description}
              </Reveal>
            )}
            <Reveal variant="scaleUp">
              <Link to={ctaHref} className={dark ? styles.ctaDark : styles.cta}>
                {ctaLabel}
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  )
}
