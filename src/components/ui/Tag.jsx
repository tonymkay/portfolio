import styles from './Tag.module.css'

/**
 * Tag / Pill — used for project categories, skill labels
 */
export default function Tag({ children, variant = 'default', size = 'sm' }) {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${styles[size]}`}>
      {children}
    </span>
  )
}
