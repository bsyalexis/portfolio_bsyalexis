'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '5+',   label: 'Années\nd\'expérience' },
  { value: '60+',  label: 'Projets\nlivrés' },
  { value: '30+',  label: 'Clients\nsatisfaits' },
  { value: '1er',  label: 'Poste DA\nchez Innolive' },
]

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.inner}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={styles.item}>
            <span style={styles.value}>{s.value}</span>
            <span style={styles.label}>{s.label.split('\n').map((line, j) => (
              <span key={j} style={{ display: 'block' }}>{line}</span>
            ))}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg)',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    paddingInline: '56px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0',
  },
  item: {
    padding: '48px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderRight: '1px solid var(--border)',
    paddingRight: '40px',
    paddingLeft: '40px',
  },
  value: {
    fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '-0.04em',
    lineHeight: 1,
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: 400,
    color: 'var(--text-mid)',
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
}
