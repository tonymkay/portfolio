import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../../../data/siteContent'
import CubeButton from '../../ui/CubeButton'
import styles from './Navbar.module.css'

const { nav } = siteContent

const menuLinks = [{ label: 'Home', href: '/' }, ...nav.links]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Collapse on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Escape closes the menu
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={close}>
          <span className={styles.logoMark}>T</span>
          <span className={styles.logoText}>Tony</span>
        </Link>

        {/* Pulsing dot → expanding menu */}
        <div className={styles.menu}>
          <button
            type="button"
            className={`${styles.dotBtn} ${open ? styles.open : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span className={styles.dot} />
            <span className={styles.x} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.button
                key="scrim"
                type="button"
                className={styles.scrim}
                aria-label="Close menu"
                tabIndex={-1}
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}
            {open && (
              <motion.nav
                key="panel"
                id="site-menu"
                className={styles.panel}
                aria-label="Main navigation"
                style={{ transformOrigin: 'top right' }}
                initial={{ opacity: 0, scale: 0.35 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.35 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {menuLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    end={link.href === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <CubeButton
                  to={nav.cta.href}
                  onClick={close}
                  rounded
                  fullWidth
                  className={styles.cta}
                >
                  {nav.cta.label}
                </CubeButton>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
