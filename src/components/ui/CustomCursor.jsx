import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

/**
 * CustomCursor — shown over project tiles. Mouse only: it never mounts on
 * touch screens. Over a plain [data-nav-hover] tile it is a glass disc
 * centred on the pointer; over one that also carries data-cursor-label it is
 * a solid pill with that text that tags along below and to the right of the
 * native arrow (flipping left near the screen edge) and disappears on leave.
 */
const OFFSET_X = 14
const OFFSET_Y = 20

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const ref = useRef(null)
  const labelled = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      if (labelled.current) {
        const flip = e.clientX + OFFSET_X + el.offsetWidth > window.innerWidth
        const x = flip ? e.clientX - OFFSET_X - el.offsetWidth : e.clientX + OFFSET_X
        el.style.transform = `translate3d(${x}px, ${e.clientY + OFFSET_Y}px, 0)`
      } else {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const onOver = (e) => {
      const el = e.target.closest ? e.target.closest('[data-nav-hover]') : null
      setVisible(Boolean(el))
      // keep the last label while fading out so the pill doesn't flash back to a disc
      if (el) {
        const text = el.dataset.cursorLabel ?? ''
        labelled.current = Boolean(text)
        setLabel(text)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.cursor} ${label ? styles.labelled : ''} ${visible ? styles.visible : ''}`}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}
