'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Vidéaste',
    desc: 'Films de marque, teasers produit, documentaires corporate. De la captation au montage final.',
    large: true,
  },
  {
    num: '02',
    title: 'Photographe',
    desc: 'Corporate, produit, événementiel. Des images nettes, cohérentes, directement exploitables.',
    large: true,
  },
  {
    num: '03',
    title: 'Direction Artistique',
    desc: 'Identité visuelle, charte graphique, supervision de campagnes.',
    large: false,
  },
  {
    num: '04',
    title: 'Communication',
    desc: 'Stratégie visuelle, contenus réseaux sociaux, supports print & digital.',
    large: false,
  },
  {
    num: '05',
    title: 'Webdesign',
    desc: 'Sites vitrine, landing pages, interfaces — design & intégration.',
    large: false,
  },
  {
    num: '06',
    title: 'Graphisme',
    desc: 'Identité de marque, typographie, mise en page éditoriale.',
    large: false,
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const large = services.filter((s) => s.large)
  const small = services.filter((s) => !s.large)

  return (
    <section id="services" ref={sectionRef} style={styles.section}>
      <div style={styles.inner}>

        <h2 style={styles.heading}>
          <span style={styles.headLight}>Ce que je</span>{' '}
          <span style={styles.headStrong}>fais.</span>
        </h2>

        {/* 2 grandes cartes */}
        <div style={styles.gridLarge}>
          {large.map((s) => (
            <div key={s.num} className="service-card" style={styles.cardLarge}>
              <span className="label" style={styles.num}>{s.num}</span>
              <h3 style={styles.cardTitle}>{s.title}</h3>
              <p style={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* 4 petites cartes */}
        <div style={styles.gridSmall}>
          {small.map((s, i) => (
            <div key={s.num} className="service-card" style={{
              ...styles.cardSmall,
              borderRadius: [
                '0 0 0 18px',
                '0 0 18px 0',
                '0 0 0 0',
                '0 0 0 0',
              ][i] || '0',
            }}>
              <span className="label" style={styles.num}>{s.num}</span>
              <h3 style={styles.cardTitleSm}>{s.title}</h3>
              <p style={styles.cardDescSm}>{s.desc}</p>
            </div>
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
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    paddingInline: '56px',
  },
  heading: {
    fontSize: '2.2rem',
    lineHeight: 1.2,
    marginBottom: '40px',
    letterSpacing: '-0.02em',
  },
  headLight: {
    fontWeight: 300,
    color: 'var(--text-mid)',
  },
  headStrong: {
    fontWeight: 700,
    color: 'var(--text)',
  },
  gridLarge: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3px',
    marginBottom: '3px',
  },
  gridSmall: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '3px',
  },
  cardLarge: {
    background: 'var(--bg-card)',
    padding: '36px',
    borderRadius: '0',
  },
  cardSmall: {
    background: 'var(--bg-card)',
    padding: '28px 24px',
  },
  num: {
    display: 'block',
    marginBottom: '16px',
    color: 'var(--accent)',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '12px',
    color: 'var(--text)',
    letterSpacing: '-0.01em',
  },
  cardTitleSm: {
    fontSize: '0.95rem',
    fontWeight: 600,
    marginBottom: '10px',
    color: 'var(--text)',
    letterSpacing: '-0.01em',
  },
  cardDesc: {
    fontSize: '0.88rem',
    fontWeight: 300,
    color: 'var(--text-mid)',
    lineHeight: 1.65,
  },
  cardDescSm: {
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--text-mid)',
    lineHeight: 1.6,
  },
}
