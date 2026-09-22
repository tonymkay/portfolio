import { Link } from 'react-router-dom'
import CubeButton from './CubeButton'
import styles from './ProjectCard.module.css'

/**
 * ProjectCard — one large shot per row with a centered "VIEW MORE" button;
 * title left, "Category • Year" right. Used on the project lists, Home and
 * "Other Projects". Inherits --ux-* colour tokens from the parent page.
 *
 * The whole card is the link, so the button is a non-interactive CubeButton
 * (as="span") that rolls when the card is hovered ("cube-group").
 */
export default function ProjectCard({ project, to, ratio, ...linkProps }) {
  const { slug, title, category, year, coverImage } = project

  return (
    <Link
      to={to ?? `/ui-ux/${slug}`}
      className={`${styles.card} cube-group`}
      aria-label={`View ${title} case study`}
      {...linkProps}
    >
      <div className={styles.shot} style={ratio ? { aspectRatio: ratio } : undefined}>
        <img src={coverImage} alt={title} loading="lazy" />
        <span className={styles.buttonWrap}>
          <CubeButton as="span" variant="surface" rollOnGroupHover className={styles.button}>
            VIEW MORE
          </CubeButton>
        </span>
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
