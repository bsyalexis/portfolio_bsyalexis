'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeatureEditorial() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-image', {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.feat-text', {
        opacity: 0,
        x: 40,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.inner}>

        {/* Image — grande, cinématographique */}
        <div className="feat-image" style={styles.imageWrap}>
          <div style={styles.imagePlaceholder} />
          {/* Pill catégorie */}
          <div style={styles.pill}>
            <span style={styles.pillDot} />
            <span style={styles.pillText}>Élégance · Intemporel</span>
          </div>
        </div>

        {/* Texte éditorial */}
        <div className="feat-text" style={styles.textCol}>
          <span className="label" style={styles.eyebrow}>Approche</span>
          <h2 style={styles.heading}>
            <span style={styles.headLight}>Style Moderne,</span>
            <br />
            <span style={styles.headStrong}>Charme Intemporel.</span>
          </h2>
          <p style={styles.body}>
            Chaque projet commence par une question simple : qu&rsquo;est-ce qui doit rester dans
            l&rsquo;esprit du spectateur&nbsp;? À partir de là, je construis un langage visuel cohérent
            — lumière, cadre, rythme — qui sert l&rsquo;histoire de la marque.
          </p>
          <p style={{ ...styles.body, marginTop: '16px' }}>
            Pas de tendances pour les tendances. Une esthétique calibrée pour durer.
          </p>
          <Link href="/travaux" style={styles.cta}>
            Découvrir les projets &rsaquo;
          </Link>
        </div>

      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    paddingTop: '120px',
    paddingBottom: '120px',
    background: 'var(--bg)',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingInline: '56px',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '80px',
    alignItems: 'center',
  },
  imageWrap: {
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: '4/5',
    background: 'linear-gradient(160deg, #c5bdb5 0%, #9a928a 50%, #6e6660 100%)',
    borderRadius: '4px',
  },
  pill: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(248, 246, 242, 0.9)',
    backdropFilter: 'blur(12px)',
    borderRadius: '100px',
    border: '1px solid var(--border)',
  },
  pillDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--accent)',
    flexShrink: 0,
  },
  pillText: {
    fontSize: '0.65rem',
    fontWeight: 500,
    color: 'var(--text)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  eyebrow: {
    marginBottom: '20px',
    display: 'block',
    color: 'var(--accent)',
  },
  heading: {
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '28px',
  },
  headLight: {
    fontWeight: 300,
    color: 'var(--text-mid)',
    display: 'block',
  },
  headStrong: {
    fontWeight: 700,
    color: 'var(--text)',
    display: 'block',
  },
  body: {
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'var(--text-mid)',
    lineHeight: 1.75,
    maxWidth: '420px',
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '36px',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text)',
    textDecoration: 'none',
    borderBottom: '1px solid var(--text)',
    paddingBottom: '2px',
    width: 'fit-content',
  },
}
