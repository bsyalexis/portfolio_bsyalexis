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

  /* Bloquer le scroll body quand menu ouvert */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        ref={navRef}
        className={clsx('nav', { 'nav--scrolled': scrolled })}
        style={{ ...styles.nav, zIndex: mobileOpen ? 201 : 100 }}
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
      </header>

      {/* Overlay plein écran mobile — hors du header pour éviter le stacking context */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 200,
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px',
          paddingLeft: '32px',
          paddingRight: '32px',
          paddingBottom: '48px',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
          pointerEvents: mobileOpen ? 'all' : 'none',
        }}
        aria-hidden={!mobileOpen}
      >
        {/* Ligne accent en haut */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--accent)',
          opacity: mobileOpen ? 1 : 0,
          transition: 'opacity 0.3s 0.35s ease',
        }} />

        {/* Liens */}
        <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '32px' }}>
          <Link
            href="/travaux"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              padding: '22px 0',
              borderBottom: '1px solid var(--border)',
              fontSize: 'clamp(2rem, 11vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.45s 0.28s ease, transform 0.45s 0.28s ease',
            }}
          >
            <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.12em', alignSelf: 'flex-start', paddingTop: '10px' }}>01</span>
            Travaux
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              padding: '22px 0',
              borderBottom: '1px solid var(--border)',
              fontSize: 'clamp(2rem, 11vw, 3rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.45s 0.38s ease, transform 0.45s 0.38s ease',
            }}
          >
            <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.12em', alignSelf: 'flex-start', paddingTop: '10px' }}>02</span>
            Contact
          </Link>
        </nav>

        {/* Email en bas */}
        <div style={{
          marginTop: 'auto',
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.45s 0.48s ease, transform 0.45s 0.48s ease',
        }}>
          <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-mid)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Email</span>
          <a href="mailto:bsy.alexis@gmail.com" style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 400 }}>
            bsy.alexis@gmail.com
          </a>
        </div>
      </div>
    </>
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
}
