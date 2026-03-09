'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Projet {
  slug: string
  title: string
  category: string
  year: string
  cover?: string
  coverVideo?: string
}

interface Props {
  projets: Projet[]
}

export default function Bento({ projets }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const [p0, p1, p2] = projets

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
          {p0?.coverVideo ? (
            <video
              autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src={p0.coverVideo} type="video/webm" />
            </video>
          ) : (
            <div
              style={{
                ...styles.mainBg,
                background: p0?.cover
                  ? `url(${p0.cover}) center/cover no-repeat`
                  : styles.mainBg.background as string,
              }}
            />
          )}
          {/* Pill nom en bas à gauche */}
          <span style={styles.namePill}>Alexis Bossy</span>
        </div>

        {/* Colonne droite */}
        <div className="bento-right-col" style={styles.rightCol}>

          {/* Card texte */}
          <div className="bento-item" style={styles.textCard}>
            <span style={styles.pill}>&bull; Esthétique &middot; Cinéma</span>
            <p style={styles.cardHeading}>
              <span style={styles.headLight}>Des images qui parlent</span>
              <br />
              <span style={styles.headStrong}>pour votre marque.</span>
            </p>
          </div>

          {/* Deux petites images */}
          <div className="bento-small-row" style={styles.smallRow}>
            <div className="bento-item" style={styles.smallCard}>
              <div style={{
                ...styles.smallBg,
                background: p1?.cover
                  ? `url(${p1.cover}) center/cover no-repeat`
                  : 'radial-gradient(ellipse at 60% 30%, rgba(255,255,255,0.18) 0%, transparent 50%), linear-gradient(155deg, #cac2b8 0%, #9c9488 100%)',
              }} />
              {p1 && <span className="label" style={styles.smallLabel}>{p1.title}</span>}
            </div>
            <div className="bento-item" style={styles.smallCard}>
              <div style={{
                ...styles.smallBg,
                background: p2?.cover
                  ? `url(${p2.cover}) center/cover no-repeat`
                  : 'radial-gradient(ellipse at 35% 65%, rgba(255,255,255,0.14) 0%, transparent 50%), linear-gradient(155deg, #b8b0a4 0%, #908880 100%)',
              }} />
              {p2 && <span className="label" style={styles.smallLabel}>{p2.title}</span>}
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
  mainBg: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(ellipse at 28% 32%, rgba(255,255,255,0.22) 0%, transparent 52%), linear-gradient(155deg, #cec6ba 0%, #a89a8e 40%, #806c62 100%)',
  },
  namePill: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
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
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  textCard: {
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
    width: 'fit-content',
  },
  cardHeading: {
    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
    margin: 0,
  },
  headLight: { fontWeight: 300, color: 'var(--text-mid)' },
  headStrong: { fontWeight: 700, color: 'var(--text)' },
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
  },
  smallLabel: {
    position: 'absolute',
    bottom: '12px',
    left: '14px',
    color: 'rgba(255,255,255,0.7)',
  },
}
