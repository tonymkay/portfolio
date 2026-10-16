import { useState, useEffect, useRef, useCallback } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../../../data/siteContent'
import { getAllUxProjects } from '../../../data/uxProjects'
import styles from './Navbar.module.css'

const { nav, home, siteName, images: pageImages, designer, about: aboutContent } = siteContent
const { about, process: processNav, contact, work } = nav
const uxItem = work.items.find((item) => item.href === '/ui-ux')
const logosItem = work.items.find((item) => item.href === '/projects')
const featuredUxProjects = getAllUxProjects().slice(0, 3)

const EASE = [0.22, 1, 0.36, 1]
const PANEL_OPEN_MS = 500
const INTRO_START_DELAY_MS = 1000
const INTRO_EXPANSION_MS = 850

// The intro menu opens automatically after the full navigation has settled.
const INTRO_KEY = 'navIntroSeen'
const MOVE_MS = 650

const introSeen = () => {
  try {
    return localStorage.getItem(INTRO_KEY) === '1' || sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    try { return sessionStorage.getItem(INTRO_KEY) === '1' } catch { return false }
  }
}
const markIntroSeen = () => {
  try { localStorage.setItem(INTRO_KEY, '1') } catch { /* ignore */ }
  try { sessionStorage.setItem(INTRO_KEY, '1') } catch { /* ignore */ }
}
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Work pages that show the Work card grid when deep-linked
const WORK_ROUTES = ['/projects', '/ui-ux', '/posters']

// Map top-level routes to their nav config (for sub-items)
const ROUTE_NAV_CONFIG = {
  '/about': about,
  '/process': processNav,
}

// Shown in the content area when a page has no [data-nav-title] element.
const ROUTE_TITLES = {
  '/': home.hero.eyebrow,
  '/about': 'About Me',
  '/process': 'Process',
  '/contact': 'Get in touch',
  '/projects': logosItem.label,
  '/ui-ux': uxItem.label,
  '/posters': 'Posters',
}

const linkClass = ({ isActive }) =>
  `${styles.link} ${isActive ? styles.active : ''}`

const listClass = ({ isActive }) =>
  `${styles.listLink} ${isActive ? styles.listActive : ''}`

