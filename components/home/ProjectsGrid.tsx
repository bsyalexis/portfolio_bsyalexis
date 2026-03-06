'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Projet {
  slug: string
  title: string
  category: string
  year: string
  ratio?: string
  cover?: string
}

interface Props {
  projets: Projet[]
}

/* Gradients placeholder — lumière simulée par projet */
const placeholders = [
  'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 55%), linear-gradient(155deg, #c8c0b6 0%, #9a9088 40%, #787068 100%)',
  'radial-gradient(ellipse at 65% 25%, rgba(255,255,255,0.16) 0%, transparent 50%), linear-gradient(155deg, #d0c8bc 0%, #a8a094 40%, #888078 100%)',
  'radial-gradient(ellipse at 40% 65%, rgba(255,255,255,0.14) 0%, transparent 52%), linear-gradient(155deg, #b8b0a8 0%, #8c8880 40%, #6a6860 100%)',
  'radial-gradient(ellipse at 70% 40%, rgba(255,255,255,0.18) 0%, transparent 55%), linear-gradient(155deg, #c4bcb4 0%, #9c9490 40%, #7a7470 100%)',
  'radial-gradient(ellipse at 35% 55%, rgba(255,255,255,0.15) 0%, transparent 50%), linear-gradient(155deg, #ccbcb0 0%, #a09080 40%, #806c60 100%)',
]

export default function ProjectsGrid({ projets }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.masonry-card', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Distribution masonry : col1=[0,3], col2=[1], col3=[2,4] */
  const col1 = [projets[0], projets[3]].filter(Boolean)
  const col2 = [projets[1]].filter(Boolean)
  const col3 = [projets[2], projets[4]].filter(Boolean)

  return (
    <section id="projets" ref={sectionRef} style={styles.section}>

      {/* Header — 2 colonnes */}
      <div style={styles.header} className="projects-grid-header">
        <h2 style={styles.heading}>
          <span style={styles.headLight}>Travaux</span>
          <br />
          <span style={styles.headStrong}>récents.</span>
        </h2>
        <div style={styles.headerRight}>
          <p style={styles.headerDesc}>
            Projets sélectionnés en vidéo, photographie et direction artistique.
          </p>
          <Link href="/travaux" style={styles.seeAll}>
            Voir tout &rsaquo;
          </Link>
        </div>
      </div>

      {/* Masonry 3 colonnes */}
      <div className="masonry-container" style={styles.masonry}>

        {/* Colonne 1 */}
        <div className="masonry-col" style={styles.col}>
          {col1.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projet/${p.slug}`}
              className="masonry-card project-card"
              style={{
                ...styles.card,
                background: placeholders[projets.indexOf(p)] ?? placeholders[0],
                flex: i === 0 ? '0 0 45%' : '1',
              }}
            >
              <div className="masonry-hover-info">
                <span style={styles.cardName}>{p.title}</span>
                <span className="masonry-arrow">&#8599;</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Colonne 2 — tall */}
        <div className="masonry-col" style={styles.col}>
          {col2.map((p) => (
            <Link
              key={p.slug}
              href={`/projet/${p.slug}`}
              className="masonry-card project-card"
              style={{
                ...styles.card,
                flex: 1,
                background: placeholders[projets.indexOf(p)] ?? placeholders[1],
              }}
            >
              <div className="masonry-hover-info">
                <span style={styles.cardName}>{p.title}</span>
                <span className="masonry-arrow">&#8599;</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Colonne 3 */}
        <div className="masonry-col" style={styles.col}>
          {col3.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projet/${p.slug}`}
              className="masonry-card project-card"
              style={{
                ...styles.card,
                background: placeholders[projets.indexOf(p)] ?? placeholders[2],
                flex: i === 0 ? '1' : '0 0 40%',
              }}
            >
              <div className="masonry-hover-info">
                <span style={styles.cardName}>{p.title}</span>
                <span className="masonry-arrow">&#8599;</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    paddingTop: '96px',
    paddingBottom: '96px',
    background: 'var(--bg)',
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingInline: '56px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'end',
    marginBottom: '40px',
  },
  heading: {
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
    margin: 0,
  },
  headLight: { fontWeight: 300, color: 'var(--text-mid)' },
  headStrong: { fontWeight: 700, color: 'var(--text)' },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
    paddingBottom: '4px',
  },
  headerDesc: {
    fontSize: '0.88rem',
    fontWeight: 300,
    color: 'var(--text-mid)',
    lineHeight: 1.7,
    maxWidth: '360px',
    margin: 0,
  },
  seeAll: {
    fontSize: '0.78rem',
    fontWeight: 500,
    color: 'var(--text-mid)',
    textDecoration: 'none',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '2px',
  },
  masonry: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingInline: '56px',
    display: 'flex',
    gap: '12px',
    height: '720px',
  },
  col: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    textDecoration: 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '16px',
  },
  cardName: {
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#ffffff',
    letterSpacing: '-0.01em',
  },
}
