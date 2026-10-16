import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

/**
 * CustomCursor — a name tag that trails the mouse while it is over anything
 * marked [data-nav-hover="Project name"] (the project tiles). Mouse only:
 * it never mounts on touch screens.
 */
export default function CustomCursor() {
  const [label, setLabel] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let raf = 0

    const tick = () => {
      // Ease toward the mouse so the tag feels like it is being dragged
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      const el = e.target.closest ? e.target.closest('[data-nav-hover]') : null
      if (el) {
        // Start at the mouse so the tag does not fly in from the corner
        pos.x = e.clientX
        pos.y = e.clientY
        target.x = e.clientX
        target.y = e.clientY
      }
      setLabel(el ? el.dataset.navHover : '')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      <span className={`${styles.tag} ${label ? styles.visible : ''}`}>{label}</span>
    </div>
  )
}