function MenuArrow({ className, circle = !className }) {
  if (circle) {
    return (
      <span className={styles.introSubArrowCircle} aria-hidden="true">
        <svg className={styles.introSubArrow} viewBox="0 0 24 24" fill="none">
          <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <svg className={className || styles.introSubArrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Navbar() {
  const [workOpen, setWorkOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [introBarExpanded, setIntroBarExpanded] = useState(false)
  const [introBarReady, setIntroBarReady] = useState(false)
  const [sectionTitle, setSectionTitle] = useState('')
  const [panelReady, setPanelReady] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [intro, setIntro] = useState(() =>
    pathname === '/' && !introSeen(),
  )
  const [hoverPanel, setHoverPanel] = useState(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [mobileViewport, setMobileViewport] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )
  const pillRef = useRef(null)
  const leaveTimer = useRef(null)
  const introTimer = useRef(null)
  const panelOpenTimer = useRef(null)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const updateViewport = () => setMobileViewport(media.matches)
    updateViewport()
    media.addEventListener?.('change', updateViewport)
    return () => media.removeEventListener?.('change', updateViewport)
  }, [])

  useEffect(() => {
    if (!intro) {
      setIntroBarExpanded(true)
      setIntroBarReady(true)
      return undefined
    }

    setIntroBarExpanded(false)
    setIntroBarReady(false)
    const openDefaultPanel = () => {
      const defaultPanel = pathname === '/process'
        ? 'process'
        : WORK_ROUTES.includes(pathname)
          ? 'work'
          : 'about'
      setHoverPanel(defaultPanel)
      setHoveredLink(defaultPanel)
      setIntroBarExpanded(true)
    }

    if (prefersReducedMotion()) {
      openDefaultPanel()
      setIntroBarReady(true)
      return undefined
    }

    const startTimer = setTimeout(openDefaultPanel, INTRO_START_DELAY_MS)
    const readyTimer = setTimeout(
      () => setIntroBarReady(true),
      INTRO_START_DELAY_MS + INTRO_EXPANSION_MS + 100,
    )
    return () => {
      clearTimeout(startTimer)
      clearTimeout(readyTimer)
    }
  }, [intro, pathname])

  // Whether the intro should show an expanded sub-item view
  const introNavConfig = ROUTE_NAV_CONFIG[pathname]
  const introIsWork = WORK_ROUTES.includes(pathname)
  const introPanel = introNavConfig ? (pathname === '/about' ? 'about' : 'process') : introIsWork ? 'work' : null
  const workActive =
    pathname.startsWith('/projects') ||
    pathname.startsWith('/ui-ux') ||
    pathname.startsWith('/posters')
  const routePanel = pathname.startsWith('/about')
    ? 'about'
    : pathname.startsWith('/process')
      ? 'process'
      : workActive ? 'work' : null
  const activePanel = hoverPanel || (intro ? introPanel : null) || (workOpen ? 'work' : null) || (menuOpen ? routePanel || 'about' : null)
  const activePanelConfig = activePanel === 'about' ? about : activePanel === 'process' ? processNav : null
  const mobileIntroOverview = intro && mobileViewport && introBarExpanded
  const showPanel = (Boolean(activePanel) || mobileIntroOverview) && (scrolled || intro || panelReady)
  const expanded = menuOpen || (workOpen && (scrolled || intro))
  const showHomePageBrand = pathname !== '/' || intro
  const selectedLink = hoveredLink || (intro ? introPanel : null) || (menuOpen ? routePanel || 'about' : null) || routePanel
  const contentTitle = sectionTitle || ROUTE_TITLES[pathname] || siteName
  const mobileMenuItems = [
    {
      label: about.label,
      href: about.href,
      children: about.subItems.map((sub) => ({
        label: sub.anchor === 'experience' ? 'My Experience' : sub.label,
        href: `${about.href}#${sub.anchor}`,
        anchor: true,
      })),
    },
    {
      label: work.label,
      href: uxItem.href,
      children: [
        { label: 'Posters', href: '/posters' },
        { label: 'Logos', href: '/projects' },
        { label: 'UX', href: '/ui-ux' },
      ],
    },
    {
      label: processNav.label,
      href: processNav.href,
      children: processNav.subItems.map((sub) => ({
        label: sub.anchor === 'brand-direction' ? 'Establishing Brand Direction' : sub.label,
        href: `${processNav.href}#${sub.anchor}`,
        anchor: true,
      })),
    },
  ]
  const scrolledMenuItems = [
    { label: about.label, href: about.href },
    { label: processNav.label, href: processNav.href },
    { label: work.label, href: uxItem.href },
  ]

  const menuPreview = (items, parentPath, { linked = true, parentLabel = 'section' } = {}) => (
    <div className={styles.menuPreview}>
      {items.map((item) => {
        const image = <img src={item.coverImage || item} alt={item.title || ''} loading="lazy" />
        return linked ? (
          <Link
            key={item.id || item.title || item}
            to={parentPath}
            className={styles.menuPreviewTile}
            onClick={close}
            aria-label={`Open ${parentLabel}`}
          >
            {image}
          </Link>
        ) : (
          <div key={item.id || item.title || item} className={styles.menuPreviewTile}>
            {image}
          </div>
        )
      })}
    </div>
  )

  const close = useCallback(() => {
    setWorkOpen(false)
    setMenuOpen(false)
    setHoverPanel(null)
    setHoveredLink(null)
    setPanelReady(false)
    clearTimeout(panelOpenTimer.current)
    panelOpenTimer.current = null
  }, [])

  const overviewMenu = () => (
    <div className={styles.introMenuCards}>
      {mobileMenuItems.map((section, i) => (
        <motion.section
          key={section.label}
          className={styles.introMenuGroup}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.04 + i * 0.035, ease: EASE }}
        >
          {section.label === about.label ? (
            <>
              <div className={styles.introProfileHeading}>
                <h3>{designer.fullName}</h3>
                <p>Product Designer (UX/UI)</p>
              </div>
              <div className={styles.introAboutStandalone}>
                <a href={section.children[0].href} className={styles.introSubLink} onClick={close}>
                  About Me
                  <MenuArrow />
                </a>
                <span className={styles.menuSectionLine} aria-hidden="true" />
              </div>
            </>
          ) : (
          <>
          <h3 className={styles.introMenuHeading}>{section.label}</h3>
          <div className={styles.introMenuCard}>
          <div className={styles.introMenuChildren}>
            {section.children.map((child) => (
              <div key={child.href} className={styles.menuSection}>
                {child.anchor ? (
                  <a href={child.href} className={styles.introSubLink} onClick={close}>
                    {child.label}
                    <MenuArrow />
                  </a>
                ) : (
                  <Link to={child.href} data-panel="work" className={styles.introSubLink} onClick={close}>
                    {child.label}
                    <MenuArrow />
                  </Link>
                )}
                <span className={styles.menuSectionLine} aria-hidden="true" />
              </div>
            ))}
          </div>
          </div>
          </>
          )}
        </motion.section>
      ))}
    </div>
  )

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

  const endIntro = useCallback(() => {
    markIntroSeen()
    setIntro(false)
  }, [])

  // Escape and outside tap close the expanded pill
  useEffect(() => {
    if (!expanded && !showPanel) return undefined
    const onKey = (e) => {
      if (intro && !introBarReady) return
      if (e.key === 'Escape') { close(); if (intro) { endIntro() } }
    }
    const onDown = (e) => {
      if (intro && !introBarReady) return
      if (pillRef.current && !pillRef.current.contains(e.target)) {
        close()
        if (intro) endIntro()
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [expanded, showPanel, intro, introBarReady, close, endIntro])

  useEffect(() => () => {
    clearTimeout(leaveTimer.current)
    clearTimeout(introTimer.current)
    clearTimeout(panelOpenTimer.current)
  }, [])

  // Lock page scroll while the intro is showing
  useEffect(() => {
    if (!intro) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [intro])



  // During the intro, internal link clicks navigate after the intro settles.
  const onClickCapture = (e) => {
    if (!intro) return
    if (!introBarReady) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    const a = e.target.closest?.('a[href]')
    if (!a) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    const nextPanel = a.dataset.panel

    // If this is a same-page anchor link (e.g. clicking a sub-item on the
    // current page), skip navigation — just scroll to the anchor.
    const anchor = a.dataset.anchor
    if (anchor) {
      e.preventDefault()
      e.stopPropagation()
      close()
      if (nextPanel) setHoverPanel(nextPanel)
      clearTimeout(introTimer.current)
      introTimer.current = setTimeout(() => {
        const target = document.getElementById(anchor)
        if (target) {
          target.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
        }
        endIntro()
      }, prefersReducedMotion() ? 0 : MOVE_MS)
      return
    }

    const href = a.getAttribute('href')
    if (!href || !href.startsWith('/')) return

    e.preventDefault()
    e.stopPropagation()
    close()
    if (nextPanel) setHoverPanel(nextPanel)
    clearTimeout(introTimer.current)
    introTimer.current = setTimeout(() => {
      navigate(href)
      endIntro()
    }, prefersReducedMotion() ? 0 : MOVE_MS)
  }

  const openPanel = (panel) => {
    clearTimeout(leaveTimer.current)
    if (scrolled || intro || panelReady) {
      clearTimeout(panelOpenTimer.current)
      panelOpenTimer.current = null
      setPanelReady(true)
    } else if (panelOpenTimer.current === null) {
      panelOpenTimer.current = setTimeout(() => {
        panelOpenTimer.current = null
        setPanelReady(true)
      }, prefersReducedMotion() ? 0 : PANEL_OPEN_MS)
    }
    setWorkOpen(panel === 'work')
    setHoverPanel(panel)
    setHoveredLink(panel)
  }

  const openWork = () => openPanel('work')

  const scheduleClose = () => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => {
      setWorkOpen(false)
      setMenuOpen(false)
      setHoverPanel(null)
      setHoveredLink(null)
      if (!pinnedPanel && !intro) {
        clearTimeout(panelOpenTimer.current)
        panelOpenTimer.current = null
        setPanelReady(false)
      }
    }, 180)
  }

  const toggleMenu = () => {
    setWorkOpen(false)
    setMenuOpen((o) => {
      setPanelReady(!o)
      return !o
    })
  }

  const hamburger = (extraClass = '') => (
    <button
      type="button"
      className={`${styles.hamburger} ${extraClass}`}
      onClick={toggleMenu}
      onMouseEnter={() => {
        if (scrolled) {
          clearTimeout(leaveTimer.current)
          setPanelReady(true)
          setMenuOpen(true)
        }
      }}
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
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          onClick={() => { if (introBarReady) endIntro() }}
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {((scrolled && menuOpen) || (!scrolled && !intro && showPanel)) && (
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
    {intro && pathname === '/' && (
      <div className={`${styles.introWelcome} ${(expanded || showPanel) ? styles.introWelcomeBlurred : ''}`}>
        <p className={styles.introPrompt}>
          <span>Antony Murimi,</span>
          <span className={styles.introPromptMuted}>Product Designer</span>
          <span className={styles.introPromptMuted}>(UX/UI)</span>
        </p>
      </div>
    )}
    <header
      className={`${styles.navbar} ${intro ? styles.intro : ''}`}
      onClickCapture={onClickCapture}
    >
      <motion.div
        ref={pillRef}
        className={`${styles.pill} ${scrolled ? styles.compact : ''} ${scrolled ? styles.glass : ''} ${(expanded || Boolean(activePanel)) ? styles.expanded : ''} ${intro && !introBarReady ? styles.introLocked : ''}`}
        onMouseLeave={scheduleClose}
        onMouseEnter={() => clearTimeout(leaveTimer.current)}
      >
        {scrolled ? (
          <div className={styles.barCompact}>
            {hamburger()}

            <div className={styles.content} aria-live="polite">
              <span className={styles.contentText}>{contentTitle}</span>
            </div>

            <Link to={contact.href} className={styles.contact} onClick={close}>
              {contact.label}
            </Link>
          </div>
        ) : (
          <div className={styles.bar}>
            <Link
                to="/"
                className={`${styles.logo} ${showHomePageBrand ? styles.logoIntroButton : ''}`}
                onClick={close}
                onMouseEnter={() => openPanel(introPanel || routePanel || 'about')}
                onFocus={() => openPanel(introPanel || routePanel || 'about')}
                tabIndex={intro && !introBarReady ? -1 : undefined}
              >
                <span className={styles.logoText}>{showHomePageBrand ? 'Home page' : 'Antony Murimi'}</span>
                {showHomePageBrand && (
                  <span className={styles.logoArrowCircle} aria-hidden="true">
                    <MenuArrow className={styles.logoArrow} />
                  </span>
                )}
            </Link>

            <nav className={styles.links} aria-label="Main navigation">
              <NavLink to={about.href} data-panel="about" className={linkClass} onMouseEnter={() => openPanel('about')} onFocus={() => openPanel('about')}>
                {selectedLink === 'about' && <motion.span layoutId="navbar-selection" className={styles.navSelection} transition={{ type: 'spring', stiffness: 480, damping: 38 }} />}
                <span className={styles.linkLabel}>{about.label}</span>
              </NavLink>

              <NavLink
                to={logosItem.href}
                data-panel="work"
                className={`${styles.link} ${styles.workBtn} ${activePanel === 'work' ? styles.open : ''} ${workActive ? styles.active : ''}`}
                onMouseEnter={openWork}
                onFocus={openWork}
                aria-haspopup="true"
                aria-expanded={activePanel === 'work'}
                aria-controls="site-menu"
              >
                {selectedLink === 'work' && <motion.span layoutId="navbar-selection" className={styles.navSelection} transition={{ type: 'spring', stiffness: 480, damping: 38 }} />}
                <span className={styles.linkLabel}>{work.label}</span>
              </NavLink>

              <NavLink to={processNav.href} data-panel="process" className={linkClass} onMouseEnter={() => openPanel('process')} onFocus={() => openPanel('process')}>
                {selectedLink === 'process' && <motion.span layoutId="navbar-selection" className={styles.navSelection} transition={{ type: 'spring', stiffness: 480, damping: 38 }} />}
                <span className={styles.linkLabel}>{processNav.label}</span>
              </NavLink>

              <Link to={contact.href} className={styles.contact} onClick={close}>
                {contact.label}
              </Link>
            </nav>

            {hamburger(styles.mobileOnly)}
          </div>
        )}

        <AnimatePresence initial={false}>
          {(expanded || showPanel) && (!intro || introBarExpanded) && (
            <motion.div
              key="drop"
              id="site-menu"
              className={styles.drop}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: { duration: prefersReducedMotion() ? 0 : (intro ? INTRO_EXPANSION_MS / 1000 : 0.4), ease: EASE },
              }}
              exit={{ height: 0, opacity: 0, transition: { duration: prefersReducedMotion() ? 0 : (intro ? 0.5 : 0.25), ease: EASE } }}
            >
              {showPanel && (
                <div className={styles.panelLayout}>
                  {pageImages.heroPortrait && (
                    <div className={styles.introPortraitColumn}>
                      <div className={styles.introPortraitFrame}>
                        <img
                          className={styles.introPortrait}
                          src={pageImages.heroPortrait}
                          alt={`Portrait of ${designer.fullName}`}
                        />
                      </div>
                    </div>
                  )}
                  <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={scrolled ? activePanel : 'white-overview'}
                    className={styles.panelContent}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: EASE }}
                  >
                    {menuOpen && scrolled ? (
                      <div className={styles.introSubList}>
                        {scrolledMenuItems.map(({ label, href }, i) => (
                          <motion.div
                            key={label}
                            className={styles.menuSection}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.04 + i * 0.035, ease: EASE }}
                          >
                            <Link to={href} className={styles.introSubLink} onClick={close}>
                              {label}
                              <MenuArrow />
                            </Link>
                            <span className={styles.menuSectionLine} aria-hidden="true" />
                          </motion.div>
                        ))}
                      </div>
                    ) : (!scrolled && mobileViewport) ? (
                      overviewMenu()
                    ) : activePanel === 'work' ? (
                      <div className={styles.introSubList}>
                        {work.items.map((item, i) => (
                          <motion.div
                            key={item.href}
                            className={styles.menuSection}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.04 + i * 0.035, ease: EASE }}
                          >
                            <Link to={item.href} data-panel="work" className={styles.introSubLink} onClick={close}>
                              {item.label}
                              <MenuArrow />
                            </Link>
                            {item.href === '/ui-ux' && menuPreview(featuredUxProjects, '/ui-ux', { parentLabel: item.label })}
                            <span className={styles.menuSectionLine} aria-hidden="true" />
                          </motion.div>
                        ))}
                      </div>
                    ) : activePanel === 'about' ? (
                      <div className={styles.aboutPanelProfile}>
                        <div className={styles.introProfileHeading}>
                          <h3>{designer.fullName}</h3>
                          <p>Product Designer (UX/UI)</p>
                        </div>
                        {!mobileViewport && (
                          <div className={styles.menuStats} aria-label="About statistics">
                            <div className={styles.menuStatCard}>
                              <span className={styles.menuStatValue}>{aboutContent.numbers.clients.value}{aboutContent.numbers.clients.suffix}</span>
                              <span className={styles.menuStatLabel}>Work Completed</span>
                            </div>
                            <div className={styles.menuStatCard}>
                              <span className={styles.menuStatValue}>{aboutContent.numbers.years.value}{aboutContent.numbers.years.suffix}</span>
                              <span className={styles.menuStatLabel}>Years Experience</span>
                            </div>
                          </div>
                        )}
                        <div className={styles.introAboutStandalone}>
                          <a
                            href={pathname === about.href ? '#about-me' : `${about.href}#about-me`}
                            data-anchor={pathname === about.href ? 'about-me' : undefined}
                            data-panel="about"
                            className={styles.introSubLink}
                            onClick={close}
                          >
                            About Me
                            <MenuArrow />
                          </a>
                          <span className={styles.menuSectionLine} aria-hidden="true" />
                        </div>
                      </div>
                    ) : activePanelConfig?.subItems ? (
                      <div className={styles.introSubList}>
                        {activePanelConfig.subItems.map((sub, i) => (
                          <motion.div
                            key={sub.anchor}
                            className={styles.menuSection}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.04 + i * 0.035, ease: EASE }}
                          >
                            <a
                              href={pathname === (activePanel === 'about' ? about.href : processNav.href)
                                ? `#${sub.anchor}`
                                : `${activePanel === 'about' ? about.href : processNav.href}#${sub.anchor}`}
                              data-anchor={pathname === (activePanel === 'about' ? about.href : processNav.href) ? sub.anchor : undefined}
                              data-panel={activePanel}
                              className={styles.introSubLink}
                              onClick={close}
                            >
                              {sub.label}
                              <MenuArrow />
                            </a>
                            {activePanel === 'process' && sub.anchor === 'brand-direction' && menuPreview(pageImages.brandDirection, '/process', { parentLabel: 'the process page' })}
                            <span className={styles.menuSectionLine} aria-hidden="true" />
                          </motion.div>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                  </AnimatePresence>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
    </>
  )
}
