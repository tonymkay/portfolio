import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import styles from './Breadcrumbs.module.css'

/**
 * Breadcrumbs — "Home / Projects / Project Title" trail shown at the top
 * of a case-study page, above the hero title. The first item renders as
 * a home icon when its label is "Home".
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
          const isHome = i === 0 && item.label === 'Home'
          const label = isHome
            ? <Home size={15} strokeWidth={1.75} aria-hidden="true" />
            : item.label

          return (
            <li key={item.label} className={styles.item}>
              {isLast || !item.to ? (
                <span
                  className={styles.current}
                  aria-current={isLast ? 'page' : undefined}
                  aria-label={isHome ? 'Home' : undefined}
                >
                  {label}
                </span>
              ) : (
                <Link to={item.to} className={styles.link} aria-label={isHome ? 'Home' : undefined}>
                  {label}
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
