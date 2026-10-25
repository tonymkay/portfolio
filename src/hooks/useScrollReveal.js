
/**
 * useScrollReveal.js
 * Returns a ref and a boolean `isVisible` that fires once when the
 * element enters the viewport.
 *
 * threshold   — 0–1, how much of the element must be visible to trigger
 * rootMargin  — CSS margin on the viewport box (negative = earlier trigger)
 *
 * The observer's root is the current scroll root (see hooks/scrollRoot):
 * the project sheet's own scrolling element when inside a sheet, or the
 * window (root = null) on normal pages. That way the rootMargin is measured
 * against the box that actually scrolls, so reveals inside the sheet fire
 * at the right moment.
 */
import { useEffect, useRef, useState } from 'react'
import { useScrollRoot } from './scrollRoot'

const useScrollReveal = (threshold = 0.08, rootMargin = '0px 0px -60px 0px') => {
  const ref = useRef(null)
  const root = useScrollRoot()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Fire once — stop watching after first trigger
          observer.unobserve(element)
        }
      },
      { root, threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [root, threshold, rootMargin])

  return { ref, isVisible }
}

export default useScrollReveal
