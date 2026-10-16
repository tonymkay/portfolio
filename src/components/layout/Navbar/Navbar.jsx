import { useState, useEffect, useRef, useCallback } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../../../data/siteContent'
import WorkPreview from './WorkPreview'
import styles from './Navbar.module.css'

const { nav, home, siteName } = siteContent
const { about, process: processNav, contact, work } = nav
const [uxItem, logosItem] = work.items

const EASE = [0.22, 1, 0.36, 1]

// First-visit intro: the pill starts centered on screen; the first link click
// slides it to the top, then navigates. Shown once per browser session.
const INTRO_KEY = 'navIntroSeen'
const MOVE_MS = 650

const introSeen = () => {
  try { return sessionStorage.getItem(INTRO_KEY) === '1' } catch { return false }
}
const markIntroSeen = () => {
  try { sessionStorage.setItem(INTRO_KEY, '1') } catch { /* ignore */ }
}
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Shown in the content area when a page has no [data-nav-title] element.
const ROUTE_TITLES = {
  '/': home.hero.eyebrow,
  '/about': 'About Me',
  '/process': 'Process',
  '/contact': 'Get in touch',
  '/projects': logosItem.label,
  '/ui-ux': uxItem.label,
  '/posters': 'Posters',
  '/blogs': 'Blogs',
}

const linkClass = ({ isActive }) =>
  `${styles.link} ${isActive ? styles.active : ''}`

const listClass = ({ isActive }) =>
  `${styles.listLink} ${isActive ? styles.listActive : ''}`

export default function Navbar() {
  const [workOpen, setWorkOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sectionTitle, setSectionTitle] = useState('')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [intro, setIntro] = useState(() => pathname === '/' && !introSeen())
  const pillRef = useRef(null)
  const leaveTimer = useRef(null)
  const introTimer = useRef(null)

  const expanded = workOpen || menuOpen
  const workActive =
    pathname.startsWith('/projects') ||
    pathname.startsWith('/ui-ux') ||
    pathname.startsWith('/posters') ||
    pathname.startsWith('/blogs')
  const contentTitle = sectionTitle || ROUTE_TITLES[pathname] || siteName

  const close = useCallback(() => {
    setWorkOpen(false)
    setMenuOpen(false)
  }, [])

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

  // Scroll: compact state + current section
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

  // Switching between full and compact bar closes any open panel
  useEffect(() => {
    close()
  }, [scrolled, close])

  // Escape and outside tap close the expanded pill
  useEffect(() => {
    if (!expanded) return undefined
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
  }, [expanded, close])

  useEffect(() => () => {
    clearTimeout(leaveTimer.current)
    clearTimeout(introTimer.current)
  }, [])

  // Lock page scroll while the intro is showing
  useEffect(() => {
    if (!intro) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [intro])

  const endIntro = useCallback(() => {
    markIntroSeen()
    setIntro(false)
  }, [])

  // During the intro, any internal link click first slides the pill to the
  // top, then navigates once it has settled.
  const onClickCapture = (e) => {
    if (!intro) return
    const a = e.target.closest?.('a[href]')
    if (!a) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    const href = a.getAttribute('href')
    if (!href || !href.startsWith('/')) return
    e.preventDefault()
    e.stopPropagation()
    close()
    endIntro()
    clearTimeout(introTimer.current)
    introTimer.current = setTimeout(() => navigate(href), prefersReducedMotion() ? 0 : MOVE_MS)
  }

  const openWork = () => {
    clearTimeout(leaveTimer.current)
    setMenuOpen(false)
    setWorkOpen(true)
  }

  const scheduleClose = () => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setWorkOpen(false), 140)
  }

  const toggleMenu = () => {
    setWorkOpen(false)
    setMenuOpen((o) => !o)
  }

  const hamburger = (extraClass = '') => (
    <button
      type="button"
      className={`${styles.hamburger} ${extraClass}`}
      onClick={toggleMenu}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      aria-controls="site-menu"
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        {menuOpen ? (
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        ) : (
          <path d="M3.5 6.5h13M3.5 13.5h13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        )}
      </svg>
    </button>
  )

  return (
    <>
    <AnimatePresence>
      {intro && (
        <motion.div
          key="scrim"
          className={styles.scrim}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          onClick={endIntro}
        />
      )}
    </AnimatePresence>
    <header
      className={`${styles.navbar} ${intro ? styles.intro : ''}`}
      onClickCapture={onClickCapture}
    >
      <div
        ref={pillRef}
        className={`${styles.pill} ${scrolled ? styles.compact : ''} ${scrolled ? styles.glass : ''} ${expanded ? styles.expanded : ''}`}
        onMouseLeave={scheduleClose}
        onMouseEnter={() => clearTimeout(leaveTimer.current)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {scrolled ? (
            <motion.div
              key="compact"
              className={styles.barCompact}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {hamburger()}

              <div className={styles.content} aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={contentTitle}
                    className={styles.contentText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    {contentTitle}
                  </motion.span>
                </AnimatePresence>
              </div>

              <Link to={contact.href} className={styles.contact} onClick={close}>
                {contact.label}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="full"
              className={styles.bar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/" className={styles.logo} onClick={close}>
                <span className={styles.logoMark}>T</span>
                <span className={styles.logoText}>Tony</span>
              </Link>

              <nav className={styles.links} aria-label="Main navigation">
                <NavLink to={about.href} className={linkClass} onClick={close}>
                  {about.label}
                </NavLink>

                <NavLink to={processNav.href} className={linkClass} onClick={close}>
                  {processNav.label}
                </NavLink>

                <button
                  type="button"
                  className={`${styles.link} ${styles.workBtn} ${workOpen ? styles.open : ''} ${workActive ? styles.active : ''}`}
                  onMouseEnter={openWork}
                  onFocus={openWork}
                  onClick={openWork}
                  aria-haspopup="true"
                  aria-expanded={workOpen}
                  aria-controls="site-menu"
                >
                  {work.label}
                  <svg className={styles.chev} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <Link to={contact.href} className={styles.contact} onClick={close}>
                  {contact.label}
                </Link>
              </nav>

              {hamburger(styles.mobileOnly)}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="drop"
              id="site-menu"
              className={styles.drop}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {workOpen && (
                <div className={styles.grid}>
                  {work.items.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: EASE }}
                    >
                      <Link to={item.href} className={styles.card} onClick={close}>
                        <span className={styles.cardImgWrap}>
                          <WorkPreview href={item.href} fallback={item.image} />
                        </span>
                        <span className={styles.cardTitle}>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {menuOpen && (
                <div className={styles.list}>
                  <NavLink to="/" end className={listClass} onClick={close}>Home</NavLink>
                  <NavLink to={about.href} className={listClass} onClick={close}>{about.label}</NavLink>
                  <NavLink to={processNav.href} className={listClass} onClick={close}>{processNav.label}</NavLink>
                  {work.items.map((item) => (
                    <NavLink key={item.href} to={item.href} className={listClass} onClick={close}>
                      {item.label}
                    </NavLink>
                  ))}
                  {!scrolled && (
                    <Link to={contact.href} className={styles.listCta} onClick={close}>{contact.label}</Link>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
    </>
  )
}
