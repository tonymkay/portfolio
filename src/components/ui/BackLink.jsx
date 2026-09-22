import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './BackLink.module.css'

/**
 * BackLink — "← Back to …" link shown at the top of a case-study page.
 * Always goes to the listing it came from (not browser history), so it also
 * works when the page was opened directly from a shared link.
 */
export default function BackLink({ to, children }) {
  return (
    <Link to={to} className={styles.back}>
      <ArrowLeft className={styles.icon} size={18} strokeWidth={1.75} aria-hidden="true" />
      <span>{children}</span>
    </Link>
  )
}
