import { Link } from 'react-router-dom'
import { setSheetOrigin } from '../../hooks/sheetOrigin'
import styles from './ProjectCard.module.css'

/**
 * ProjectCard — one large rounded shot per card; title left,
 * "Category • Year" right. Used on the project lists and "Other Projects".
 * Inherits --ux-* colour tokens from the parent page.
 *
 * The whole card is the link. On hover only the photo zooms in. On click it
 * hands its photo's box to the project sheet so the sheet can expand out of
 * it (cards inside an open sheet don't — there's no tile to grow from).
 */
export default function ProjectCard({ project, to, ratio, onClick, ...linkProps }) {
  const { slug, title, category, year, coverImage } = project

  const handleClick = (e) => {
    const inSheet = e.currentTarget.closest('[role="dialog"]')
    setSheetOrigin(inSheet ? null : e.currentTarget.querySelector(`.${styles.shot}`))
    onClick?.(e)
  }

  return (
    <Link
      to={to ?? `/ui-ux/${slug}`}
      className={styles.card}
      aria-label={`View ${title} case study`}
      data-nav-hover={title}
      onClick={handleClick}
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
