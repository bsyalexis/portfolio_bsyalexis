import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs Mariage 2026-2027',
  description:
    'Reportage photo de mariage à Saint-Étienne, Lyon et dans le Beaujolais : trois formules, de la cérémonie seule à la journée complète.',
  robots: {
    index: false,
    follow: false,
  },
}

const css = `
        .tarifs-mariage {
          /* Palette mariage, d'après le moodboard Pantone :
             14-4122 Airy Blue · 13-1318 Tropical Peach
             16-1257 Sun Orange · 18-0416 Terrarium Moss */
          --creme:       #FCF7F1;  /* fond papier */
          --sable:       #FBEEE4;  /* surface des cartes, pêche très pâle */
          --sable-fonce: #E6E9DD;  /* bandeau, Terrarium Moss très éclairci */
          --lin:         #D3D9C6;  /* filets sur bandeau sauge */
          --lin-clair:   #F2DECF;  /* filets sur pêche */
          --encre:       #333B27;  /* Terrarium Moss assombri, remplace le noir */
          --rouge:       #C4551F;  /* Sun Orange profond, texte accentué */
          --orange:      #E4713A;  /* Sun Orange, traits et marques */
          --terre:       #8A7466;  /* texte secondaire, taupe rosé */
        }

        /* Le fond crème est posé sur le body pour couvrir aussi la zone de
           rebond du défilement, plus clair que le #f8f6f2 du reste du site. */
        body {
          background:
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.055'/></svg>") repeat,
            #FCF7F1;
        }

        /* Page-document : la barre de navigation du site est masquée, la
           feuille porte déjà son propre en-tête et le lien vers le portfolio
           est en pied de page. La règle vise le body plutôt qu'une classe
           posée sur la barre : le composant est monté par le gabarit racine,
           qu'une page ne peut pas remplacer. */
        body:has(.tarifs-mariage) .nav { display: none; }

        .tarifs-mariage {
          color: var(--encre);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          padding: 72px 20px 80px;
        }

        .tarifs-mariage .tm-sheet {
          width: 100%;
          max-width: 940px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 44px;
        }

        /* ── Label signature : trait orange + surtitre ── */
        .tm-sheet .tm-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--rouge);
        }
        .tm-sheet .tm-label::before {
          content: "";
          width: 20px;
          height: 2px;
          background: var(--orange);
          flex: none;
        }
        .tm-sheet .tm-label.tm-mute { color: var(--terre); }

        /* ── En-tête ── */
        .tm-sheet header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--lin-clair);
        }
        .tm-sheet .tm-logotype {
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -.02em;
          line-height: .9;
          font-size: 26px;
        }
        .tm-sheet .tm-logotype .tm-nom    { color: var(--rouge); display: block; }
        .tm-sheet .tm-logotype .tm-prenom { display: block; }
        .tm-sheet .tm-metier {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--terre);
          margin-top: 10px;
        }
        .tm-sheet .tm-header-right { text-align: right; }
        .tm-sheet .tm-header-right .tm-date {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--rouge);
        }
        .tm-sheet .tm-header-right .tm-lieu {
          font-size: 13px;
          color: var(--terre);
          margin-top: 6px;
          max-width: 230px;
          margin-left: auto;
        }

        /* ── Accroche ── */
        .tm-sheet .tm-hero { display: flex; flex-direction: column; gap: 18px; }
        .tm-sheet h1 {
          font-size: clamp(34px, 6vw, 58px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -.035em;
          line-height: .95;
          text-wrap: balance;
          max-width: 17ch;
        }
        .tm-sheet h1 em { font-style: normal; color: var(--rouge); }
        .tm-sheet .tm-chapo {
          font-size: 16px;
          line-height: 1.6;
          color: var(--terre);
          max-width: 64ch;
        }
        .tm-sheet .tm-chapo strong { color: var(--encre); font-weight: 600; }

        /* ── Formules ── */
        .tm-sheet .tm-formules {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: stretch;
        }
        .tm-sheet .tm-carte {
          background: var(--sable);
          border: 1px solid var(--lin-clair);
          border-radius: 12px;
          padding: 26px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        @media (hover: hover) {
          .tm-sheet .tm-carte:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(51, 59, 39, .07);
          }
        }
        .tm-sheet .tm-duree {
          /* Deux lignes réservées d'office : sans ça, la formule dont la
             durée tient sur une seule ligne remonte son titre et son prix
             de 15px par rapport aux deux autres. */
          min-height: 2.2em;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--terre);
        }
        .tm-sheet .tm-nom-formule {
          font-size: 22px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -.02em;
          line-height: 1;
          margin-top: 6px;
        }
        .tm-sheet .tm-prix {
          font-size: 38px;
          font-weight: 900;
          letter-spacing: -.04em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .tm-sheet .tm-prix span { font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
        .tm-sheet .tm-carte hr {
          border: none;
          border-top: 1px solid var(--lin-clair);
        }
        .tm-sheet ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .tm-sheet li {
          font-size: 14px;
          line-height: 1.45;
          padding-left: 16px;
          position: relative;
        }
        .tm-sheet li::before {
          content: "";
          position: absolute;
          left: 0;
          top: .62em;
          width: 6px;
          height: 1px;
          background: var(--orange);
        }
        .tm-sheet .tm-livrees {
          padding-top: 16px;
          border-top: 1px solid var(--lin-clair);
          font-size: 13px;
          color: var(--terre);
          margin-top: auto;
        }
        .tm-sheet .tm-livrees b { color: var(--encre); font-weight: 800; }

        /* ── Blocs ── */
        .tm-sheet .tm-bloc { display: flex; flex-direction: column; gap: 18px; }

        /* ── Bande « toujours inclus » ── */
        .tm-sheet .tm-inclus {
          background: var(--sable-fonce);
          border: 1px solid var(--lin);
          border-radius: 12px;
          padding: 32px 34px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tm-sheet .tm-inclus h2 {
          font-size: 26px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -.03em;
          line-height: 1;
        }
        .tm-sheet .tm-inclus h2 em { font-style: normal; color: var(--rouge); }
        .tm-sheet .tm-inclus ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px 40px;
        }

        /* ── Pied ── */
        .tm-sheet footer {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 40px;
          padding-top: 28px;
          border-top: 1px solid var(--lin-clair);
        }
        .tm-sheet .tm-conditions p {
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--terre);
          margin-bottom: 7px;
        }
        .tm-sheet .tm-conditions p b { color: var(--encre); font-weight: 600; }
        .tm-sheet .tm-contact { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
        .tm-sheet .tm-contact .tm-ligne { font-size: 14px; font-weight: 600; }
        .tm-sheet .tm-contact .tm-ligne small {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--terre);
          margin-bottom: 3px;
        }
        .tm-sheet .tm-contact a {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid var(--lin-clair);
          transition: color .25s ease, border-color .25s ease;
        }
        .tm-sheet .tm-contact a:hover { color: var(--rouge); border-color: var(--orange); }
        .tm-sheet .tm-mentions {
          grid-column: 1 / -1;
          font-size: 10.5px;
          line-height: 1.55;
          color: var(--terre);
          padding-top: 18px;
          border-top: 1px solid var(--lin-clair);
        }

        /* ── Apparition ──
           Conditionnée à .js : sans JavaScript la classe n'est jamais posée
           et la feuille reste entièrement lisible. */
        .js .tarifs-mariage .tm-sheet > * {
          opacity: 0;
          transform: translateY(14px);
          animation: tm-mariage-monte .7s cubic-bezier(.16, 1, .3, 1) forwards;
        }
        .js .tarifs-mariage .tm-sheet > *:nth-child(2) { animation-delay: .06s; }
        .js .tarifs-mariage .tm-sheet > *:nth-child(3) { animation-delay: .12s; }
        .js .tarifs-mariage .tm-sheet > *:nth-child(4) { animation-delay: .18s; }
        .js .tarifs-mariage .tm-sheet > *:nth-child(5) { animation-delay: .24s; }
        @keyframes tm-mariage-monte {
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .js .tarifs-mariage .tm-sheet > * { opacity: 1; transform: none; animation: none; }
          .tm-sheet .tm-carte:hover { transform: none; }
        }

        @media (max-width: 820px) {
          .tm-sheet .tm-formules   { grid-template-columns: 1fr; }
          .tm-sheet .tm-inclus ul  { grid-template-columns: 1fr; }
          .tm-sheet footer      { grid-template-columns: 1fr; gap: 28px; }
          .tm-sheet header      { flex-direction: column; align-items: flex-start; }
          .tm-sheet .tm-header-right      { text-align: left; }
          .tm-sheet .tm-header-right .tm-lieu { margin-left: 0; }
          .tarifs-mariage    { padding-top: 44px; }
          .tm-sheet .tm-inclus     { padding: 26px 22px; }
        }

        @media print {
          .nav, .mailpill, .scroll-progress { display: none !important; }
          body { background: #fff; }
          .tarifs-mariage { padding: 0; }
          .tm-sheet .tm-carte, .tm-sheet .tm-inclus { break-inside: avoid; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `

