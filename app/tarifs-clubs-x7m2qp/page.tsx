import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs Clubs',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TarifsClubsPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --rouge: #E3112D;
          --noir: #0D0D0D;
          --blanc: #F2F2F0;
          --gris: #888787;
          --surface: #141414;
          --surface2: #1C1C1C;
          --border: rgba(255,255,255,0.07);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--noir);
          color: var(--blanc);
          line-height: 1.5;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        .cover {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          padding: 64px 56px;
        }

        .cover-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 5px;
          background: linear-gradient(to bottom, #e5956b, #d75348, #c12e33);
          z-index: 10;
        }

        .cover::after {
          content: '';
          position: absolute;
          top: -10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(229,149,107,0.12) 0%, rgba(215,83,72,0.06) 50%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .cover-top { position: relative; z-index: 2; }
        .cover-bottom { position: relative; z-index: 2; align-self: flex-end; text-align: right; }

        .logotype {
          font-size: clamp(52px, 8vw, 112px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          line-height: 0.88;
        }

        .logotype .prenom { color: var(--blanc); display: block; }
        .logotype .nom { color: var(--rouge); display: block; }

        .logo-sub {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gris);
          margin-top: 20px;
        }

        .cover-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .cover-label-line {
          width: 24px;
          height: 2px;
          background: linear-gradient(to right, #e5956b, #c12e33);
          flex-shrink: 0;
        }

        .cover-label span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--rouge);
        }

        .cover-title {
          font-size: clamp(36px, 6vw, 88px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.88;
          color: var(--blanc);
          margin-bottom: 24px;
        }

        .cover-title em { font-style: normal; color: var(--rouge); }

        .cover-meta { display: flex; flex-direction: column; gap: 8px; }

        .cover-meta-item {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gris);
        }

        .cover-contact {
          font-size: 11px;
          font-weight: 500;
          color: var(--gris);
          padding-top: 24px;
          border-top: 1px solid var(--border);
          margin-top: 32px;
        }

        .cover-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.4;
        }

        .page {
          padding: 64px 80px;
          position: relative;
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border);
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
        }

        .page-brand {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #333;
        }

        .page-handle {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--rouge);
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .section-label-line {
          width: 22px;
          height: 2px;
          background: linear-gradient(to right, #e5956b, #c12e33);
          flex-shrink: 0;
        }

        .section-label-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--rouge);
        }

        .section-title {
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          line-height: 0.92;
          color: var(--blanc);
          margin-bottom: 40px;
        }

        .section-title em { font-style: normal; color: var(--rouge); }

        .cards {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .card {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 24px;
          padding: 20px 24px;
          background: var(--surface);
          border-radius: 10px;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .card.featured {
          background: var(--surface2);
          border-color: rgba(227,17,45,0.2);
        }

        .card.featured::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #e5956b, #c12e33);
        }

        .card-left { padding-left: 4px; }
        .card.featured .card-left { padding-left: 16px; }

        .card-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--blanc);
          margin-bottom: 4px;
        }

        .card-livrable {
          font-size: 12px;
          font-weight: 400;
          color: var(--gris);
          margin-bottom: 10px;
        }

        .card-tags {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          color: #fff;
        }

        .tag-photo { background: #5B2D8E; }
        .tag-video { background: #C0392B; }
        .tag-graphisme { background: #1A6B8A; }
        .tag-pack { background: #B7700D; }
        .tag-mois { background: #333; color: #888; }

        .card-right { text-align: right; flex-shrink: 0; }

        .card-prix {
          font-size: 36px;
          font-weight: 900;
          color: var(--blanc);
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .card-prix-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--gris);
          margin-top: 2px;
        }

        .note {
          margin-top: 16px;
          padding: 14px 20px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 12px;
          color: var(--gris);
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          flex: 1;
        }

        .conditions {
          padding: 28px 32px;
          background: var(--surface);
          border-radius: 12px;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .conditions::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #e5956b, #c12e33);
        }

        .conditions-title {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--rouge);
          margin-bottom: 16px;
          padding-left: 12px;
        }

        .conditions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 12px;
        }

        .conditions-item {
          font-size: 12px;
          font-weight: 400;
          color: var(--gris);
          line-height: 1.5;
        }

        .surmesure-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.07);
        }

        .surmesure-bar {
          width: 3px;
          height: 32px;
          background: #E3112D;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .surmesure-title {
          font-size: 12px;
          font-weight: 700;
          color: #F2F2F0;
          margin-bottom: 2px;
        }

        .surmesure-desc { font-size: 11px; color: #888787; }

        .page-num {
          text-align: center;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #2A2A2A;
          margin-top: 48px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cover-left > * { animation: fadeUp 0.7s ease both; }
        .cover-left > *:nth-child(1) { animation-delay: 0.0s; }
        .cover-left > *:nth-child(2) { animation-delay: 0.15s; }
        .cover-right > * { animation: fadeUp 0.7s ease both; }
        .cover-right > *:nth-child(1) { animation-delay: 0.25s; }
        .cover-right > *:nth-child(2) { animation-delay: 0.35s; }
        .cover-right > *:nth-child(3) { animation-delay: 0.45s; }
        .cards .card { animation: fadeUp 0.5s ease both; }
        .cards .card:nth-child(1) { animation-delay: 0.05s; }
        .cards .card:nth-child(2) { animation-delay: 0.1s; }
        .cards .card:nth-child(3) { animation-delay: 0.15s; }
        .cards .card:nth-child(4) { animation-delay: 0.2s; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .cover { padding: 40px 24px; }

          .page { padding: 48px 24px; }

          .page-header { margin-bottom: 32px; }
          .page-brand { display: none; }

          .two-col {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .card {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .card-right { text-align: left; }
          .card-prix { font-size: 28px; }
        }

        @media (max-width: 480px) {
          .cover { padding: 28px 20px; }
          .page { padding: 40px 20px; }
          .section-title { font-size: clamp(24px, 8vw, 36px); margin-bottom: 24px; }
          .card { padding: 16px 18px; }
          .card-name { font-size: 14px; }
          .conditions { padding: 20px 20px; }
        }

        @media print {
          body::before { display: none; }
          .cover-grid { display: none; }
          .page, .cover { page-break-after: always; min-height: 100vh; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* COVER */}
      <div className="cover">
        <div className="cover-accent"></div>
        <div className="cover-grid"></div>
        <div className="cover-top">
          <div className="logotype">
            <span className="prenom">Alexis</span>
            <span className="nom">Bossy</span>
          </div>
          <div className="logo-sub">Photographe · Vidéaste</div>
        </div>
        <div className="cover-bottom">
          <div className="cover-label">
            <div className="cover-label-line"></div>
            <span>Document commercial · Juin 2026</span>
          </div>
          <div className="cover-title">Grille<br /><em>Tarifaire</em></div>
          <div className="cover-meta">
            <div className="cover-meta-item">Clubs Sportifs</div>
          </div>
          <div className="cover-contact">
            bsy.alexis@gmail.com &nbsp;·&nbsp; @alexbsy_ &nbsp;·&nbsp; alexbsy.com &nbsp;·&nbsp; Saint-Étienne / Lyon
          </div>
        </div>
      </div>

      {/* PAGE 2 — À l'unité */}
      <div className="page">
        <div className="page-header">
          <span className="page-brand">Alexis Bossy · Grille Tarifaire · Juin 2026</span>
          <span className="page-handle">@alexbsy_</span>
        </div>
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">À l&apos;unité</span>
        </div>
        <div className="section-title">Prestations <em>À l&apos;Unité</em></div>
        <div className="cards">
          <div className="card">
            <div className="card-left">
              <div className="card-name">Couverture match</div>
              <div className="card-livrable">2h sur site · 30 photos retouchées · livraison 24h</div>
              <div className="card-tags"><span className="tag tag-photo">Photo</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">100 €</div>
              <div className="card-prix-label">à l&apos;unité</div>
            </div>
          </div>

          <div className="card">
            <div className="card-left">
              <div className="card-name">Reel à l&apos;unité</div>
              <div className="card-livrable">Tournage + montage · 30-60s vertical · musique incluse</div>
              <div className="card-tags"><span className="tag tag-video">Vidéo</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">120 €</div>
              <div className="card-prix-label">à l&apos;unité</div>
            </div>
          </div>

          <div className="card">
            <div className="card-left">
              <div className="card-name">Visuel match / événement</div>
              <div className="card-livrable">1 format réseaux · livraison 24-48h</div>
              <div className="card-tags"><span className="tag tag-graphisme">Graphisme</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">50 €</div>
              <div className="card-prix-label">à l&apos;unité</div>
            </div>
          </div>

          <div className="card">
            <div className="card-left">
              <div className="card-name">Pack déclinaisons visuel</div>
              <div className="card-livrable">Post + story + bannière · même visuel 3 formats</div>
              <div className="card-tags"><span className="tag tag-graphisme">Graphisme</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">100 €</div>
              <div className="card-prix-label">à l&apos;unité</div>
            </div>
          </div>
        </div>
        <div className="page-num">2 / 4</div>
      </div>

      {/* PAGE 3 — Packs mensuels */}
      <div className="page">
        <div className="page-header">
          <span className="page-brand">Alexis Bossy · Grille Tarifaire · Juin 2026</span>
          <span className="page-handle">@alexbsy_</span>
        </div>
        <div className="section-label">
          <div className="section-label-line"></div>
          <span className="section-label-text">Abonnements</span>
        </div>
        <div className="section-title">Packs <em>Mensuels</em></div>
        <div className="cards">
          <div className="card">
            <div className="card-left">
              <div className="card-name">Visuel only · 4 visuels/mois</div>
              <div className="card-livrable">4 visuels réseaux · résultats, annonces · gabarits réutilisables</div>
              <div className="card-tags"><span className="tag tag-pack">Pack</span><span className="tag tag-mois">/mois</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">90 €</div>
              <div className="card-prix-label">par mois</div>
            </div>
          </div>

          <div className="card">
            <div className="card-left">
              <div className="card-name">Visuel only · 8 visuels/mois</div>
              <div className="card-livrable">8 visuels · 1-2 posts/semaine · livraison continue</div>
              <div className="card-tags"><span className="tag tag-pack">Pack</span><span className="tag tag-mois">/mois</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">175 €</div>
              <div className="card-prix-label">par mois</div>
            </div>
          </div>

          <div className="card featured">
            <div className="card-left">
              <div className="card-name">Pack club · 4 visuels</div>
              <div className="card-livrable">1 couverture match · 30 photos · 4 visuels réseaux</div>
              <div className="card-tags"><span className="tag tag-pack">Pack</span><span className="tag tag-mois">/mois</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">225 €</div>
              <div className="card-prix-label">par mois</div>
            </div>
          </div>

          <div className="card featured">
            <div className="card-left">
              <div className="card-name">Pack club · 8 visuels</div>
              <div className="card-livrable">1 couverture match · 30 photos · 8 visuels · tout géré</div>
              <div className="card-tags"><span className="tag tag-pack">Pack</span><span className="tag tag-mois">/mois</span></div>
            </div>
            <div className="card-right">
              <div className="card-prix">315 €</div>
              <div className="card-prix-label">par mois</div>
            </div>
          </div>
        </div>

        <div className="page-num">3 / 4</div>
      </div>

      {/* PAGE 4 — Sur-mesure & Conditions */}
      <div className="page">
        <div className="page-header">
          <span className="page-brand">Alexis Bossy · Grille Tarifaire · Juin 2026</span>
          <span className="page-handle">@alexbsy_</span>
        </div>
        <div className="two-col">
          <div>
            <div className="section-label">
              <div className="section-label-line"></div>
              <span className="section-label-text">Sur-mesure</span>
            </div>
            <div className="section-title" style={{fontSize:'36px', marginBottom:'28px'}}>Une autre <em>Demande ?</em></div>
            <div className="card featured" style={{flexDirection:'column', alignItems:'flex-start', gap:'20px', height:'auto'}}>
              <div className="card-left" style={{paddingLeft:'16px', width:'100%'}}>
                <div className="card-name" style={{fontSize:'14px', marginBottom:'10px'}}>
                  Si votre besoin n&apos;est pas dans ces offres, on peut en parler.
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'8px', marginTop:'16px', width:'100%'}}>
                  <div className="surmesure-item">
                    <div className="surmesure-bar"></div>
                    <div>
                      <div className="surmesure-title">Pack de Reels</div>
                      <div className="surmesure-desc">Plusieurs vidéos courtes par mois</div>
                    </div>
                  </div>
                  <div className="surmesure-item">
                    <div className="surmesure-bar"></div>
                    <div>
                      <div className="surmesure-title">Plus de photos</div>
                      <div className="surmesure-desc">Volume adapté à vos besoins</div>
                    </div>
                  </div>
                  <div className="surmesure-item">
                    <div className="surmesure-bar"></div>
                    <div>
                      <div className="surmesure-title">Plusieurs visuels réseaux au mois</div>
                      <div className="surmesure-desc">Fréquence et formats selon votre calendrier</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="section-label">
              <div className="section-label-line"></div>
              <span className="section-label-text">Conditions</span>
            </div>
            <div className="section-title" style={{fontSize:'36px', marginBottom:'28px'}}>Infos <em>Pratiques</em></div>
            <div className="conditions">
              <div className="conditions-title">Conditions</div>
              <div className="conditions-list">
                <div className="conditions-item">
                  Déplacements inclus dans un rayon de 30 km autour de Saint-Étienne / Lyon · Au-delà : 0,35 €/km
                </div>

                <div className="conditions-item">
                  bsy.alexis@gmail.com · @alexbsy_
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-num">4 / 4</div>
      </div>
    </>
  )
}
