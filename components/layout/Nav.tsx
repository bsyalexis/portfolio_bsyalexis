'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Menu from './Menu'
import Magnetic from '@/components/motion/Magnetic'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  /* Ombre & fond au scroll, et passage en mode transparent au-dessus d'un
     hero sombre. Le nav crème posé sur le hero plein cadre cassait l'image
     en deux ; ici il s'efface tant qu'on est dessus, puis reprend son fond
     dès qu'on le quitte. */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const hero = document.getElementById('hero')
      setOverHero(!!hero && window.scrollY < hero.offsetHeight - 120)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Le panneau est identique à toutes les tailles : il n'a plus de raison de
     se fermer au passage en desktop, contrairement à l'ancien menu mobile. */

  return (
    <>
      <header
        ref={navRef}
        className={clsx('nav', {
          'nav--scrolled': scrolled && !overHero && !menuOpen,
          /* Contenu en clair uniquement au-dessus du hero sombre. Le menu
             ouvert affiche désormais un panneau clair sur voile clair : y
             passer le nav en blanc le rendrait invisible. */
          'nav--over': overHero && !menuOpen,
        })}
        style={{
          ...styles.nav,
          zIndex: menuOpen ? 201 : 100,
          /* Le fond est inline dans styles.nav, donc une classe CSS ne peut
             pas le neutraliser — il faut le retirer ici.
             borderBottom en entier, pas borderBottomColor : mélanger la
             propriété raccourcie et sa déclinaison sur le même élément fait
             que React abandonne la seconde, et la bordure claire restait
             visible en travers du hero. */
          ...(overHero || menuOpen
            ? { background: 'transparent', backdropFilter: 'none', borderBottom: '1px solid transparent' }
            : null),
        }}
      >
        <nav style={styles.inner}>
          {/* Logo / nom */}
          <div style={styles.logoGroup}>
            <Link href="/" style={styles.logo} onClick={closeMenu} data-cursor="ACCUEIL">
              Alexis Bossy
            </Link>
            <div style={styles.socialLinks}>
              <a href="https://www.instagram.com/alexbsy_" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@bsyalex_" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Bascule du menu — à toutes les tailles. Le panneau remplace les
              deux liens qui traînaient à droite. */}
          <Magnetic strength={0.28}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={clsx('burger', { 'is-open': menuOpen })}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              data-cursor={menuOpen ? 'FERMER' : 'MENU'}
            >
              <span />
              <span />
            </button>
          </Magnetic>
        </nav>
      </header>

      <Menu open={menuOpen} onClose={closeMenu} />
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
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  logo: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--text)',
    letterSpacing: '-0.01em',
  },
  socialLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-mid)',
    transition: 'color 0.2s ease',
  },
}
