
import { useLayoutEffect, useMemo, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { clearSheetOrigin, getSheetOrigin, setSheetOrigin } from '../../hooks/sheetOrigin'
import { getPosterBySlug, getRelatedPosters, posterProjects } from '../../data/posters'
import usePageTheme from '../../hooks/usePageTheme'
import PosterGrid from '../../components/ui/PosterGrid'
import ClosingCta from '../../components/ui/ClosingCta'
import styles from './PosterDetail.module.css'

// /posters/:slug — the poster on the left; its details and related posters on
// the right; every other poster in a grid below. Opening a poster from the
// related list or the grid swaps this page to that poster (history replaced,
// so Back never walks through every poster that was opened).
export default function PosterDetail() {
  const { slug } = useParams()
  usePageTheme('dark')

  const poster = getPosterBySlug(slug)
  const related = useMemo(() => getRelatedPosters(slug, 4), [slug])
  const rest = useMemo(() => posterProjects.filter((p) => p.slug !== slug), [slug])
  const imgRef = useRef(null)

  // The poster flies from the clicked tile to its place at the top.
  useLayoutEffect(() => {
    const img = imgRef.current
    const origin = getSheetOrigin()
    clearSheetOrigin()
    if (!img || !origin || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    let cancelled = false
    let anim = null
    img.style.visibility = 'hidden'

    const run = () => {
      if (cancelled) return
      img.style.visibility = ''
      const r = img.getBoundingClientRect()
      if (!r.width || !r.height) return
      anim = img.animate(
        [
          {
            transformOrigin: 'top left',
            transform: `translate(${origin.left - r.left}px, ${origin.top - r.top}px) scale(${
              origin.width / r.width
            }, ${origin.height / r.height})`,
          },
          { transformOrigin: 'top left', transform: 'translate(0, 0) scale(1, 1)' },
        ],
        { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      )
    }

    const ready = img.decode ? img.decode() : Promise.resolve()
    ready.then(run, run)

    return () => {
      cancelled = true
      anim?.cancel()
      img.style.visibility = ''
    }
  }, [slug])

  if (!poster) return <Navigate to="/posters" replace />

  return (
    <div className={styles.page}>
      <section className={`container ${styles.top}`}>
        <div className={styles.frame}>
          <div className={styles.posterCell}>
            <img
              ref={imgRef}
              className={styles.poster}
              src={poster.coverImage}
              alt={poster.title}
              decoding="async"
            />
          </div>

          <aside className={styles.side}>
            <h1 className={styles.title} data-nav-title={poster.title}>
              {poster.title}
            </h1>
            <p className={styles.meta}>
              {poster.category} · {poster.year}
            </p>
            {poster.description && <p className={styles.desc}>{poster.description}</p>}

            {related.length > 0 && (
              <ul className={styles.related}>
                {related.map((p) => (
                  <li key={p.id} className={styles.relatedItem}>
                    <Link
                      to={`/posters/${p.slug}`}
                      replace
                      onClick={(e) => setSheetOrigin(e.currentTarget)}
                      data-nav-hover={p.title}
                      aria-label={p.title}
                    >
                      <img className={styles.relatedImg} src={p.coverImage} alt={p.title} loading="lazy" decoding="async" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </section>

      <div className={`container ${styles.rest}`}>
        <PosterGrid projects={rest} replace />
      </div>

      <ClosingCta />
    </div>
  )
}
