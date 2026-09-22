import ScrollRevealSection from '../ui/ScrollRevealSection'
import Reveal from '../ui/Reveal'
import styles from './ProcessSteps.module.css'

/**
 * "The Process" — numbered steps joined by a dashed connector (same look as
 * the Process page). The project's own note sits under the title on the left.
 */
export default function ProcessSteps({ intro, steps }) {
  if (!steps?.length) return null
  return (
    <ScrollRevealSection className={styles.process}>
      <div className={`container ${styles.processInner}`}>

        <div className={styles.processLeft}>
          <Reveal variant="fadeUp" as="h2" className={styles.heading}>The Process</Reveal>
          {intro && <Reveal variant="fadeUp" as="p" className={styles.body}>{intro}</Reveal>}
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal key={step.number ?? i} variant="fadeUp" className={styles.step}>
              <div className={styles.stepIndicator}>
                <span className={styles.stepNumber}>{step.number ?? i + 1}</span>
                {i < steps.length - 1 && (
                  <span className={styles.stepConnector} aria-hidden="true" />
                )}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </ScrollRevealSection>
  )
}
