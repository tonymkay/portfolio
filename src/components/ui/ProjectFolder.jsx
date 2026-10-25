import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { setSheetOrigin } from '../../hooks/sheetOrigin'
import useDominantColor from '../../hooks/useDominantColor'
import styles from './ProjectFolder.module.css'

/**
 * ProjectFolder — a case study as a glass-fronted folder.
 * Rest: the cover sits low behind a frosted glass panel.
 * Hover: the cover rises, the glass drops to a strip, four chips float out.
 * Below: first-person statement, then "service · category · client · status".
 * Inherits --ux-* colour tokens from the parent page.
 *
 * The whole card is the link. On click it hands the folder's box to the
 * project sheet so the sheet expands out of it (same as <ProjectCard>).
 */
export default function ProjectFolder({ project, to }) {
  const { slug, title, statement, category, service, client, year, coverImage, website } = project
  const status = project.status ?? (website ? 'Shipped' : 'Prototype')
  const accent = useDominantColor(coverImage)
  const cardRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Touch devices can't hover: play the reveal while the card crosses the
  // middle of the screen, and reset it once it leaves.
  useEffect(() => {
    const el = cardRef.current
    if (!el || !window.matchMedia('(hover: none)').matches) return undefined
    const io = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { rootMargin: '-30% 0px -30% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleClick = (e) => {
    setSheetOrigin(e.currentTarget.querySelector(`.${styles.folder}`))
  }

  return (
    <Link
      ref={cardRef}
      data-revealed={revealed}
      to={to ?? `/ui-ux/${slug}`}
      className={styles.card}
      style={accent ? { '--accent': accent.base, '--accent-chip': accent.chip } : undefined}
      aria-label={`View ${title} case study`}
      data-nav-hover={title}
      data-cursor-label={project.cursorLabel ?? 'Open case study'}
      onClick={handleClick}
    >
      <div className={styles.folder}>
        <div className={styles.back} />
        {project.covers?.length ? (
          project.covers.map((src, i) => (
            <img
              key={src}
              className={`${styles.cover} ${styles.fan} ${styles[`fan${i}`]}`}
              src={src}
              alt={i === 1 ? title : ''}
              loading="lazy"
            />
          ))
        ) : (
          <img className={styles.cover} src={coverImage} alt={title} loading="lazy" />
        )}
        {!project.minimal && (
          <>
            <span className={`${styles.chip} ${styles.c1}`} aria-hidden="true">{service}</span>
            <span className={`${styles.chip} ${styles.c2}`} aria-hidden="true">{status}</span>
            <span className={`${styles.chip} ${styles.c3}`} aria-hidden="true">{year}</span>
            <span className={`${styles.chip} ${styles.c4}`} aria-hidden="true">{category}</span>
          </>
        )}
      </div>
      <div className={styles.pane} aria-hidden="true" />
      <div className={styles.text}>
        {project.minimal ? (
          <p className={styles.statement}>{title}</p>
        ) : (
          <>
            <p className={styles.statement}>{statement}</p>
            <p className={styles.meta}>
              {[service, category, client, status].map((item, i) => (
                <span key={item}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  {item}
                </span>
              ))}
            </p>
          </>
        )}
      </div>
    </Link>
  )
}
