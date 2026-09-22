/**
 * ClientLogos.jsx
 *
 * Horizontal, gap-free infinite logo row, right → left. Same loop pattern as
 * TestimonialLoop: the list is rendered twice and the track moves 0 → -50%.
 * Pauses on hover. Items without a `logo` image get a placeholder mark
 * next to the client name — set `logo` in siteContent.js to replace it.
 */
import styles from './ClientLogos.module.css'

const SECONDS_PER_LOGO = 7

// Placeholder marks, cycled by index
const marks = [
  <circle key="a" cx="12" cy="12" r="9" />,
  <rect key="b" x="4" y="4" width="16" height="16" rx="3" />,
  <path key="c" d="M12 3 22 20H2z" />,
  <path key="d" d="M12 2 21 7v10l-9 5-9-5V7z" />,
  <path key="e" fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />,
  <path key="f" d="M4 20V10h4v10zm6 0V4h4v16zm6 0v-7h4v7z" />,
]

function Logo({ item, index }) {
  return (
    <li className={styles.item}>
      {item.logo ? (
        <img className={styles.image} src={item.logo} alt={item.name} />
      ) : (
        <>
          <svg className={styles.mark} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {marks[index % marks.length]}
          </svg>
          <span className={styles.name}>{item.name}</span>
        </>
      )}
    </li>
  )
}

export default function ClientLogos({ items }) {
  return (
    <div className={styles.viewport}>
      <div
        className={styles.track}
        style={{ '--loop-duration': `${items.length * SECONDS_PER_LOGO}s` }}
      >
        <ul className={styles.set}>
          {items.map((item, i) => (
            <Logo key={item.name} item={item} index={i} />
          ))}
        </ul>
        <ul className={styles.set} aria-hidden="true">
          {items.map((item, i) => (
            <Logo key={item.name} item={item} index={i} />
          ))}
        </ul>
      </div>
    </div>
  )
}
