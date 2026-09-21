import { siteContent } from '../../data/siteContent'
import CubeButton from './CubeButton'
import ScrollRevealSection from './ScrollRevealSection'
import Reveal from './Reveal'
import styles from './ClosingCta.module.css'

const { home } = siteContent

/**
 * ClosingCta — the homepage's closing call-to-action: an oversized faded word
 * behind a big cube button, then a light-weight statement with muted
 * highlights. Content comes from siteContent.home.cta (buttonLabel, ctaHref,
 * segments). Reads the --ux-* colour tokens of the page it sits in.
 */
export default function ClosingCta({ cta = home.cta }) {
  return (
    <ScrollRevealSection className={styles.band}>
      <div className={`container ${styles.inner}`}>

        <Reveal variant="fadeIn" className={styles.bigWord}>
          <span aria-hidden="true">{cta.buttonLabel}</span>
        </Reveal>

        <Reveal variant="scaleUp">
          <CubeButton to={cta.ctaHref} variant="light" size="xl">
            {cta.buttonLabel}
          </CubeButton>
        </Reveal>

        <Reveal variant="fadeUp" as="p" className={styles.text}>
          {cta.segments.map((s, i) => (
            <span key={i} className={s.muted ? styles.muted : styles.light}>
              {s.text}
            </span>
          ))}
        </Reveal>

      </div>
    </ScrollRevealSection>
  )
}
