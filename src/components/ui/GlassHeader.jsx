import styles from './GlassHeader.module.css'

/**
 * GlassHeader — static header block for the Logos & Identities and UX/UI
 * listings. It scrolls away with the page; the navbar is the only element
 * that stays pinned.
 */
export default function GlassHeader({ children }) {
  return <div className={styles.bar}>{children}</div>
}
