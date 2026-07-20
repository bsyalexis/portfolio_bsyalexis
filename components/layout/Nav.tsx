'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Menu from './Menu'
import Magnetic from '@/components/motion/Magnetic'

export default function Nav() {
  const [overHero, setOverHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pct, setPct] = useState(0)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  /* Un seul écouteur pour les deux informations : la progression affichée
     dans la pilule, et le passage en clair au-dessus du hero sombre — le nav
     crème posé sur le hero plein cadre cassait l'image en deux. */
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const hero = document.getElementById('hero')
      setOverHero(!!hero && window.scrollY < hero.offsetHeight - 120)

      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <header
        className={clsx('nav', { 'nav--over': overHero && !menuOpen })}
        style={{ zIndex: menuOpen ? 201 : 100 }}
      >
        {/* Le nom et l'accès au menu forment un seul bloc, calé en haut à
            gauche : ce sont les deux commandes d'identité et de navigation,
            les séparer aux deux bouts du header les rendait moins évidentes. */}
        <div className="nav__left">
          <Link href="/" className="nav__logo" onClick={closeMenu} data-cursor="ACCUEIL">
            Alexis Bossy
          </Link>

          <Magnetic strength={0.2}>
            <button
              onClick={() => setMenuOpen(true)}
              className={clsx('nav__pill', { 'is-hidden': menuOpen })}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              data-cursor="MENU"
            >
              <span className="nav__burger" aria-hidden="true">
                <span />
                <span />
              </span>
              Menu
            </button>
          </Magnetic>
        </div>

        <div className="nav__socials">
            <a href="https://www.instagram.com/alexbsy_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@bsyalex_" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </a>
        </div>

        <div className="nav__right">
          <Magnetic strength={0.25}>
            <Link href="/#contact" className="nav__cta" onClick={closeMenu} data-cursor="ÉCRIRE">
              Me contacter
            </Link>
          </Magnetic>
        </div>
      </header>

      <Menu open={menuOpen} onClose={closeMenu} pct={pct} />
    </>
  )
}
