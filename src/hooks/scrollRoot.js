import { createContext, useContext } from 'react'

/**
 * ScrollRootContext — the element that actually scrolls for the current
 * page. `null` means the window (normal pages). The project sheet provides
 * its own scrolling element so scroll-aware pieces (section breadcrumb,
 * progress bar) follow the sheet instead of the page behind it.
 */
export const ScrollRootContext = createContext(null)

export const useScrollRoot = () => useContext(ScrollRootContext)
