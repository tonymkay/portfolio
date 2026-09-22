import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './WorkTabs.module.css'

const tabs = [
  { label: 'Logos & Identities', to: '/projects' },
  { label: 'UI/UX Design', to: '/ui-ux' },
]

/**
 * WorkTabs — switches between the two portfolio sections.
 * Lives in WorkLayout, so it stays put while the page below swipes.
 * The highlight pill is shared (layoutId) so it glides to the new tab.
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
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="work-tab-pill"
                  className={styles.pill}
                  style={{ borderRadius: 9999 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <span className={styles.label}>{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}
