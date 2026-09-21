import { useLayoutEffect } from 'react'

/**
 * usePageTheme — marks the whole document with a page theme while the calling
 * page is mounted (e.g. usePageTheme('dark')). Global / Navbar CSS reacts to
 * html[data-page-theme='dark']. The attribute is removed on unmount so other
 * pages keep the default light look.
 *
 * useLayoutEffect (not useEffect) so the theme is applied before first paint
 * and there is no light flash.
 */
export default function usePageTheme(theme) {
  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.pageTheme = theme
    return () => {
      delete root.dataset.pageTheme
    }
  }, [theme])
}
