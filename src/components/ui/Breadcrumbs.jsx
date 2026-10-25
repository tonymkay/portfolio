import { Link } from 'react-router-dom'
import { ChevronRight, Home, ArrowLeft } from 'lucide-react'
import LabelRoller from './LabelRoller'
import styles from './Breadcrumbs.module.css'

/**
 * Breadcrumbs — "Home / Projects / Project Title" trail shown at the top
 * of a case-study page, above the hero title. The first item renders as
 * a home icon when its label is "Home".
 *
 * `items` is an array of { label, to }. Every item except the last is a
 * link; the last item is treated as the current page and isn't clickable,
 * even if it has a `to`.
 *
 * Scroll-aware mode (opt-in, used by the UX case studies): pass `sections`
 * (every section name the page can show). While `compact` is true the
 * trail collapses to just "Project Title / Section", where the section
 * rolls to the next one (the homepage word-rotator cube) as `section`
 * changes. The text also grows once compact.
 */
export default function Breadcrumbs({ items, compact = false, section = '', sections }) {
  if (!items?.length) return null

  const aware = Array.isArray(sections)
  // Compact (scrolled) trail: the project title becomes the way back to the listing
  const backTo = aware && compact ? items[items.length - 2]?.to : undefined

  return (
    <nav
      className={[
        styles.breadcrumbs,
        aware ? styles.aware : '',
        aware && compact ? styles.compact : '',
      ].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
    >
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          const isHome = i === 0 && item.label === 'Home'
          const collapsed = aware && compact && !isLast
          const label = isHome
            ? <Home size={15} strokeWidth={1.75} aria-hidden="true" />
            : item.label

          return (
            <li
              key={item.label}
              className={`${styles.item} ${aware && !isLast ? styles.collapsible : ''}`}
              aria-hidden={collapsed ? 'true' : undefined}
            >
              {isLast && backTo ? (
                <Link
                  to={backTo}
                  className={styles.backLink}
                  aria-label={`Back to ${items[items.length - 2].label}`}
                >
                  <ArrowLeft className={styles.backArrow} size={18} strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </Link>
              ) : isLast || !item.to ? (
                <span
                  className={styles.current}
                  aria-current={isLast ? 'page' : undefined}
                  aria-label={isHome ? 'Home' : undefined}
                >
                  {label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={styles.link}
                  aria-label={isHome ? 'Home' : undefined}
                  tabIndex={collapsed ? -1 : undefined}
                >
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

        {aware && (
          <li className={styles.sectionItem} aria-hidden={compact ? undefined : 'true'}>
            <span className={styles.slash} data-visible={section ? 'true' : 'false'} aria-hidden="true">
              /
            </span>
            <LabelRoller value={section} words={sections} className={styles.sectionRoller} />
          </li>
        )}
      </ol>
    </nav>
  )
}
