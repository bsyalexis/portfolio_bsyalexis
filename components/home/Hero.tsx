'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.7, delay: 0.3 })
      gsap.from('.hero-line',    { opacity: 0, y: 40, duration: 0.9, stagger: 0.15, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta',     { opacity: 0, y: 20, duration: 0.6, delay: 1.1 })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={containerRef} style={styles.section}>

      {/* Showreel en fond */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={styles.videoBg}
      >
        <source src="/showreel.mp4" type="video/mp4" />
      </video>
      <div style={styles.overlay} aria-hidden="true" />

      {/* Contenu — bottom left */}
      <div style={styles.content} className="hero-content-inner">
        <p className="label hero-eyebrow" style={styles.eyebrow}>
          Vidéaste&nbsp;&middot;&nbsp;Photographe&nbsp;&middot;&nbsp;DA
        </p>

        <h1 style={styles.title}>
          <span className="hero-line" style={styles.lineLight}>Créer des</span>
          <br />
          <span className="hero-line" style={styles.lineLight}>images qui</span>
          <br />
          <span className="hero-line" style={styles.lineStrong}>restent.</span>
        </h1>

        <div className="hero-cta" style={styles.ctaWrap}>
          <Link href="/travaux" style={styles.btnPrimary}>
            Voir les travaux &rarr;
          </Link>
        </div>
      </div>


    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: 'relative',
    width: '100%',
    height: '70vh',
    minHeight: '480px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  videoBg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    opacity: 0.6,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(17,16,16,0.9) 0%, rgba(17,16,16,0.35) 50%, rgba(17,16,16,0.05) 100%)',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: '0 56px 56px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '20px',
    display: 'block',
    letterSpacing: '0.14em',
  },
  title: {
    fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
    lineHeight: 1.0,
    letterSpacing: '-0.035em',
    marginBottom: '32px',
  },
  lineLight: {
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    display: 'inline',
  },
  lineStrong: {
    fontWeight: 700,
    color: '#ffffff',
    display: 'inline',
  },
  ctaWrap: {
    display: 'flex',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '13px 28px',
    borderRadius: '100px',
    background: '#ffffff',
    color: '#111010',
    fontSize: '0.82rem',
    fontWeight: 600,
    textDecoration: 'none',
    letterSpacing: '0.01em',
  },
}
