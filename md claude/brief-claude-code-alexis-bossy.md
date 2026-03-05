# Brief — Portfolio Alexis Bossy
> Copie-colle ce fichier entier dans Claude Code pour démarrer le projet.

---

## 1. CONTEXTE

- **Client** : Alexis Bossy, Directeur Artistique chez Innolive
- **Objectif** : Portfolio freelance — trouver des missions auprès de marques premium, startups tech, agences créatives
- **Stack** : Next.js 14 (App Router) + Tailwind CSS + GSAP + Lenis (smooth scroll) + TypeScript
- **Hébergement** : Vercel
- **Contenu** : JSON files (pas de CMS)

---

## 2. SITEMAP

```
alexisbossy.com
│
├── / (Home — longue page scrollable)
│   ├── #hero
│   ├── #projets (grille 4 projets)
│   ├── #services
│   ├── #about
│   └── #contact (footer)
│
├── /travaux (grille complète avec filtres)
│   ├── ?filter=photo
│   ├── ?filter=video
│   └── ?filter=da
│
└── /projet/[slug] (page projet individuelle)
    ├── Hero visuel plein écran
    ├── Chapitre I — Le contexte
    ├── Chapitre II — La démarche
    └── Chapitre III — Le résultat
```

---

## 3. WIREFRAMES

### 3.1 — Page Home `/`

```
┌─────────────────────────────────────────────────────┐
│ NAV  sticky                                          │
│ [Alexis Bossy]    [Travaux] [Contact]  [● Disponible]│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ HERO                                   padding: 108px│
│                                                      │
│  VIDÉASTE · PHOTOGRAPHE · DA — INNOLIVE              │
│  (label tiny uppercase, dim)                         │
│                                                      │
│  Créer des                                           │
│  images qui          ← font-weight: 300, color: mid  │
│  restent.            ← font-weight: 700, color: cerise│
│                                                      │
│  [sous-titre 300 light]       [Voir les travaux ›]   │
│                               [Contact           ]   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ GRILLE PROJETS                                       │
│ gap: 3px, border-radius: 20px overflow hidden        │
│                                                      │
│ ┌──────┬──────────────────────────┐                  │
│ │      │  Projet 02 — 16:9        │                  │
│ │  01  │  (span col 2/4)          │                  │
│ │ 9:16 ├─────────────┬────────────┤                  │
│ │ tall │  Projet 03  │  Projet 04 │                  │
│ │      │  4:3        │  4:3       │                  │
│ └──────┴─────────────┴────────────┘                  │
│ [span-row: 1/3]                                      │
│ hover → barre rouge cerise 2px en top                │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ SERVICES                                             │
│                                                      │
│ ┌────────────────────┬───────────────────────┐       │
│ │ 01                 │ 02                    │       │
│ │ Vidéaste           │ Photographe           │       │
│ │ Films de marque... │ Corporate, produit... │       │
│ ├────────┬───────────┴──────┬────────────────┤       │
│ │Direction│ Communication  │ Webdesign│Graph.│       │
│ │Artisti. │ Stratégie vis. │Sites,if. │Id.v. │       │
│ └────────┴────────────────┴──────────┴───────┘       │
│ hover → trait rouge cerise 2px à gauche de la card  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ABOUT                   2 colonnes                   │
│                                                      │
│  ┌──────────┐   À PROPOS                             │
│  │          │   Alexis                               │
│  │ Portrait │   Bossy     ← 300 / 700                │
│  │  3/4     │                                        │
│  │          │   [bio 300 light]                      │
│  └──────────┘                                        │
│  trait cerise  [tag] [tag] [tag] [tag]               │
│  bas portrait                                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ FOOTER                  3 colonnes                   │
│                                                      │
│  Alexis Bossy      LinkedIn     contact@...          │
│  Directeur Artis.  Instagram    [● Disponible]       │
│                    Vimeo                             │
└─────────────────────────────────────────────────────┘
```

---

### 3.2 — Page Travaux `/travaux`

