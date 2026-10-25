import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { motion as motionPresets } from '../../theme/motion'
import { siteContent } from '../../data/siteContent'
import NameHero from '../../components/ui/NameHero'
import Reveal from '../../components/ui/Reveal'
import styles from './Intro.module.css'

const SEEN_KEY = 'navIntroSeen'
const EASE = [0.22, 1, 0.36, 1]
const COLLAPSE_S = 0.9
const BG_DARK = '#242429'

// Must match the navbar pill (Navbar.module.css: top 1.5rem, 28rem wide, 3.75rem tall)
const PILL_TOP = 24
const PILL_HEIGHT = 60
const PILL_MAX_WIDTH = 384
const PILL_RADIUS = 30
const PILL_SIDE_GAP = 32

const BUTTONS = [
  { label: 'My Work', to: '/' },
]

const OPEN_CLIP = 'inset(0px 0px 0px 0px round 0px)'

const seen = () => {
  try {
    return localStorage.getItem(SEEN_KEY) === '1' || sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    try { return sessionStorage.getItem(SEEN_KEY) === '1' } catch { return false }
  }
}

const markSeen = () => {
  try { localStorage.setItem(SEEN_KEY, '1') } catch { /* ignore */ }
  try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* ignore */ }
}

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Clip-path that shrinks the full screen down to the navbar pill's box. */
const pillClip = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  const pillW = Math.min(PILL_MAX_WIDTH, w - PILL_SIDE_GAP)
  const side = Math.max(0, (w - pillW) / 2)
  const bottom = Math.max(0, h - PILL_TOP - PILL_HEIGHT)
  return `inset(${PILL_TOP}px ${side}px ${bottom}px ${side}px round ${PILL_RADIUS}px)`
}

export default function Intro() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(() => pathname === '/' && !seen())
  const [closing, setClosing] = useState(null)

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const choose = useCallback((to) => {
    if (closing) return
    markSeen()
    setClosing({ clip: pillClip() })
    if (to !== '/') navigate(to)
  }, [closing, navigate])

  const duration = reducedMotion() ? 0.01 : COLLAPSE_S

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          className={styles.intro}
          initial={false}
          animate={closing
            ? { clipPath: closing.clip, backgroundColor: '#ffffff' }
            : { clipPath: OPEN_CLIP, backgroundColor: BG_DARK }}
          transition={{ duration, ease: EASE }}
          onAnimationComplete={() => { if (closing) setOpen(false) }}
          role="dialog"
          aria-label="Welcome"
        >
          <motion.div
            className={styles.content}
            animate={closing ? { opacity: 0, scale: 0.94, y: -24 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reducedMotion() ? 0.01 : 0.4, ease: EASE }}
          >
            <motion.div
              className={styles.stack}
              initial="hidden"
              animate="visible"
              variants={motionPresets.staggerContainer}
            >
              <NameHero videoId={siteContent.designer.introVideoId} />

              <Reveal variant="fadeUp" className={styles.actions}>
                {BUTTONS.map(({ label, to }) => (
                  <button
                    key={label}
                    type="button"
                    className={styles.button}
                    onClick={() => choose(to)}
                  >
                    {label}
                  </button>
                ))}
              </Reveal>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
