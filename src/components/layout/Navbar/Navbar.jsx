import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { siteContent } from '../../../data/siteContent'
import { getLogoBySlug } from '../../../data/logos'
import { getProjectBySlug } from '../../../data/projects'
import logoUrl from '../../../assets/images/home/logo.svg'
import styles from './Navbar.module.css'

const { nav, home, siteName, images: pageImages, designer } = siteContent
const { about, process: processNav, work } = nav
const uxItem = work.items.find((item) => item.href === '/ui-ux')
const logosItem = work.items.find((item) => item.href === '/projects')

const EASE = [0.22, 1, 0.36, 1]

// Only these pages show the logo. Every other page shows a back button and
// the breadcrumb trail.
const LOGO_PAGES = ['/', '/about', '/process']

// Names used in the breadcrumb trail for each page of the site.
const CRUMB_LABELS = {
  '/': 'Home',
  '/about': 'About',
  '/process': 'Process',
  '/work': work.label,
  '/projects': logosItem.label,
  '/ui-ux': uxItem.label,
  '/posters': 'Posters',
  '/contact': 'Contact',
}

const projectTitle = (slug) => (getLogoBySlug(slug) ?? getProjectBySlug(slug))?.title

const labelFor = (path) => {
  if (CRUMB_LABELS[path]) return CRUMB_LABELS[path]
  const [section, slug] = path.split('/').filter(Boolean)
  if (slug) return (section === 'projects' && projectTitle(slug)) || slug.replace(/-/g, ' ')
  return 'Not found'
}

/** Hierarchy fallback for a page opened directly (no visited path yet). */
const hierarchyFor = (pathname) => {
  const trail = ['/']
  const [section, slug] = pathname.split('/').filter(Boolean)
  if (!section) return trail
  if (slug && CRUMB_LABELS[`/${section}`]) trail.push(`/${section}`)
  if (!trail.includes(pathname)) trail.push(pathname)
  return trail
}

/**
 * The breadcrumb trail is the path the visitor actually took (Home → Projects
 * → UI/UX …), not a fixed site tree:
 *  - a new page is added to the end;
 *  - going to a page that is already in the trail cuts the trail back to it,
 *    so going back removes the crumbs after it;
 *  - Home, About and Process are where a trail starts: visiting one starts the
 *    trail over (so the first crumb is always where the visitor started).
 * UX project pages are a sheet over the UI/UX listing, so they don't add a
 * crumb. It lives in sessionStorage so a reload keeps it.
 */
const TRAIL_KEY = 'nav-trail'

