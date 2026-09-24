import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { motion as motionPresets } from '../../theme/motion'
import Reveal from '../ui/Reveal'
import CubeButton from '../ui/CubeButton'
import Breadcrumbs from '../ui/Breadcrumbs'
import styles from './CaseStudyHeader.module.css'

/**
 * Case-study header: breadcrumbs, title, subtitle, meta row and hero image.
 * `meta` is [{ label, value }] (empty values are skipped); `website` adds a
 * "See live" link to the meta row.
 */
export default function CaseStudyHeader({
  breadcrumbs,
  title,
  subtitle,
  meta = [],
  website,
  heroImage,
}) {
  const items = meta.filter((m) => m.value)

  return (
    <motion.header
      className={`container ${styles.header}`}
      initial="hidden"
      animate="visible"
      variants={motionPresets.staggerContainer}
    >
      <Reveal variant="fadeUp">
        <Breadcrumbs items={breadcrumbs} />
      </Reveal>
      <Reveal variant="fadeUp" as="h1" className={styles.title}>{title}</Reveal>
      {subtitle && (
        <Reveal variant="fadeUp" as="p" className={styles.subtitle}>{subtitle}</Reveal>
      )}

      <Reveal variant="fadeUp" className={styles.meta}>
        {items.map((m) => (
          <div key={m.label} className={styles.metaItem}>
            <span className={styles.metaLabel}>{m.label}</span>
            <span className={styles.metaValue}>{m.value}</span>
          </div>
        ))}
        {website && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Website</span>
            <CubeButton href={website} external variant="light" size="sm" className={styles.websiteBtn}>
              See live
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </CubeButton>
          </div>
        )}
      </Reveal>

      {heroImage && (
        <Reveal variant="fadeUp" className={styles.hero}>
          <img src={heroImage} alt={`${title} hero`} loading="eager" />
        </Reveal>
      )}
    </motion.header>
  )
}
