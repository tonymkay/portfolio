import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import usePageTheme from '../../../hooks/usePageTheme'
import WorkTabs from '../../ui/WorkTabs'
import styles from './WorkLayout.module.css'

/**
 * WorkLayout — shared shell for the two portfolio listings (/projects and
 * /ui-ux). The tab switch stays fixed on top; the page below swipes out and
 * the next one swipes in, in the direction of the tab you picked.
 *
 * Order matters: moving to a later tab swipes left, back to an earlier one
 * swipes right.
 */
const ORDER = ['/projects', '/ui-ux']

// How far (as % of the page width) the pages travel while they fade.
const SHIFT = 18

const swipe = {
  enter: (dir) => ({ x: `${dir * SHIFT}%`, opacity: 0 }),
  center: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    x: `${dir * -SHIFT}%`,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  }),
}

export default function WorkLayout() {
  // One dark theme for both listings, held here so it never flickers between them
  usePageTheme('dark')

  const location = useLocation()
  const outlet = useOutlet()

  const path = location.pathname.replace(/\/$/, '')
  const index = Math.max(0, ORDER.indexOf(path))

  // Direction = forward (1) if the new tab comes later than the previous one
  const prevIndex = useRef(index)
  const direction = index >= prevIndex.current ? 1 : -1
  useEffect(() => {
    prevIndex.current = index
  }, [index])

  return (
    <div className={styles.layout}>
      <div className={`container ${styles.tabsRow}`}>
        <WorkTabs />
      </div>

      <div className={styles.viewport}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={path}
            custom={direction}
            variants={swipe}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
