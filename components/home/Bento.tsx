'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IMGS = [
  '/A7403250.webp',
  '/A7402929.webp',
  '/A7404198.webp',
  '/DSC01261.webp',
]

export default function Bento() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bento-main', {
        opacity: 0, x: -40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
      gsap.from('.bento-item', {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={styles.section}>
      <div className="bento-grid" style={styles.grid}>

        {/* Grande image — gauche */}
        <div className="bento-main" style={styles.mainWrap}>
          <div style={{ ...styles.imgFill, background: `url(${IMGS[0]}) center/cover no-repeat` }} />
          <div style={styles.mainOverlay}>
            <p style={styles.tagline}>
              <span style={styles.tagLight}>Des images qui parlent</span>
              <br />
              <span style={styles.tagStrong}>pour vous.</span>
            </p>
          </div>
        </div>

        {/* Colonne droite : 3 images */}
        <div className="bento-right-col" style={styles.rightCol}>

          {/* Image haute */}
          <div className="bento-item" style={{ ...styles.imgCell, flex: 1 }}>
            <div style={{ ...styles.imgFill, background: `url(${IMGS[1]}) center/cover no-repeat` }} />
          </div>

          {/* Deux petites images */}
          <div className="bento-small-row" style={styles.smallRow}>
            <div className="bento-item" style={styles.smallCard}>
              <div style={{ ...styles.imgFill, background: `url(${IMGS[2]}) center/cover no-repeat` }} />
            </div>
            <div className="bento-item" style={styles.smallCard}>
              <div style={{ ...styles.imgFill, background: `url(${IMGS[3]}) center/cover no-repeat` }} />
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: 'relative',
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
  mainWrap: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  imgFill: {
    width: '100%',
    height: '100%',
  },
  mainOverlay: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
  },
  namePill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 14px',
    background: 'rgba(248,246,242,0.85)',
    backdropFilter: 'blur(12px)',
    borderRadius: '100px',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'var(--text)',
    letterSpacing: '0.01em',
    border: '1px solid rgba(0,0,0,0.06)',
  },
  tagline: {
    margin: 0,
    fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
    letterSpacing: '-0.025em',
    lineHeight: 1.15,
  },
  tagLight:  { fontWeight: 300, color: 'rgba(17,16,16,0.55)' },
  tagStrong: { fontWeight: 700, color: '#111010' },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  imgCell: {
    overflow: 'hidden',
    borderRadius: '4px',
  },
  smallRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3px',
    height: '210px',
  },
  smallCard: {
    overflow: 'hidden',
    borderRadius: '4px',
  },
}
