'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Tag from '@/components/ui/Tag'
import Reveal from '@/components/motion/Reveal'

const tags = ['Photographie', 'Vidéo', 'Drone', 'Motion Design', 'Branding', 'Webdesign', 'Gestion réseaux sociaux']

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Plus de GSAP ici : les entrées passent par Reveal, qui pilote des
     transitions CSS via IntersectionObserver. Un `gsap.from` sur le bloc
     parent en plus des révélations enfants faisait jouer deux animations
     superposées sur le même contenu. */

  return (
    <section id="about" ref={sectionRef} style={styles.section}>
      <div style={styles.inner} className="about-inner">

        {/* Portrait */}
        <Reveal className="about-portrait" style={styles.portraitWrap}>
          <Image
            src="/portrait.jpg.webp"
            alt="Alexis Bossy"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            className="portrait-img"
          />
        </Reveal>

        {/* Texte */}
        <div className="about-text" style={styles.textCol}>
          <span className="label" style={{ marginBottom: '20px', display: 'block' }}>À propos</span>
          <Reveal as="h2" split className="about-name" style={styles.name} stagger={0.07}>
            Alexis Bossy
          </Reveal>
          <Reveal delay={0.08}>
            <p style={styles.bio}>
              Photographe et vidéaste basé à Saint-Étienne. Cinq ans en agence à tourner, monter, faire du motion design et gérer des réseaux sociaux, avant de passer en indépendant pour travailler directement avec les gens dont je raconte l&rsquo;histoire.
            </p>
            <p style={{ ...styles.bio, marginTop: '16px' }}>
              Je travaille surtout avec des clubs sportifs, des sportifs amateurs et des indépendants du coin. Des structures qui font des choses remarquables et qui, faute de temps ou de moyens, se retrouvent avec des images qui ne leur ressemblent pas. Mon métier commence là : passer assez de temps sur le terrain pour comprendre ce qui se joue, puis le rendre visible.
            </p>
            <p style={{ ...styles.bio, marginTop: '16px' }}>
              Concrètement, ça va du reportage en bord de terrain au film de marque, du portrait au contenu pensé pour les réseaux. La photo et la vidéo restent le cœur du métier ; la direction artistique vient en amont, quand un projet a besoin d&rsquo;une ligne avant d&rsquo;avoir des images.
            </p>
            <p style={{ ...styles.bio, marginTop: '16px' }}>
              Des clients comme BMW ou Le Petit Futé, des univers variés, toujours le même objectif : que ça soit bien fait, et que ça serve vraiment à quelque chose.
            </p>
          </Reveal>
          <Reveal delay={0.16} style={styles.tags}>
            {tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </Reveal>
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
    borderRadius: '12px',
    overflow: 'hidden',
    aspectRatio: '3/4',
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