export default function TarifsMariagePage() {
  return (
    <>
      {/* Document autonome : toute la feuille de style est portée par la page
          et chaque sélecteur est ancré sur .tm-sheet, sinon les règles génériques
          (header, footer, h1, ul) repeindraient la barre de navigation du
          gabarit, qui est elle aussi un <header>. */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="tarifs-mariage">
        <div className="tm-sheet">

          <header>
            <div>
              <div className="tm-logotype">
                <span className="tm-prenom">Alexis</span>
                <span className="tm-nom">Bossy</span>
              </div>
              <div className="tm-metier">Photographe · Vidéaste</div>
            </div>
            <div className="tm-header-right">
              <div className="tm-date">Mariage · Tarifs 2026-2027</div>
              <div className="tm-lieu">Saint-Étienne, Lyon, Beaujolais et alentours</div>
            </div>
          </header>

          <section className="tm-hero">
            <h1>Votre journée, racontée en <em>reportage</em></h1>
            <p className="tm-chapo">
              Je viens du sport : j&apos;ai appris à photographier ce qui ne se rejoue pas.
              Pas de longues séances de poses, pas de mise en scène qui fige tout le monde
              pendant deux heures. <strong>Je capte les regards, les gestes et les fous rires
              au moment où ils arrivent.</strong> Les moments qui comptent, la cérémonie, les photos
              de groupe et la séance de couple, sont évidemment photographiés comme il faut.
              Vous restez avec vos invités, je fais le reste.
            </p>
          </section>

          <section className="tm-bloc">
            <div className="tm-label">Les trois formules</div>
            <div className="tm-formules">

              <article className="tm-carte">
                <div>
                  <div className="tm-duree">4 heures · cérémonie et photos de groupe</div>
                  <h3 className="tm-nom-formule">L&apos;essentiel</h3>
                </div>
                <div className="tm-prix">600 <span>€</span></div>
                <hr />
                <ul>
                  <li>Cérémonie civile et/ou religieuse</li>
                  <li>Photos de groupe, famille et amis</li>
                  <li>Séance de couple sur le lieu</li>
                </ul>
                <div className="tm-livrees"><b>100 à 150 photos</b> livrées</div>
              </article>

              <article className="tm-carte">
                <div>
                  <div className="tm-duree">8 heures · jusqu&apos;au vin d&apos;honneur</div>
                  <h3 className="tm-nom-formule">La journée</h3>
                </div>
                <div className="tm-prix">1 100 <span>€</span></div>
                <hr />
                <ul>
                  <li>Cérémonie civile et/ou religieuse</li>
                  <li>Photos de groupe, famille et amis</li>
                  <li>Séance de couple à l&apos;heure dorée</li>
                  <li>Vin d&apos;honneur</li>
                </ul>
                <div className="tm-livrees"><b>200 à 300 photos</b> livrées</div>
              </article>

              <article className="tm-carte">
                <div>
                  <div className="tm-duree">12 heures · des préparatifs à la soirée</div>
                  <h3 className="tm-nom-formule">Intégrale</h3>
                </div>
                <div className="tm-prix">1 600 <span>€</span></div>
                <hr />
                <ul>
                  <li>Préparatifs des deux mariés</li>
                  <li>Cérémonie civile et/ou religieuse</li>
                  <li>Photos de groupe, famille et amis</li>
                  <li>Séance de couple à l&apos;heure dorée</li>
                  <li>Vin d&apos;honneur, repas et discours</li>
                  <li>Ouverture de bal et pièce montée</li>
                </ul>
                <div className="tm-livrees"><b>350 à 500 photos</b> livrées</div>
              </article>

            </div>
          </section>

          <section className="tm-inclus">
            <div className="tm-label">Quelle que soit la formule</div>
            <h2>Toujours <em>inclus</em></h2>
            <ul>
              <li>Un point téléphonique avant le jour J pour caler le déroulé</li>
              <li>Livraison de vos photos sous 72 heures</li>
              <li>Traitement couleur et lumière sur l&apos;intégralité des photos livrées</li>
              <li>Retouche fine sur une sélection d&apos;une cinquantaine d&apos;images</li>
              <li>Galerie privée en ligne pendant un mois, partageable avec vos invités</li>
              <li>Téléchargement illimité en haute définition, pour vous et votre famille</li>
              <li>Mise à disposition des photos sur clé USB</li>
            </ul>
          </section>

          <footer>
            <div className="tm-conditions">
              <div className="tm-label tm-mute" style={{ marginBottom: '14px' }}>Conditions</div>
              <p><b>Réservation</b> : la date est bloquée à réception du contrat signé et d&apos;un acompte de 30 %. Le solde est réglé dans les 30 jours qui suivent le mariage.</p>
              <p><b>Photos livrées</b> : les fourchettes indiquées correspondent à une sélection resserrée, les doublons, les yeux fermés et les images ratées sont écartés. Mieux vaut 300 photos que vous regarderez que 800 que vous ne rouvrirez jamais.</p>
              <p><b>Repas</b> : un repas est prévu par vos soins au-delà de huit heures de présence.</p>
              <p><b>Déplacement</b> : 80 km autour de Saint-Étienne.</p>
              <p><b>Images</b> : je peux utiliser quelques photos pour mon portfolio mariage, je ne les publie pas sur les réseaux sociaux. Vous restez responsables des autorisations de droit à l&apos;image de vos invités.</p>
            </div>
            <div className="tm-contact">
              <div className="tm-label tm-mute" style={{ marginBottom: '4px' }}>Parlons-en</div>
              <div className="tm-ligne">
                <small>E-mail</small>
                <a href="mailto:contact@alexbsy.fr">contact@alexbsy.fr</a>
              </div>
              <div className="tm-ligne">
                <small>Téléphone</small>
                <a href="tel:+33652497182">06 52 49 71 82</a>
              </div>
              <div className="tm-ligne">
                <small>Instagram</small>
                <a href="https://www.instagram.com/alexbsy_" target="_blank" rel="noopener noreferrer">@alexbsy_</a>
              </div>
              <div className="tm-ligne">
                <small>Portfolio</small>
                <a href="https://alexbsy.com">alexbsy.com</a>
              </div>
            </div>
            <div className="tm-mentions">
              EI Alexis BOSSY · nom commercial alexbsy · SIRET 907 598 676 00027 · Activités photographiques (code APE 7420Z) · TVA non applicable, art. 293 B du CGI · Document non contractuel, valant proposition tarifaire.
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}
