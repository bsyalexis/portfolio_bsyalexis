import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import projets from '@/data/projets.json'

const CATEGORIES: Record<string, string> = {
  photo:         'Photographie',
  video:         'Vidéo',
  'video-photo': 'Vidéo & photographie',
  autres:        'Direction artistique',
}

interface Chapitre { text?: string; body?: string }

interface Projet {
  slug: string
  title: string
  client: string
  category: string
  year: string
  cover?: string
  coverVideo?: string
  galleryText?: string
  galleryImages?: string[]
  metaDescription?: string
  chapters?: Chapitre[]
  homeHero?: boolean
}

/* Description d'un projet, par ordre de préférence : le texte de galerie,
   puis la metaDescription débarrassée de son préfixe « Catégorie · Client ·
   Année — », puis le premier chapitre. Trois des sept projets n'ont pas de
   galleryText — sans cette cascade, leur carte serait muette. */
function lead(p: Projet): string {
  if (p.galleryText) return p.galleryText

  const meta = p.metaDescription ?? ''
  if (meta) {
    const dash = meta.indexOf('—')
    return dash === -1 ? meta : meta.slice(dash + 1).trim()
  }

  const chap = p.chapters?.[0]
  return (chap?.text ?? chap?.body ?? '').trim()
}

function label(p: Projet): string {
  return CATEGORIES[p.category] ?? p.category
}

export default function Works() {
  const featured = (projets as Projet[]).filter((p) => (p as Projet & { featured?: boolean }).featured)

  /* Le projet du collage se déclare par `homeHero`. Sans ce drapeau, l'ordre
     du fichier décidait à la fois du classement de /travaux et du choix du
     hero : remonter un projet récent en tête de /travaux le propulsait hero
     de l'accueil sans qu'on l'ait demandé. Les deux réglages sont désormais
     indépendants.
     Repli inchangé : le premier projet ayant assez d'images pour remplir le
     collage, faute de quoi un bloc large répéterait une seule image. */
  const hero =
    featured.find((p) => p.homeHero) ??
    featured.find((p) => (p.galleryImages?.length ?? 0) >= 6) ??
    featured[0]

  /* Cinq cartes, dans l'ordre du fichier — qui est l'ordre d'ajout, donc du
     plus récent au plus ancien. Le reste du catalogue est accessible par
     « Tous les projets ». */
  const rest = featured.filter((p) => p.slug !== hero?.slug).slice(0, 5)

  if (!hero) return null

  const collage = (hero.galleryImages ?? [hero.cover].filter(Boolean) as string[]).slice(0, 6)

  return (
    <section id="travaux" className="works">
      <header className="works__head">
        <span className="works__eyebrow">
          <span className="works__eyebrow-dash" aria-hidden="true" />
          Projets à la une
        </span>
        <Link href="/travaux" className="works__all">
          Tous les projets
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      {/* ── Projet mis en avant ── */}
      <article className="works__card works__card--wide">
        <p className="works__tag">
          <span className="works__dot" aria-hidden="true" />
          {hero.client} · {label(hero)} · {hero.year}
        </p>

        <div className="works__collage">
          {collage.map((src, i) => (
            <Link
              key={src}
              href={`/projet/${hero.slug}`}
              className="works__asset"
              aria-label={i === 0 ? `Voir le projet ${hero.title}` : undefined}
              aria-hidden={i === 0 ? undefined : true}
              tabIndex={i === 0 ? undefined : -1}
            >
              <img src={src} alt="" loading="lazy" decoding="async" />
            </Link>
          ))}
        </div>

        <div className="works__text">
          <Reveal as="h3" split className="works__title" stagger={0.04}>
            {hero.title}
          </Reveal>
          <p className="works__lead">{lead(hero)}</p>
          <Link href={`/projet/${hero.slug}`} className="works__cta">
            Voir le projet
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>

      {/* ── Les cinq projets suivants, en tailles inégales ──
          Le texte passe sur l'image plutôt qu'en dessous : les cartes sont
          d'abord des visuels, la légende ne fait que les nommer. */}
      <div className="works__grid">
        {rest.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projet/${p.slug}`}
            className={`works__item works__item--${i + 1}`}
          >
            <div className="works__item-media">
              {p.coverVideo ? (
                /* poster : image d'attente le temps que la boucle arrive, et
                   repli si le navigateur ne décode pas le format.
                   type déduit de l'extension — la grille mélange .webm et
                   .mp4 selon la source disponible. */
                <video
                  autoPlay muted loop playsInline preload="metadata" aria-hidden="true"
                  poster={p.cover}
                >
                  <source
                    src={p.coverVideo}
                    type={p.coverVideo.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
                  />
                </video>
              ) : (
                <img src={p.cover} alt="" loading="lazy" decoding="async" />
              )}
            </div>
            {/* Titre, type, année — rien de plus : ces cartes sont d'abord
                des visuels, la légende ne fait que les nommer. */}
            <div className="works__item-body">
              <h4 className="works__item-title">{p.title}</h4>
              <span className="works__item-cat">{label(p)} · {p.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
