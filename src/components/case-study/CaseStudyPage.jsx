import styles from './CaseStudyPage.module.css'

/** Dark case-study wrapper. Defines the --ux-* tokens every case-study block reads. */
export default function CaseStudyPage({ children }) {
  return <div className={styles.page}>{children}</div>
}

/** Container for story blocks. `after` adds the top padding used below the Process band. */
export function Story({ after = false, children }) {
  return (
    <div className={`container ${styles.story} ${after ? styles.storyAfter : ''}`}>
      {children}
    </div>
  )
}
