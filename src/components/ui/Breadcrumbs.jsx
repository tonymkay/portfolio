import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import styles from './Breadcrumbs.module.css'

/**
 * Breadcrumbs — "Home / Projects / Project Title" trail shown at the top
 * of a case-study page, above the hero title.
 *
 * `items` is an array of { label, to }. Every item except the last is a
 * link; the last item is treated as the current page and isn't clickable,
 * even if it has a `to`.
 */
export default function Breadcrumbs({ items }) {
  if (!items?.length) return null

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className={styles.item}>
              {isLast || !item.to ? (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  className={styles.separator}
                  size={14}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
