import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { motion as motionPresets } from '../../theme/motion'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import CtaBanner from '../../components/ui/CtaBanner'
import CubeButton from '../../components/ui/CubeButton'
import styles from './Contact.module.css'

const { contact, home, images: pageImages } = siteContent

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: 'KE',
    phone: '',
    message: '',
    agreed: false,
  })
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! We will be in touch soon.')
  }

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
          style={pageImages.contactHero ? { backgroundImage: `url(${pageImages.contactHero})` } : {}}
        />
        <div className={`container ${styles.heroContent}`}>
          <Reveal variant="popIn" as="span" className={styles.eyebrow}>
            {contact.hero.eyebrow}
          </Reveal>
          <Reveal variant="fadeUp" as="h1" className={styles.heroHeading}>
            {contact.hero.heading}
          </Reveal>
        </div>
      </motion.section>

      {/* ── Form ── */}
      <ScrollRevealSection className={styles.formSection}>
        <div className={`container ${styles.formWrap}`}>

          <Reveal variant="fadeIn" as="p" className={styles.formDesc}>
            {contact.description}
          </Reveal>

          <Reveal variant="fadeUp" className={styles.form} role="form">
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>{contact.form.fields.firstName}</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder={contact.form.placeholders.firstName}
                  value={form.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocused('firstName')}
                  onBlur={() => setFocused(null)}
                  className={`${styles.input} ${focused === 'firstName' ? styles.inputFocused : ''}`}
                  autoComplete="given-name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{contact.form.fields.lastName}</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder={contact.form.placeholders.lastName}
                  value={form.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocused('lastName')}
                  onBlur={() => setFocused(null)}
                  className={`${styles.input} ${focused === 'lastName' ? styles.inputFocused : ''}`}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{contact.form.fields.email}</label>
              <input
                type="email"
                name="email"
                placeholder={contact.form.placeholders.email}
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className={`${styles.input} ${focused === 'email' ? styles.inputFocused : ''}`}
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{contact.form.fields.phone}</label>
              <div className={`${styles.phoneRow} ${focused === 'phone' ? styles.phoneRowFocused : ''}`}>
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className={styles.selectCode}
                >
                  <option value="KE">KE</option>
                  <option value="US">US</option>
                  <option value="GB">GB</option>
                  <option value="UG">UG</option>
                  <option value="TZ">TZ</option>
                  <option value="ZA">ZA</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder={contact.form.placeholders.phone}
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  className={`${styles.input} ${styles.phoneInput}`}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{contact.form.fields.message}</label>
              <textarea
                name="message"
                placeholder={contact.form.placeholders.message}
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className={`${styles.input} ${styles.textarea} ${focused === 'message' ? styles.inputFocused : ''}`}
                rows={5}
              />
            </div>

            <div className={styles.checkRow}>
              <input
                type="checkbox"
                id="agreed"
                name="agreed"
                checked={form.agreed}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="agreed" className={styles.checkLabel}>
                {contact.form.privacyLabel}{' '}
                <a href={contact.form.privacyHref} className={styles.privacyLink}>
                  {contact.form.privacyLinkLabel}
                </a>
                .
              </label>
            </div>

            <CubeButton
              rounded
              fullWidth
              size="lg"
              onClick={handleSubmit}
              disabled={!form.agreed}
            >
              {contact.form.submitLabel}
            </CubeButton>
          </Reveal>
        </div>
      </ScrollRevealSection>

      {/* ── Process Teaser — consistent card above footer ── */}
      <ScrollRevealSection className={styles.teaser} as="div">
        <div className={`container ${styles.teaserInner}`}>
          <Reveal variant="fadeUp" as="h2" className={styles.teaserHeading}>
            {contact.processTeaser.heading}
          </Reveal>
          <Reveal variant="fadeIn" as="p" className={styles.teaserDesc}>
            {contact.processTeaser.description}
          </Reveal>
          <Reveal variant="scaleUp">
            <Link to={contact.processTeaser.ctaHref} className={styles.teaserCta}>
              {contact.processTeaser.ctaLabel}
            </Link>
          </Reveal>
        </div>
      </ScrollRevealSection>

    </div>
  )
}
