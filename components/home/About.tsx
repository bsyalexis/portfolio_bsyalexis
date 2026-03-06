'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tag from '@/components/ui/Tag'

gsap.registerPlugin(ScrollTrigger)

const tags = ['Direction Artistique', 'Vidéo', 'Photographie', 'Branding', 'Webdesign', 'After Effects', 'Figma']

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-portrait', {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from('.about-text', {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={styles.section}>
      <div style={styles.inner}>

        {/* Portrait */}
        <div className="about-portrait" style={styles.portraitWrap}>
          <div style={styles.portrait} />
          <div style={styles.portraitAccent} />
        </div>

        {/* Texte */}
        <div className="about-text" style={styles.textCol}>
          <span className="label" style={{ marginBottom: '20px', display: 'block' }}>À propos</span>
          <h2 style={styles.name}>
            <span style={styles.nameLight}>Alexis</span>
            <br />
            <span style={styles.nameStrong}>Bossy</span>
          </h2>
          <p style={styles.bio}>
            Directeur Artistique, je travaille sur des missions freelance
            pour des marques premium, startups tech et agences créatives. Mon approche : trouver
            l&rsquo;image juste, celle qui reste. Pas d&rsquo;effets pour les effets — seulement ce
            qui sert le propos.
          </p>
          <p style={{ ...styles.bio, marginTop: '16px' }}>
            5 ans d&rsquo;expérience, des projets dans la cosmétique, la tech, l&rsquo;industrie et
            la culture. Disponible pour de nouvelles missions dès maintenant.
          </p>
          <div style={styles.tags}>
            {tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    paddingTop: '120px',
    paddingBottom: '120px',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    paddingInline: '56px',
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: '80px',
    alignItems: 'center',
  },
  portraitWrap: {
    position: 'relative',
  },
  portrait: {
    width: '100%',
    aspectRatio: '3/4',
    background: 'linear-gradient(160deg, #ddd9d3 0%, #c8c3bc 100%)',
    borderRadius: '12px',
  },
  portraitAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '48px',
    height: '3px',
    background: 'var(--accent)',
    borderRadius: '2px',
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  name: {
    fontSize: '3.6rem',
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
    marginBottom: '28px',
  },
  nameLight: {
    fontWeight: 300,
    color: 'var(--text-mid)',
  },
  nameStrong: {
    fontWeight: 700,
    color: 'var(--text)',
  },
  bio: {
    fontSize: '0.92rem',
    fontWeight: 300,
    color: 'var(--text-mid)',
    lineHeight: 1.75,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '32px',
  },
}
