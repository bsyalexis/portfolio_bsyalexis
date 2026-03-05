'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EditorialSplit() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.split-left', {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
      gsap.from('.split-right-item', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.grid}>

        {/* Grande image — gauche */}
        <div className="split-left" style={styles.imgWrap}>
          <div style={styles.imgBg} />
          <span className="label" style={styles.imgLabel}>Innolive &middot; 2024</span>
        </div>

        {/* Colonne droite */}
        <div style={styles.rightCol}>

          {/* Carte éditoriale — texte */}
          <div className="split-right-item" style={styles.topCard}>
            <span style={styles.pill}>&bull; Esthétique</span>
            <h2 style={styles.heading}>
              <span style={styles.headLight}>Dans une galerie</span>
              <br />
              <span style={styles.headStrong}>d&rsquo;élégance.</span>
            </h2>
            <Link href="/travaux" style={styles.arrowLink}>
              <span style={styles.arrowCircle}>&#8599;</span>
            </Link>
          </div>

          {/* Deux petites images */}
          <div style={styles.smallRow}>
            <div className="split-right-item" style={styles.smallCard}>
              <div style={{ ...styles.smallBg, background: 'linear-gradient(160deg, #c2bab0 0%, #8a8278 100%)' }} />
              <span className="label" style={styles.smallLabel}>Meilleure Photographie</span>
            </div>
            <div className="split-right-item" style={styles.smallCard}>
              <div style={{ ...styles.smallBg, background: 'linear-gradient(160deg, #b0a8a0 0%, #7a7270 100%)' }} />
              <span className="label" style={styles.smallLabel}>L&rsquo;art du quotidien</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    paddingTop: '48px',
    paddingBottom: '48px',
    background: 'var(--bg)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '3px',
    height: '560px',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingInline: '56px',
  },
  imgWrap: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  imgBg: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(160deg, #c8c0b6 0%, #a09288 40%, #786860 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imgLabel: {
    position: 'absolute',
    bottom: '20px',
    left: '24px',
    color: 'rgba(255,255,255,0.55)',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  topCard: {
    flex: 1,
    background: 'var(--bg-card)',
    borderRadius: '4px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  pill: {
    display: 'inline-block',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: 'var(--accent)',
    background: 'rgba(192,41,58,0.06)',
    border: '1px solid rgba(192,41,58,0.15)',
    borderRadius: '100px',
    padding: '5px 12px',
    alignSelf: 'flex-start',
    width: 'fit-content',
  },
  heading: {
    fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
  },
  headLight: { fontWeight: 300, color: 'var(--text-mid)' },
  headStrong: { fontWeight: 700, color: 'var(--text)' },
  arrowLink: {
    alignSelf: 'flex-end',
    textDecoration: 'none',
  },
  arrowCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'var(--text)',
    color: '#fff',
    fontSize: '1.1rem',
  },
  smallRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3px',
    height: '210px',
  },
  smallCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  smallBg: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  smallLabel: {
    position: 'absolute',
    bottom: '14px',
    left: '16px',
    color: 'rgba(255,255,255,0.65)',
  },
}
