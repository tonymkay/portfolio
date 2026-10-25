import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import styles from './PillVideo.module.css'

const EASE = [0.22, 1, 0.36, 1]
const DURATION = 0.7
const RATIO = 9 / 16 // YouTube Short
const CLOSE_SIZE = 40
const CLOSE_GAP = 8
const shade = (alpha) => `rgba(11, 11, 14, ${alpha})`

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** The pill's on-screen box, as animatable values. */
const boxOf = (el) => {
  const r = el.getBoundingClientRect()
  return { left: r.left, top: r.top, width: r.width, height: r.height, borderRadius: r.width / 2 }
}

/** Centred box for the video at its own aspect ratio, kept inside the screen. */
const fitBox = (ratio) => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  let width = Math.min(vw * 0.92, 1100)
  let height = width / ratio
  const maxHeight = vh * 0.82
  if (height > maxHeight) {
    height = maxHeight
    width = height * ratio
  }
  return { left: (vw - width) / 2, top: (vh - height) / 2, width, height, borderRadius: 24 }
}

/**
 * PillVideo — a button (the pill) that opens a video preview.
 * Open: the video grows out of the pill to the centre of the screen while a
 * blurred, dimmed layer covers everything behind it.
 * Close (X button, Esc, or click outside): it shrinks back into the pill.
 * `children` is the pill's own content (photo, wave emoji).
 *
 * Loading: nothing is requested until the pill is clicked (the YouTube iframe
 * only exists while the preview is open). Then three bouncing dots show until
 * the player has loaded and autoplays.
 */
export default function PillVideo({ videoId, className, label = 'Play intro video', children }) {
  const buttonRef = useRef(null)
  const [phase, setPhase] = useState('closed') // closed | open | closing
  const [from, setFrom] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [, setResizeTick] = useState(0)

  const duration = prefersReducedMotion() ? 0.01 : DURATION

  const openPreview = useCallback(() => {
    if (phase !== 'closed' || !buttonRef.current) return
    setLoaded(false)
    setFrom(boxOf(buttonRef.current))
    setPhase('open')
  }, [phase])

  const closePreview = useCallback(() => {
    if (phase !== 'open' || !buttonRef.current) return
    setFrom(boxOf(buttonRef.current)) // re-measure: the pill may have moved
    setPhase('closing')
  }, [phase])

  useEffect(() => {
    if (phase !== 'open') return undefined
    const onKey = (e) => { if (e.key === 'Escape') closePreview() }
    const onResize = () => setResizeTick((n) => n + 1)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [phase, closePreview])

  const isOpen = phase === 'open'
  const loading = isOpen && !loaded
  const videoBox = fitBox(RATIO)
  const sideLeft = videoBox.left + videoBox.width + CLOSE_GAP + 4
  const fitsBeside = sideLeft + CLOSE_SIZE + 8 <= window.innerWidth
  const closeBox = fitsBeside
    ? { left: sideLeft, top: videoBox.top }
    : {
        left: videoBox.left + videoBox.width - CLOSE_SIZE,
        top: Math.max(8, videoBox.top - CLOSE_SIZE - CLOSE_GAP),
      }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={className}
        onClick={openPreview}
        aria-label={label}
        data-cursor-label="Play video"
      >
        {children}
      </button>

      {phase !== 'closed' && from && createPortal(
        <div className={styles.layer} role="dialog" aria-modal="true" aria-label="Intro video">
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: duration * 0.8, ease: EASE }}
            onClick={closePreview}
          />

          <motion.div
            className={styles.frame}
            initial={{ ...from, backgroundColor: shade(0) }}
            animate={isOpen
              ? { ...fitBox(RATIO), backgroundColor: shade(1) }
              : { ...from, backgroundColor: shade(0) }}
            transition={{ duration, ease: EASE }}
            onAnimationComplete={() => {
              if (phase === 'closing') {
                setPhase('closed')
                buttonRef.current?.focus({ preventScroll: true })
              }
            }}
          >
            {isOpen && (
              <motion.iframe
                className={styles.video}
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title="Intro video"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                onLoad={() => setLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            )}

            <motion.div
              className={styles.loader}
              role="status"
              aria-label="Loading video"
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 1 : 0 }}
              transition={{ duration: 0.3, delay: loading ? duration * 0.6 : 0 }}
            >
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className={styles.close}
            style={{ left: closeBox.left, top: closeBox.top }}
            onClick={closePreview}
            aria-label="Close video"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.25, delay: isOpen ? duration * 0.7 : 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>,
        document.body,
      )}
    </>
  )
}
