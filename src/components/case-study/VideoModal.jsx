import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './VideoModal.module.css'

/**
 * VideoModal — YouTube pop-up. Shows a three-dot pulsing loader until the
 * iframe has loaded, then the video plays. Closes on backdrop click, the
 * close button, or Escape.
 */
export default function VideoModal({ videoId, title, onClose }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close video"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <div className={styles.frame}>
          {!loaded && (
            <div className={styles.loader} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
          <iframe
            className={`${styles.iframe} ${loaded ? styles.iframeReady : ''}`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
