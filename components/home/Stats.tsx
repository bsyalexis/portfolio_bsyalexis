'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 8,   suffix: '+', label: 'Années\nd\'expérience' },
  { value: 3,   suffix: '+', label: 'Agences\npartenaires' },
  { value: 40,  suffix: '+', label: 'Projets\nlivrés' },
  { value: 100, suffix: '%', label: 'Satisfaction\nclient' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach(({ value, suffix }, i) => {
        const el = numRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      })

      gsap.from('.stat-item', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={styles.section}>
      <div className="stats-grid" style={styles.grid}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={styles.item}>
            {i > 0 && <div className="stats-sep" style={styles.sep} aria-hidden="true" />}
            <div style={styles.inner}>
              <span
                ref={(el) => { numRefs.current[i] = el }}
                style={styles.num}
              >
                0{s.suffix}
              </span>
              <span style={styles.label}>
                {s.label.split('\n').map((line, j) => (
                  <span key={j} style={{ display: 'block' }}>{line}</span>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    paddingTop: '72px',
    paddingBottom: '72px',
    background: 'var(--bg)',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
  },
  grid: {
    maxWidth: '1100px',
    margin: '0 auto',
    paddingInline: '56px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0',
  },
  item: {
    position: 'relative',
    padding: '0 40px',
    textAlign: 'center',
  },
  sep: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1px',
    height: '56px',
    background: 'var(--border)',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  num: {
    fontSize: 'clamp(2.8rem, 4.5vw, 4rem)',
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '-0.03em',
    lineHeight: 1,
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 300,
    color: 'var(--text-mid)',
    lineHeight: 1.5,
    textAlign: 'center',
  },
}
