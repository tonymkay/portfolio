import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

/**
 * CustomCursor — a glass cursor shown over project tiles. Mouse only: it never
 * mounts on touch screens.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    const onMove = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const onOver = (e) => {
      const el = e.target.closest ? e.target.closest('[data-nav-hover]') : null
      setVisible(Boolean(el))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div ref={ref} className={`${styles.cursor} ${visible ? styles.visible : ''}`} aria-hidden="true" />
  )
}
