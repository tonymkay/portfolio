import { Link } from 'react-router-dom'
import { Globe, Mail, X } from 'lucide-react'
import styles from './ProjectSideRail.module.css'

/** Figma mark as inline SVG (lucide-react v1 dropped brand icons). */
function FigmaIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  )
}

/**
 * ProjectSideRail — icon action bar pinned at the bottom centre of a
 * case-study page: close, visit the live site, open the Figma prototype, or
 * get in touch. Buttons only appear for links the project actually has;
 * "Contact" is always there. Labels show as a tooltip (above) on hover/focus.
 */
export default function ProjectSideRail({ website, prototype, onClose }) {
  return (
    <aside className={styles.rail} aria-label="Project links">
      {onClose && (
        <>
          <button
            type="button"
            className={styles.btn}
            data-label="Close"
            aria-label="Close project"
            onClick={onClose}
          >
            <X size={20} strokeWidth={1.75} />
          </button>
          <span className={styles.divider} aria-hidden="true" />
        </>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
          aria-label="Visit website"
        >
          <Globe size={18} strokeWidth={1.75} />
          <span className={styles.label}>Visit website</span>
        </a>
      )}

      {prototype && (
        <a
          href={prototype}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
          aria-label="View on Figma"
        >
          <FigmaIcon size={18} />
          <span className={styles.label}>View on Figma</span>
        </a>
      )}

      <Link to="/contact" className={styles.btn} aria-label="Contact me">
        <Mail size={18} strokeWidth={1.75} />
        <span className={styles.label}>Contact me</span>
      </Link>
    </aside>
  )
}
