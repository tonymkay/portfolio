import { NavLink } from 'react-router-dom'
import styles from './WorkTabs.module.css'

const tabs = [
  { label: 'Logos & Identities', to: '/projects' },
  { label: 'UI/UX Design', to: '/ui-ux' },
]

/**
 * WorkTabs — switches between the two portfolio sections.
 * Rendered at the top of both listing pages.
 */
export default function WorkTabs() {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Portfolio sections">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          role="tab"
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}
