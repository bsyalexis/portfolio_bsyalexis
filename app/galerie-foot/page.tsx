import type { Metadata } from 'next'

import galerie      from '@/data/galerie-foot.json'
import FootGalerie  from '@/components/foot/FootGalerie'
import FootVisuels  from '@/components/foot/FootVisuels'
import type { PhotoFoot }  from '@/components/foot/FootGalerie'
import type { VisuelFoot } from '@/components/foot/FootVisuels'
import Reveal       from '@/components/motion/Reveal'
import Footer       from '@/components/layout/Footer'

/* Page volontairement hors menu : l'adresse se partage par mail, elle n'a rien
   à faire dans un index de moteur de recherche. Même parti pris que les pages
   de tarifs. */
export const metadata: Metadata = {
  title:       'Football',
  description: 'Toutes mes photographies de football, tous clubs confondus.',
  robots:      { index: false, follow: false },
}

const photos  = galerie.photos as PhotoFoot[]
const visuels = galerie.visuels as VisuelFoot[]

const clubs = Array.from(new Set(photos.map((p) => p.club)))

const MAILTO =
  'mailto:contact@alexbsy.fr?subject=' +
  encodeURIComponent('Couverture photo du club') +
  '&body=' +
  encodeURIComponent('Bonjour Alexis,\n\nNous sommes le club ')

/* Chaque point renvoie à la partie qui le prouve : un club qui lit « visuels
   réseaux » doit pouvoir en voir un sans chercher. */
const offre = [
  {
    num:   '01',
    titre: 'Reportage de match',
    href:  '#galerie',
    texte:
      "Au bord du terrain sur toute la rencontre : les actions, les duels, le banc, les tribunes et ce qui se passe après le coup de sifflet. Photos triées et retouchées, livrées dans la foulée.",
  },
  {
    num:   '02',
    titre: 'Visuels pour vos réseaux',
    // Sans visuels en ligne, le point reste un texte : un lien vers une section
    // absente vaut moins que pas de lien.
    href:  visuels.length ? '#creation' : null,
    texte:
      "Compositions aux formats Instagram et Facebook à partir des photos du jour : compos, scores, joueur du match, annonces. Votre identité, pas un gabarit.",
  },
  {
    num:   '03',
    titre: 'Vidéo',
    href:  '#parlons-en',
    texte:
      "Résumés de match, teasers d'avant-rencontre et formats verticaux pour faire vivre la saison au-delà des 90 minutes.",
  },
]

export default function GalerieFootPage() {
  return (
    <main style={{ background: 'var(--bg)' }}>

      {/* ── Ouverture ──
          L'id « hero » commande la barre de navigation : sans lui elle se pose
          en version claire dès le premier pixel, illisible sur ce fond sombre. */}
      <section id="hero" className="fg-hero">
        <img
          className="fg-hero__media"
          src="/images/projets/st-ferre-coupe-haute-loire/A7401121.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className="fg-hero__inner">
          <Reveal>
            <span className="fg-label">Galerie</span>
          </Reveal>
          <Reveal as="h1" className="fg-title" split delay={0.05}>
            Football
          </Reveal>
          <Reveal delay={0.25}>
            <p className="fg-lead">
              Photographe, vidéaste et directeur artistique entre Lyon et Saint-Étienne.
              Voici ce que j&apos;ai fait sur le foot, en une seule page.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <a className="fg-cta" href={MAILTO}>
              Parler de votre saison <span aria-hidden="true">&rarr;</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Ce que le club reçoit ── */}
      <section className="fg-offre">
        {offre.map((bloc, i) => {
          const Carte = bloc.href ? 'a' : 'div'
          return (
            <Reveal key={bloc.num} delay={i * 0.08}>
              <Carte className="fg-card" href={bloc.href ?? undefined}>
                <span className="fg-card__num">{bloc.num}</span>
                <h2 className="fg-card__title">
                  {bloc.titre}
                  {bloc.href && <span className="fg-card__fleche" aria-hidden="true">&darr;</span>}
                </h2>
                <p className="fg-card__text">{bloc.texte}</p>
              </Carte>
            </Reveal>
          )
        })}
      </section>

      {/* ── La galerie ── */}
      <section id="galerie">
        <div className="fg-galerie-head">
          <Reveal>
            <span className="fg-label">Toutes les photos</span>
          </Reveal>
          <div className="fg-clubs">
            {clubs.map((club) => (
              <span key={club}>{club}</span>
            ))}
          </div>
        </div>

        <FootGalerie photos={photos} />
      </section>

      {/* ── Création visuelle ──
          Ne s'affiche que si le dossier des visuels contient quelque chose :
          une section vide vaudrait moins que pas de section du tout. */}
      {visuels.length > 0 && (
        <section className="fg-creation" id="creation">
          <Reveal className="fg-creation__head">
            <span className="fg-label">Création visuelle</span>
            <h2>Les photos ne s&apos;arrêtent pas à la galerie.</h2>
            <p>
              Affiches de match, résultats, compositions : je décline le reportage en
              visuels prêts à publier, aux couleurs du club et au format de ses
              réseaux. Les photos du dimanche deviennent la communication de la
              semaine.
            </p>
          </Reveal>
          <FootVisuels visuels={visuels} />
        </section>
      )}

      {/* ── Relance ── */}
      <section className="fg-final" id="parlons-en">
        <Reveal>
          <span className="fg-label">La suite</span>
          <h2>Et si c&apos;était votre club sur ces photos&nbsp;?</h2>
          <p>
            Un match, une phase finale ou une saison entière, en photo comme en vidéo :
            dites-moi ce que vous avez en tête, je vous réponds avec une proposition
            claire et un tarif.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <a className="fg-cta" href={MAILTO}>
            contact@alexbsy.fr <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
