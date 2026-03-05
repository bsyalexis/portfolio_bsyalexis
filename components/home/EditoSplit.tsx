'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EditoSplit() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edito-img', {
        opacity: 0, x: -60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.edito-text', {
        opacity: 0, x: 40, duration: 0.9, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={styles.section}>
      <div className="edito-inner" style={styles.inner}>

        {/* Image 4:3 */}
        <div className="edito-img" style={styles.imgWrap}>
          <div style={styles.imgBg} />
        </div>

        {/* Texte éditorial */}
        <div className="edito-text" style={styles.textCol}>
          <span className="label" style={styles.eyebrow}>Élégance &middot; Cinéma</span>
          <h2 style={styles.heading}>
            <span style={styles.headLight}>L&rsquo;image comme</span>
            <br />
            <span style={styles.headStrong}>langage.</span>
          </h2>
          <p style={styles.body}>
            Chaque projet commence par une question simple : qu&rsquo;est-ce qui doit
            rester dans l&rsquo;esprit du spectateur&nbsp;? À partir de là, je construis
            un langage visuel cohérent &mdash; lumière, cadre, rythme &mdash; qui sert
            l&rsquo;histoire de la marque.
          </p>
          <p style={{ ...styles.body, marginTop: '16px' }}>
            Pas de tendances pour les tendances. Une esthétique calibrée pour durer.
          </p>
          <Link href="/travaux" style={styles.cta}>
            À propos &rsaquo;
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
    gridTemplateColumns: '1fr 0.85fr',
    gap: '80px',
    alignItems: 'center',
  },
  imgWrap: {
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  imgBg: {
    width: '100%',
    aspectRatio: '4/3',
    background: 'linear-gradient(160deg, #c5bdb5 0%, #9a928a 50%, #6e6660 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'block',
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
    fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
    lineHeight: 1.05,
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
    lineHeight: 1.8,
    maxWidth: '400px',
    margin: 0,
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
