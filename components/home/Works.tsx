import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import projets from '@/data/projets.json'

const CATEGORIES: Record<string, string> = {
  photo:         'Photographie',
  video:         'Vidéo',
  'video-photo': 'Vidéo & photographie',
  autres:        'Direction artistique',
}

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
}

/* Les metaDescription sont préfixées « Catégorie · Client · Année — ».
   On ne garde que la phrase, le préfixe est déjà affiché à côté. */
function lead(p: Projet): string {
  if (p.galleryText) return p.galleryText
  const meta = p.metaDescription ?? ''
  const dash = meta.indexOf('—')
  return dash === -1 ? meta : meta.slice(dash + 1).trim()
}

function label(p: Projet): string {
  return CATEGORIES[p.category] ?? p.category
}

export default function Works() {
  const featured = (projets as Projet[]).filter((p) => (p as Projet & { featured?: boolean }).featured)

  /* Le projet mis en avant est le premier qui dispose d'assez d'images pour
     remplir le collage. Choisir bêtement le premier de la liste donnerait un
     bloc large avec une seule image répétée dès qu'Alexis réordonne ses
     projets ou en ajoute un sans galerie. */
  const hero = featured.find((p) => (p.galleryImages?.length ?? 0) >= 6) ?? featured[0]
  const rest = featured.filter((p) => p.slug !== hero?.slug)

  if (!hero) return null

  const collage = (hero.galleryImages ?? [hero.cover].filter(Boolean) as string[]).slice(0, 6)

  return (
    <section id="travaux" className="works">
      <header className="works__head">
        <span className="works__eyebrow">
          <span className="works__eyebrow-dash" aria-hidden="true" />
          Projets à la une
        </span>
        <Link href="/travaux" className="works__all" data-cursor="TOUT VOIR">
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
              data-cursor="VOIR"
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
          <Link href={`/projet/${hero.slug}`} className="works__cta" data-cursor="OUVRIR">
            Voir le projet
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>

      {/* ── Les autres projets ── */}
      <div className="works__grid">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={`/projet/${p.slug}`}
            className="works__item"
            data-cursor="VOIR"
          >
            <div className="works__item-media">
              {p.coverVideo ? (
                <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
                  <source src={p.coverVideo} type="video/webm" />
                </video>
              ) : (
                <img src={p.cover} alt="" loading="lazy" decoding="async" />
              )}
            </div>
            <div className="works__item-meta">
              <span className="works__item-client">{p.client}</span>
              <h4 className="works__item-title">{p.title}</h4>
              <span className="works__item-cat">{label(p)} · {p.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
