import styles from './SectionHeading.module.css'

/**
 * SectionHeading — eyebrow + heading used on every section
 */
export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'left',
  light = false,
  className = '',
}) {
  return (
    <div className={`${styles.wrapper} ${styles[align]} ${light ? styles.light : ''} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.heading}>{heading}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
