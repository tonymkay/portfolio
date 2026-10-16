import { siteContent } from '../../data/siteContent'
import CubeButton from '../../components/ui/CubeButton'
import usePageTheme from '../../hooks/usePageTheme'
import styles from './Contact.module.css'

const { contact } = siteContent

export default function Contact() {
  usePageTheme('dark')

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-nav-title={contact.hero.eyebrow.replace('●', '').trim()}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.eyebrowRow}>
            <span className={styles.rule} aria-hidden="true" />
            <span className={styles.eyebrow}>{contact.hero.eyebrow.replace('●', '').trim()}</span>
            <span className={styles.rule} aria-hidden="true" />
          </div>
          <h1 className={styles.heroHeading}>{contact.hero.heading}</h1>
        </div>
      </section>

      <section className={styles.bookingSection} aria-label="Book a discovery call">
        <div className={`container ${styles.bookingWrap}`}>
          <p className={styles.formDesc}>{contact.description}</p>
          <CubeButton
            href={contact.calendlyUrl}
            variant="light"
            size="sm"
            className={styles.bookingButton}
          >
            {contact.bookingLabel}
          </CubeButton>
        </div>
      </section>

      <section className={styles.teaser}>
        <div className={`container ${styles.teaserInner}`}>
          <h2 className={styles.teaserHeading}>{contact.processTeaser.heading}</h2>
          <p className={styles.teaserDesc}>{contact.processTeaser.description}</p>
          <CubeButton to={contact.processTeaser.ctaHref} variant="light" size="sm">
            {contact.processTeaser.ctaLabel}
          </CubeButton>
        </div>
      </section>
    </main>
  )
}
