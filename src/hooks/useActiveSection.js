import { useEffect, useState } from 'react'
import { useScrollRoot } from './scrollRoot'

/**
 * useActiveSection — tells the sticky breadcrumb two things as the page scrolls:
 *   scrolled — has the reader started scrolling (past `scrolledAt` px)?
 *   section  — the `data-section` of the panel currently crossing the
 *              reading line (a fixed fraction down the visible area). Empty
 *              string while on the cover, or once past the last panel.
 *
 * Follows the nearest ScrollRootContext element (the project sheet) and
 * falls back to the window.
 *
 * rAF-throttled, no layout work beyond a few getBoundingClientRect calls,
 * and state only changes when the values do.
 */
export default function useActiveSection({
  enabled = true,
  selector = '[data-section]',
  anchor = 0.35,
  scrolledAt = 40,
} = {}) {
  const root = useScrollRoot()
  const [state, setState] = useState({ scrolled: false, section: '' })

  useEffect(() => {
    if (!enabled) return undefined

    const target = root ?? window
    let raf = 0

    const compute = () => {
      raf = 0
      const y = root ? root.scrollTop : window.scrollY || document.documentElement.scrollTop
      const viewTop = root ? root.getBoundingClientRect().top : 0
      const viewH = root ? root.clientHeight : window.innerHeight
      const line = viewTop + viewH * anchor
      let section = ''

      const scope = root ?? document
      scope.querySelectorAll(selector).forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) section = el.dataset.section || ''
      })

      const scrolled = y > scrolledAt
      setState((prev) =>
        prev.scrolled === scrolled && prev.section === section ? prev : { scrolled, section },
      )
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Panel heights change as images load.
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onScroll) : null
    if (root) {
      ro?.observe(root)
      if (root.firstElementChild) ro?.observe(root.firstElementChild)
    } else {
      ro?.observe(document.body)
    }

    return () => {
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      ro?.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [enabled, selector, anchor, scrolledAt, root])

  return state
}
