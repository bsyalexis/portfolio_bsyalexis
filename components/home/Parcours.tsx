'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/motion/Reveal'

/* Parcours en cinq jalons — une phrase chacun. La version longue vit dans
   la bio, juste en dessous ; ici on ne garde que les bascules.
   Les jalons sont repérés par l'âge, pas par l'année : c'est une trajectoire
   personnelle, pas une frise d'entreprise. `age: null` marque le présent, qui
   se rend en toutes lettres plutôt qu'en rouleaux de chiffres.
   `drift` (px) et `tilt` (deg) individualisent la flottaison : dérive au
   scroll et inclinaison au repos, jamais deux cartes sur le même tempo. */
const MILESTONES = [
  {
    age: '16',
    title: 'Le déclic',
    text: 'Mes premiers montages, sur des jeux vidéo et des animés. Par passion, sans y voir autre chose.',
    drift: 30,
    tilt: -1.3,
  },
  {
    age: '18',
    title: 'La bascule',
    text: 'Je continue à monter, et je comprends que ça peut être un métier.',
    drift: -22,
    tilt: 1.1,
  },
  {
    age: '21',
    title: 'Les clips',
    text: 'Je me spécialise dans mes études et je commence à filmer et monter des clips musicaux.',
    drift: 26,
    tilt: -0.9,
  },
  {
    age: '23',
    title: 'Le CDI',
    text: 'Je signe chez Innolive, où j’ai fait mon apprentissage : corporate, communication, web.',
    drift: -32,
    tilt: 1.2,
  },
  {
    age: null,
    title: 'La photo en plus',
    text: 'Toujours chez Innolive, et à côté je me suis mis à la photo : le sport et les indépendants qui veulent briller sur les réseaux.',
    drift: 22,
    tilt: -1.1,
  },
]

/**
 * Module parcours.
 *
 * Ligne de vie centrale qui se dessine au fil du scroll, jalons alternés de
 * part et d'autre. Chaque jalon est un Reveal autonome : rouleaux de
 * chiffres pour l'année, titre et phrase sous masque. La bio détaillée suit
 * dans la section À propos — ce module ne raconte que les bascules.
 */
export default function Parcours() {
  const tlRef = useRef<HTMLElement>(null)

  /* La ligne se dessine au fil du scroll — même mécanique que la parallaxe
     du bento : un écouteur écrit la progression dans une variable CSS, le
     tracé n'est qu'un scaleY côté compositeur. Le point de référence (80% du
     viewport) correspond au seuil de déclenchement des jalons : la pointe de
     la ligne arrive sur un point au moment où sa carte se révèle. */
  useEffect(() => {
    const el = tlRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const list = el.querySelector<HTMLElement>('.tl__list')
    if (!list) return

    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight

      // Tracé de la ligne : progression de lecture, 0 en haut → 1 en bas.
      const r = list.getBoundingClientRect()
      if (r.height <= 0) return
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / r.height))
      el.style.setProperty('--tlp', p.toFixed(4))

      // Dérive parallaxe : position du centre du module par rapport au centre
      // du viewport, ramenée dans [-1, 1]. Chaque carte multiplie ça par son
      // propre --drift — c'est la 2ᵉ couche de flottaison, celle qui répond
      // au scroll par-dessus l'oscillation continue.
      const s = el.getBoundingClientRect()
      const pd = Math.max(-1, Math.min(1, (vh / 2 - (s.top + s.height / 2)) / (vh / 2 + s.height / 2)))
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
    <section ref={tlRef} id="parcours" className="tl" aria-label="Parcours">
      <header className="tl__head">
        <span className="eyebrow tl__label">
          <span className="eyebrow__dash" aria-hidden="true" />
          Parcours
        </span>
        <Reveal as="h2" split className="tl__heading" stagger={0.05}>
          Du montage au bord de terrain.
        </Reveal>
      </header>

      <ol className="tl__list">
        {MILESTONES.map((m) => (
          <Reveal as="li" key={m.title} className="tl__item">
            {/* Trois couches de mouvement empilées, une par élément, pour
                qu'aucun transform n'en écrase un autre :
                  <li>       éclosion à l'entrée dans le champ ;
                  .tl__drift dérive parallaxe au scroll + inclinaison au repos ;
                  .tl__card  oscillation continue (lévitation). */}
            <div
              className="tl__drift"
              style={{ ['--drift' as string]: m.drift, ['--tilt' as string]: `${m.tilt}deg` }}
            >
              <div className="tl__card">
                {/* Rouleaux de chiffres : chaque digit remonte de 0 jusqu'à sa
                    valeur. Le conteneur est masqué à l'accessibilité, l'âge
                    complet est annoncé dans le titre. Le jalon du présent n'a
                    pas d'âge : il se rend en toutes lettres, sans rouleau. */}
                <span
                  className={`tl__year${m.age ? '' : ' tl__year--now'}`}
                  aria-hidden="true"
                >
                  {m.age ? (
                    <>
                      {m.age.split('').map((d, j) => (
                        // Le « 1 » est bien plus étroit que sa case (largeur du
                        // chiffre le plus large du rouleau) : on le marque pour
                        // rapprocher le chiffre suivant et fermer le vide à droite.
                        <span key={j} className={`tl__digit${d === '1' ? ' tl__digit--one' : ''}`}>
                          <span
                            className="tl__digit-track"
                            style={{ ['--d' as string]: d, ['--j' as string]: j }}
                          >
                            {Array.from({ length: 10 }, (_, n) => (
                              <span key={n}>{n}</span>
                            ))}
                          </span>
                        </span>
                      ))}
                      <span className="tl__unit">ans</span>
                    </>
                  ) : (
                    'Aujourd’hui'
                  )}
                </span>
                <div className="tl__body">
                  <h3 className="tl__title">
                    <span className="sr-only">
                      {m.age ? `${m.age} ans — ` : 'Aujourd’hui — '}
                    </span>
                    <span className="tl__mask">
                      <span className="tl__mask-inner">{m.title}</span>
                    </span>
                  </h3>
                  <p className="tl__text">
                    <span className="tl__mask">
                      <span className="tl__mask-inner">{m.text}</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
