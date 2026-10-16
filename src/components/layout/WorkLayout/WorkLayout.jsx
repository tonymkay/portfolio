import { Outlet } from 'react-router-dom'
import usePageTheme from '../../../hooks/usePageTheme'
import styles from './WorkLayout.module.css'

/**
 * WorkLayout — shared shell for the two portfolio listings (/projects and
 * /ui-ux). Provides the dark theme tokens for both pages. No page-to-page
 * animation: moving between the two works like any other route change.
 *
 * (The tab switch that used to sit on top has been removed.)
 */
export default function WorkLayout() {
  // One dark theme for both listings, held here so it never flickers between them
  usePageTheme('dark')

  return (
    <div className={styles.layout}>
      {/* Tab switch (<WorkTabs />) removed — the two listings are reached
          from the navbar only. Re-add it here to bring it back:
          <div className={`container ${styles.tabsRow}`}><WorkTabs /></div> */}

      <div className={styles.viewport}>
        <Outlet />
      </div>
    </div>
  )
}
