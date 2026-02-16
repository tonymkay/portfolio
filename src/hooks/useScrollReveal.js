/**
 * useScrollReveal.js
 * Returns a ref and a boolean `isVisible` that fires once when the
 * element enters the viewport.
 *
 * threshold   — 0–1, how much of the element must be visible to trigger
 * rootMargin  — CSS margin on the viewport box (negative = earlier trigger)
 */
import { useEffect, useRef, useState } from 'react'

const useScrollReveal = (threshold = 0.08, rootMargin = '0px 0px -60px 0px') => {
  const ref = useRef(null)
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
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}

export default useScrollReveal