const readTrail = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(TRAIL_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const nextTrail = (trail, pathname) => {
  if (/^\/ui-ux\/[^/]+/.test(pathname)) return trail
  if (LOGO_PAGES.includes(pathname)) return [pathname] // Home / About / Process start a new trail
  const at = trail.indexOf(pathname)
  if (at !== -1) return trail.slice(0, at + 1)
  if (!trail.length) return hierarchyFor(pathname)
  return [...trail, pathname]
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Shown in the closed pill when a page has no [data-nav-title] element.
const ROUTE_TITLES = {
  '/': home.hero.eyebrow,
  '/about': 'About Me',
  '/process': 'Process',
  '/contact': 'Get in touch',
  '/work': work.label,
  '/projects': logosItem.label,
  '/ui-ux': uxItem.label,
  '/posters': 'Posters',
}

const MENU_ITEMS = [
  { label: 'Home', href: '/' },
  { label: about.label, href: about.href },
  { label: work.label, href: '/work' },
  { label: processNav.label, href: processNav.href },
]

/**
 * Always three destinations. The page you are on is never listed. The page
 * the trail started from is left out too (the breadcrumbs already lead back
 * there), unless that would leave fewer than three, in which case it is
 * added back so the menu stays the same size everywhere.
 */
const itemsFor = (origin, pathname) => {
  const others = MENU_ITEMS.filter((item) => item.href !== pathname)
  const preferred = others.filter((item) => item.href !== origin)
  return (preferred.length >= 3 ? preferred : others).slice(0, 3)
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sectionTitle, setSectionTitle] = useState('')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const pillRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])
  const toggle = () => setOpen((o) => !o)

  // Hover (mouse only) expands the menu and leaving collapses it. Touch keeps
  // using the button, since a tap would otherwise fire hover and click together.
  // A short delay on leaving stops it flickering shut on a slight slip.
  const leaveTimer = useRef(0)
  const onPillEnter = (e) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(leaveTimer.current)
    setOpen(true)
  }
  const onPillLeave = (e) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(close, 180)
  }
  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  // Breadcrumbs follow the path actually taken (see nextTrail). Back goes up
  // exactly one crumb instead of using browser history, so a project you just
  // closed never reappears. Only the last two crumbs are shown.
  const trailRef = useRef(null)
  if (trailRef.current === null) trailRef.current = readTrail()
  const trail = nextTrail(trailRef.current, pathname)
  trailRef.current = trail
  const trailKey = trail.join('|')

  useEffect(() => {
    try {
      sessionStorage.setItem(TRAIL_KEY, JSON.stringify(trail))
    } catch {
      /* storage unavailable: the trail just won't survive a reload */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trailKey])

  const crumbs = trail.slice(-2).map((to) => ({ label: labelFor(to), to }))
  const goBack = () => {
    close()
    navigate(trail[trail.length - 2] ?? '/')
  }

  // Title of the section currently under the reading line
  const computeSection = useCallback(() => {
    const els = document.querySelectorAll('[data-nav-title]')
    if (!els.length) {
      setSectionTitle('')
      return
    }
    const line = window.innerHeight * 0.4
    let current = els[0]
    els.forEach((el) => {
      if (el.getBoundingClientRect().top <= line) current = el
    })
    setSectionTitle(current.dataset.navTitle)
  }, [])

  // Collapse and re-read the page on route change
  useEffect(() => {
    close()
    setSectionTitle('')
    const t1 = setTimeout(computeSection, 60)
    const t2 = setTimeout(computeSection, 450)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname, close, computeSection])

  // Scroll: glass state + current section
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        computeSection()
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [computeSection])

  // Escape and outside tap close the open menu
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') close() }
    const onDown = (e) => {
      if (pillRef.current && !pillRef.current.contains(e.target)) close()
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, close])

  // UX project pages are full-page views with their own close button: no navbar
  if (/^\/ui-ux\/[^/]+/.test(pathname)) return null

  const contentTitle = sectionTitle || ROUTE_TITLES[pathname] || siteName
  const showCrumbs = !LOGO_PAGES.includes(pathname)
  const items = itemsFor(trail[0] ?? pathname, pathname)

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-backdrop"
            className={styles.menuBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className={styles.navbar}>
        <div
          ref={pillRef}
          onPointerEnter={onPillEnter}
          onPointerLeave={onPillLeave}
          className={`${styles.pill} ${scrolled ? styles.glass : ''} ${open ? styles.open : ''}`}
        >
          <div className={styles.bar}>
            {LOGO_PAGES.includes(pathname) ? (
              <Link to="/" className={styles.logo} onClick={close} aria-label={`${siteName} — home`}>
                <span
                  className={styles.logoMark}
                  style={{ '--logo-url': `url(${logoUrl})` }}
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <button
                type="button"
                className={`${styles.logo} ${styles.back}`}
                onClick={goBack}
                aria-label="Go back"
              >
                <ArrowLeft className={styles.backIcon} strokeWidth={1.75} aria-hidden="true" />
              </button>
            )}

            <div className={styles.content} aria-live={showCrumbs ? undefined : 'polite'}>
              {showCrumbs ? (
                <nav className={styles.crumbs} aria-label="Breadcrumb">
                  <ol className={styles.crumbList}>
                    {crumbs.map(({ label, to }, i) => {
                      const last = i === crumbs.length - 1
                      return (
                        <li
                          key={to}
                          className={`${styles.crumb} ${last ? styles.crumbCurrent : ''}`}
                        >
                          {last ? (
                            <span className={styles.crumbText} aria-current="page">{label}</span>
                          ) : (
                            <>
                              <Link to={to} className={styles.crumbText} onClick={close}>{label}</Link>
                              <span className={styles.crumbSep} aria-hidden="true">/</span>
                            </>
                          )}
                        </li>
                      )
                    })}
                  </ol>
                </nav>
              ) : (
                <span className={styles.contentText}>
                  {open ? designer.fullName : contentTitle}
                </span>
              )}
            </div>

            <button
              type="button"
              className={styles.toggle}
              onClick={toggle}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                ) : (
                  <path d="M3.5 6.5h13M3.5 13.5h13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="drop"
                id="site-menu"
                className={styles.drop}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  transition: { duration: prefersReducedMotion() ? 0 : 0.4, ease: EASE },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: { duration: prefersReducedMotion() ? 0 : 0.25, ease: EASE },
                }}
              >
                <div className={styles.panelLayout}>
                  {pageImages.heroPortrait && (
                    <div className={styles.portraitFrame}>
                      <img
                        className={styles.portrait}
                        src={pageImages.heroPortrait}
                        alt={`Portrait of ${designer.fullName}`}
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  )}

                  <nav className={styles.menuList} aria-label="Main navigation">
                    {items.map(({ label, href }, i) => (
                      <motion.div
                        key={href}
                        className={styles.menuSection}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.04 + i * 0.035, ease: EASE }}
                      >
                        <Link to={href} className={styles.menuLink} onClick={close}>
                          {label}
                          <ArrowRight className={styles.menuArrow} strokeWidth={1.6} aria-hidden="true" />
                        </Link>
                        <span className={styles.menuLine} aria-hidden="true" />
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
