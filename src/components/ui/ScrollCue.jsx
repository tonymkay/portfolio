import styles from './ScrollCue.module.css'

/**
 * ScrollCue — animated mouse icon + "scroll to see work" label.
 * Tells the visitor the page scrolls. Clicking it scrolls past the hero.
 * Replaces the socials + "Get in touch" button in the Home and About heroes.
 */
export default function ScrollCue({ label = 'scroll to see work' }) {
  const handleClick = (e) => {
    const hero = e.currentTarget.closest('section')
    const next = hero?.nextElementSibling
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
  }

  return (
    <button type="button" className={styles.cue} onClick={handleClick} aria-label={label}>
      <svg className={styles.mouse} viewBox="0 0 28 40" aria-hidden="true">
        <rect x="1.5" y="1.5" width="25" height="37" rx="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <g className={styles.arrow} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 11v18" />
          <path d="M10 15l4-4 4 4" />
          <path d="M10 25l4 4 4-4" />
        </g>
      </svg>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
