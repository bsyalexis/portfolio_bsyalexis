'use client'

import { useEffect, useRef } from 'react'
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

  /* Dérive parallaxe, reprise du module parcours : la progression du bloc
     dans le viewport est écrite dans --pdrift, le portrait et la puce la
     multiplient par leur amplitude. C'est ce qui prolonge la sensation de
     flottaison d'un module à l'autre. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      const pd = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)))
      el.style.setProperty('--pdrift', pd.toFixed(4))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about" style={styles.section}>

      {/* Pont depuis le parcours : la ligne de vie descend une dernière fois
          et se pose sur « qui je suis aujourd'hui ». Le module précédent et
          celui-ci se lisent comme un seul fil, pas deux blocs juxtaposés. */}
      <Reveal className="about-bridge" aria-hidden="true">
        <span className="about-bridge__line" />
        <span className="about-bridge__dot" />
      </Reveal>

      <div style={styles.inner} className="about-inner">

        {/* Colonne visuelle : mêmes couches de mouvement que les cartes du
            parcours : dérive au scroll (about-visual), éclosion (Reveal),
            flottaison continue (about-portrait). */}
        <div
          className="about-visual"
          style={{ ['--drift' as string]: 26, ['--tilt' as string]: '-1.4deg' }}
        >
          <Reveal className="about-portrait-reveal">
            <div className="about-portrait">
              <Image
                src="/portrait.jpg.webp"
                alt="Alexis Bossy"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                className="portrait-img"
              />
            </div>
          </Reveal>

          {/* Puces flottantes qui débordent du portrait, dans la grammaire des
              chips du bento : verre sombre, point accent, tempo propre. Les
              deux villes sont empilées dans un conteneur plutôt que calées
              chacune sur sa propre position absolue, l'écart reste constant
              quelle que soit la longueur des noms. */}
          <div className="about-chips">
            <Reveal delay={0.3} className="about-chip">
              <span className="about-chip__dot" aria-hidden="true" />
              Saint-Étienne
            </Reveal>
            <Reveal delay={0.38} className="about-chip">
              <span className="about-chip__dot" aria-hidden="true" />
              Lyon
            </Reveal>
          </div>
        </div>

        {/* Texte */}
        <div className="about-text" style={styles.textCol}>
          <span className="eyebrow">
            <span className="eyebrow__dash" aria-hidden="true" />
            À propos
          </span>
          <Reveal as="h2" split className="about-name" style={styles.name} stagger={0.07}>
            Alexis Bossy
          </Reveal>

          {/* Paragraphes révélés un par un plutôt qu'en bloc : le regard
              descend la colonne au même rythme que les cartes du parcours. */}
          <Reveal delay={0.06}>
            <p style={styles.bio}>
              Photographe et vidéaste basé à Saint-Étienne. Cinq ans chez Innolive à tourner, monter, faire du motion design et gérer des réseaux sociaux, un poste que j&rsquo;occupe toujours. À côté, j&rsquo;ai pris l&rsquo;appareil photo et je mets tout ça au service de mes propres projets.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ ...styles.bio, marginTop: '16px' }}>
              Je travaille surtout avec des clubs sportifs, des sportifs amateurs et des indépendants du coin. Des structures qui font des choses remarquables et qui, faute de temps ou de moyens, se retrouvent avec des images qui ne leur ressemblent pas. Mon métier commence là : passer assez de temps sur le terrain pour comprendre ce qui se joue, puis le rendre visible.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p style={{ ...styles.bio, marginTop: '16px' }}>
              Concrètement, ça va du reportage en bord de terrain au film de marque, du portrait au contenu pensé pour les réseaux. La photo et la vidéo restent le cœur du métier ; la direction artistique vient en amont, quand un projet a besoin d&rsquo;une ligne avant d&rsquo;avoir des images.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p style={{ ...styles.bio, marginTop: '16px' }}>
              Des clients comme BMW ou Le Petit Futé, des univers variés, toujours le même objectif : que ça soit bien fait, et que ça serve vraiment à quelque chose.
            </p>
          </Reveal>
          <Reveal delay={0.3} style={styles.tags}>
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
    // Nul en haut : le pont raccorde la ligne du parcours sans couture, une
    // marge rouvrirait la coupure qu'on cherche justement à effacer.
    paddingTop: '0px',
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
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  name: {
    fontSize: '3.6rem',
    fontWeight: 800,
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
    marginTop: '18px',
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