```
┌─────────────────────────────────────────────────────┐
│ NAV sticky (identique home)                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ HEADER PAGE                    padding-top: 80px     │
│                                                      │
│  Travaux                                             │
│  (titre 300 light, grand)                            │
│                                                      │
│  [Tous ▾]  [Photo]  [Vidéo]  [Direction Artistique] │
│  (filtres pills, actif = fond noir)                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ GRILLE PROJETS                                       │
│ grid 3 colonnes, gap 3px                             │
│ masonry-like: alternance de ratios                   │
│                                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                │
│  │ 16:9    │ │ 4:3     │ │ 9:16    │                │
│  ├─────────┤ │         │ ├─────────┤                │
│  │ 4:3     │ └─────────┘ │ 4:3    │                │
│  └─────────┘             └─────────┘                │
│                                                      │
│  hover: overlay sombre + nom du projet               │
└─────────────────────────────────────────────────────┘
```

---

### 3.3 — Page Projet `/projet/[slug]`

```
┌─────────────────────────────────────────────────────┐
│ HERO — visuel plein écran (100vh)                    │
│                                                      │
│  [image ou vidéo background]                         │
│                                                      │
│  ┌─────────────────────────────────┐                 │
│  │ PHOTO · 2024                    │                 │
│  │                                 │                 │
│  │ Nom du projet                   │                 │
│  │ Client — Contexte court         │                 │
│  └─────────────────────────────────┘                 │
│  (card glass en bas à gauche)                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ CHAPITRE I — Le contexte      padding: 120px         │
│                                                      │
│  I.          ← numéro cerise, tiny                   │
│  Le contexte ← titre 300 light                       │
│                                                      │
│  [texte descriptif, max-width: 640px]                │
│                                                      │
│  [visuel pleine largeur ou 2 colonnes]               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ CHAPITRE II — La démarche                            │
│ [idem structure]                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ CHAPITRE III — Le résultat                           │
│ [galerie finale]                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ NAVIGATION PROJET                                    │
│  ← Projet précédent        Projet suivant →          │
└─────────────────────────────────────────────────────┘
```

---

## 4. IDENTITÉ VISUELLE

### 4.1 Couleurs

```css
/* Backgrounds */
--bg:        #f8f6f2;   /* crème principal */
--bg-card:   #ffffff;   /* blanc pur pour les cards */

/* Texte */
--text:      #111010;   /* noir profond */
--text-mid:  #9a9590;   /* gris moyen — labels, sous-titres */
--text-dim:  #d0ccc8;   /* gris clair — eyebrows, placeholders */

/* Accent UNIQUE */
--accent:    #c0293a;   /* rouge cerise */
--accent-d:  #a01f2e;   /* cerise foncé — état hover */

/* UI */
--border:    rgba(0,0,0,0.07);
--shadow:    0 1px 20px rgba(0,0,0,0.06);
--shadow-h:  0 4px 32px rgba(0,0,0,0.10);
```

### 4.2 Typographie

```
Police : Inter (Google Fonts)
Weights utilisés : 300 · 400 · 500 · 600 · 700

Échelle :
- Hero title    : clamp(3.8rem, 8vw, 7rem) / weight 300 + 700
- Section title : 2.2rem / weight 300 + fort sur 1 mot
- About name    : 3.6rem / weight 300 + 700
- Body          : 0.88–0.95rem / weight 300
- Labels        : 0.6rem / weight 600 / uppercase / letterspacing 0.12em
- Nav / tags    : 0.7–0.75rem / weight 400–600

Règle typographique clé :
→ Dans chaque grand titre, 1 ou 2 mots en weight 300 (color: text-mid)
  + 1 mot fort en weight 700 (color: text OU color: accent)
  Exemple : "Créer des [images qui] RESTENT."
```

### 4.3 Espacement & Layout

```
Container max-width : 1100px (sections) / 1200px (grille projets)
Padding horizontal  : 56px desktop / 20px mobile
Section padding-top : 96–120px

Border-radius :
- Cards grandes   : 20px
- Cards petites   : 18px
- Pills / tags    : 100px (full)

Grid projets :
- Colonnes        : 0.5fr 1fr 1fr
- Rows            : 1fr 1fr
- Gap             : 3px
- Height          : 560px
- Projet 01 (9:16): grid-row: 1/3
- Projet 02 (16:9): grid-column: 2/4

Grid services :
- Main 2 cartes   : 1fr 1fr / gap 3px
- Small 4 cartes  : repeat(4, 1fr) / gap 3px
- Coins arrondis  : 18px 0 0 0 / 0 18px 0 0 / 0 0 0 18px / 0 0 18px 0
```

