import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

/**
 * ProjectCard — one large rounded shot per card; title left,
 * "Category • Year" right. Used on the project lists and "Other Projects".
 * Inherits --ux-* colour tokens from the parent page.
 *
 * The whole card is the link. On hover only the photo zooms in.
 */
export default function ProjectCard({ project, to, ratio, ...linkProps }) {
  const { slug, title, category, year, coverImage } = project

  return (
    <Link
      to={to ?? `/ui-ux/${slug}`}
      className={styles.card}
      aria-label={`View ${title} case study`}
      data-nav-hover={title}
      {...linkProps}
    >
      <div className={styles.shot} style={ratio ? { aspectRatio: ratio } : undefined}>
        <img src={coverImage} alt={title} loading="lazy" />
      </div>
      <div className={styles.meta}>
        <span className={styles.title}>{title}</span>
        <span className={styles.info}>
          {category} <span aria-hidden="true">•</span> {year}
        </span>
      </div>
    </Link>
  )
}
