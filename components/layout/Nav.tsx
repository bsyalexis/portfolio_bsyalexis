'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  /* Ombre & fond au scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Fermer le menu mobile au resize desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      ref={navRef}
      className={clsx('nav', { 'nav--scrolled': scrolled })}
      style={styles.nav}
    >
      <nav style={styles.inner}>
        {/* Logo / nom */}
        <Link href="/" style={styles.logo}>
          Alexis Bossy
        </Link>

        {/* Liens desktop */}
        <div style={styles.desktopLinks} className="nav-desktop-links">
          <Link href="/travaux" style={styles.navLink} className="nav-link">
            Travaux
          </Link>
          <Link href="/#contact" style={styles.navLink} className="nav-link">
            Contact
          </Link>
          <span style={styles.pill} className="nav-pill">
            <span style={styles.dot} className="nav-dot" aria-hidden="true" />
            Disponible
          </span>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          style={styles.hamburger}
          className="nav-hamburger"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          <span style={{ ...styles.bar, ...(mobileOpen ? styles.barTopOpen : {}) }} />
          <span style={{ ...styles.bar, ...(mobileOpen ? styles.barMidOpen : {}) }} />
          <span style={{ ...styles.bar, ...(mobileOpen ? styles.barBotOpen : {}) }} />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      <div
        style={{
          ...styles.mobileMenu,
          ...(mobileOpen ? styles.mobileMenuOpen : {}),
        }}
        aria-hidden={!mobileOpen}
      >
        <Link href="/travaux" style={styles.mobileLink} onClick={() => setMobileOpen(false)}>
          Travaux
        </Link>
        <Link href="/#contact" style={styles.mobileLink} onClick={() => setMobileOpen(false)}>
          Contact
        </Link>
        <span style={{ ...styles.pill, marginTop: '8px', display: 'inline-flex' }}>
          <span style={styles.dot} aria-hidden="true" />
          Disponible
        </span>
      </div>

    </header>
  )
}

/* ─────────────────────────────────
   Styles inline (valeurs dynamiques)
   ───────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    background: 'rgba(248, 246, 242, 0.88)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(0,0,0,0.07)',
    transition: 'box-shadow 0.3s ease',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 56px',
    height: '64px',
  },
  logo: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--text)',
    letterSpacing: '-0.01em',
  },
  desktopLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
  },
  navLink: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--text-mid)',
    transition: 'color 0.2s ease',
    paddingBottom: '2px',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '6px 14px',
    borderRadius: '100px',
    background: 'rgba(192, 41, 58, 0.06)',
    border: '1px solid rgba(192, 41, 58, 0.15)',
    color: 'var(--accent)',
    fontSize: '0.7rem',
    fontWeight: 500,
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--accent)',
    flexShrink: 0,
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '5px',
    width: '36px',
    height: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
  },
  bar: {
    display: 'block',
    width: '22px',
    height: '1.5px',
    background: 'var(--text)',
    borderRadius: '2px',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transformOrigin: 'center',
  },
  barTopOpen: { transform: 'rotate(45deg) translate(4.5px, 4.5px)' },
  barMidOpen: { opacity: 0 },
  barBotOpen: { transform: 'rotate(-45deg) translate(4.5px, -4.5px)' },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '0 20px',
    overflow: 'hidden',
    maxHeight: '0',
    opacity: 0,
    transition: 'max-height 0.35s ease, opacity 0.3s ease, padding 0.3s ease',
  },
  mobileMenuOpen: {
    maxHeight: '300px',
    opacity: 1,
    padding: '16px 20px 20px',
  },
  mobileLink: {
    fontSize: '1.1rem',
    fontWeight: 400,
    color: 'var(--text)',
    padding: '10px 0',
    borderBottom: '1px solid var(--border)',
  },
}