### 4.4 Interactions & Animations

```
Nav           : sticky, backdrop-filter blur(20px) + saturate
                border-bottom 1px, background crème à 88% opacité

Hover projets : barre cerise 2px en top, scaleX(0→1) depuis left, 0.3s ease
Hover services: trait cerise 2px à gauche (::before), opacity 0→1, 0.3s
Cards         : box-shadow light → shadow-h, background white, 0.25s

Scroll        : Lenis smooth scroll
Animations    : GSAP — entrées en fade+translateY au scroll (stagger)
Transitions   : pages avec opacity fade 0.3s

Barre de chargement : fine ligne cerise en top de page (progress scroll)
```

### 4.5 Composants UI récurrents

```
NAV PILL "Disponible" :
  - dot animé cerise (pulse 2.4s)
  - background: rgba(cerise, 0.06)
  - border: rgba(cerise, 0.15)
  - color: cerise

BTN PRIMAIRE :
  - background: #111010 (noir)
  - color: white
  - border-radius: 100px
  - padding: 12px 24px
  - font-weight: 600

BTN SECONDAIRE :
  - background: transparent
  - border: 1px solid rgba(0,0,0,0.07)
  - color: text-mid

TAGS / PILLS :
  - background: rgba(white, 0.8)
  - border: 1px solid rgba(0,0,0,0.07)
  - font-size: 0.67rem / weight 400
```

---

## 5. STRUCTURE FICHIERS NEXT.JS

```
/app
  /layout.tsx           → Police Inter, Lenis init, metadata
  /page.tsx             → Home (Hero + Projets + Services + About + Footer)
  /travaux/page.tsx     → Grille + filtres
  /projet/[slug]/page.tsx → Template projet

/components
  /layout/Nav.tsx
  /layout/Footer.tsx
  /home/Hero.tsx
  /home/ProjectsGrid.tsx
  /home/Services.tsx
  /home/About.tsx
  /travaux/Grid.tsx
  /travaux/Filters.tsx
  /projet/ProjectHero.tsx
  /projet/Chapter.tsx
  /ui/Tag.tsx
  /ui/Button.tsx

/data
  /projets.json         → [{slug, title, client, category, year, cover, chapters:[]}]

/public
  /images/projets/...

/styles
  /globals.css          → variables CSS + reset + Inter import
```

---

## 6. DATA SHAPE — projets.json

```json
[
  {
    "slug": "nom-du-projet",
    "title": "Nom du projet",
    "client": "Nom client",
    "category": "photo",
    "year": "2024",
    "cover": "/images/projets/nom-du-projet/cover.jpg",
    "ratio": "16:9",
    "featured": true,
    "chapters": [
      {
        "number": "I",
        "title": "Le contexte",
        "text": "...",
        "visuals": ["/images/projets/nom-du-projet/01.jpg"]
      },
      {
        "number": "II",
        "title": "La démarche",
        "text": "...",
        "visuals": ["/images/projets/nom-du-projet/02.jpg", "/images/projets/nom-du-projet/03.jpg"]
      },
      {
        "number": "III",
        "title": "Le résultat",
        "text": "...",
        "visuals": ["/images/projets/nom-du-projet/04.jpg"]
      }
    ]
  }
]
```

---

## 7. INSTRUCTIONS POUR CLAUDE CODE

1. Initialise un projet Next.js 14 avec App Router + TypeScript + Tailwind CSS
2. Installe les dépendances : `gsap`, `@studio-freight/lenis`, `clsx`
3. Configure Tailwind avec les variables CSS de l'identité visuelle (section 4.1)
4. Crée la structure de fichiers décrite en section 5
5. Commence par `globals.css` → `layout.tsx` → `Nav.tsx` → `page.tsx` (Home)
6. La page Home doit être un long scroll avec toutes les sections dans l'ordre
7. Les projets en page Home sont les 4 premiers `featured: true` de projets.json
8. Utilise des placeholders gris pour les images (les vraies viendront après)
9. Toutes les animations GSAP se déclenchent au scroll (ScrollTrigger)
10. Le site doit être 100% responsive (breakpoints : 768px tablet, 1024px desktop)

---

*Brief généré le 05/03/2026 — Direction visuelle validée : Fond crème + Rouge cerise*
