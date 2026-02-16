import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

/**
 * ProjectCard — used in Projects grid and Home featured section
 * @param {object} project — from projects.js
 * @param {string} size    — 'sm' | 'md' | 'lg' (lg = spans 2 cols in masonry)
 */
export default function ProjectCard({ project, size = 'md', className = '' }) {
  const { slug, title, category, coverImage, tags } = project

  return (
    <Link
      to={`/projects/${slug}`}
      className={`${styles.card} ${styles[size]} ${className}`}
      aria-label={`View ${title} project`}
    >
      <div className={styles.imageWrapper}>
        {coverImage ? (
          <img src={coverImage} alt={title} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>{title}</span>
          </div>
        )}
        <div className={styles.overlay}>
          <span className={styles.arrowIcon}>↗</span>
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.title}>{title}</span>
        {category && <span className={styles.category}>{category}</span>}
      </div>
    </Link>
  )
}
