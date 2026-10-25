import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import CustomCursor from '../../ui/CustomCursor'
import { smoothScrollTop } from '../../../utils/smoothScrollTop'
import styles from './PageWrapper.module.css'

// Project sheets open over their listing (/ui-ux → /ui-ux/:slug), so those
// moves must not reset the listing's scroll position behind the sheet.
const SHEET_LISTINGS = ['/ui-ux']
const listingOf = (pathname) =>
  SHEET_LISTINGS.find((base) => pathname === base || pathname.startsWith(`${base}/`)) ?? null

export default function PageWrapper() {
  const location = useLocation()
  const prevListing = useRef(null)
  const prevPath = useRef(null)

  // Scroll to top on any navigation — except opening/closing/switching a
  // project sheet over its listing (the sheet scrolls on its own).
  useEffect(() => {
    const listing = listingOf(location.pathname)
    const stayingOnListing = listing !== null && listing === prevListing.current
    prevListing.current = listing
    if (stayingOnListing) return
    const samePage = prevPath.current === location.pathname
    prevPath.current = location.pathname
    if (samePage) smoothScrollTop()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.key])

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <CustomCursor />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
