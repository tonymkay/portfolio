import CountUp from './CountUp'
import styles from './BigStatHeader.module.css'

/**
 * BigStatHeader — big thin title on top, — 08 PROJECTS — rule row below.
 * Shared by the Projects and UI/UX listing pages. Reads the --ux-* colour
 * tokens of the page it sits in.
 *
 * The counter is keyed on count + label, so it recounts whenever either
 * changes (e.g. when a category filter is picked).
 *
 * Props: title, count, label, plus optional
 *   suffix   — text right after the number (e.g. "+")
 *   as       — heading tag for the title (default h1; About uses h2)
 *   duration — count-up time in ms (default 1200)
 *   pad      — minimum digits, passed to CountUp (its default is 2 → "08")
 */
export default function BigStatHeader({
  title,
  count,
  label,
  suffix = '',
  as: Title = 'h1',
  duration = 1200,
  pad,
}) {
  return (
    <div className={styles.bigStat}>
      <Title className={styles.title}>{title}</Title>
      <div className={styles.eyebrowRow}>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.eyebrow}>
          <CountUp
            key={`${label}-${count}`}
            to={count}
            duration={duration}
            pad={pad}
            className={styles.value}
          />
          {suffix}{' '}
          {label}
        </span>
        <span className={styles.rule} aria-hidden="true" />
      </div>
    </div>
  )
}
