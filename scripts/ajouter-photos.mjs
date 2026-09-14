/**
 * Ajoute des photos à un projet existant : conversion WebP, insertion dans
 * `galleryImages`, recalcul des `galleryAspects`.
 *
 * `convert-projet.mjs` s'arrête aux fichiers ; la liste et les ratios restaient
 * à tenir à la main dans projets.json. C'est tenable pour un projet livré une
 * fois, pas pour une galerie de saison qu'on rouvre après chaque match : un
 * ratio oublié décale toute la grille, puisque `galleryAspects[i]` se lit par
 * position et non par nom de fichier.
 *
 *   node scripts/ajouter-photos.mjs fc-saint-joseph ~/Desktop/match-12-10
 *   node scripts/ajouter-photos.mjs fc-saint-joseph            (fichiers déjà déposés)
 *   node scripts/ajouter-photos.mjs fc-saint-joseph … --fin    (à la suite, pas en tête)
 *   node scripts/ajouter-photos.mjs fc-saint-joseph … --simulation
 */
import sharp from 'sharp'
import { readdir, stat, readFile, writeFile, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'

const RACINE  = 'public/images/projets'
const PROJETS = 'data/projets.json'
// Mêmes réglages que convert-projet.mjs : une photo ajoutée en cours de saison
// doit peser et rendre comme celles déjà en ligne.
const MAX     = 2000
const QUALITE = 82

const args        = process.argv.slice(2)
const enFin       = args.includes('--fin')
const simulation  = args.includes('--simulation')
const positions   = args.filter((a) => !a.startsWith('--'))
const [slug, source] = positions

if (!slug) {
  console.error('usage : node scripts/ajouter-photos.mjs <slug> [<dossier-source>] [--fin] [--simulation]')
  process.exit(1)
}

/* Un nom de fichier d'export finit dans une URL : espaces et accents n'y ont
   pas leur place. La casse, elle, est conservée : les photos déjà en ligne
   s'appellent A7402376.webp, et les aligner sur autre chose pour les seules
   nouvelles venues rendrait le dossier illisible. */
function assainir(nom) {
  return nom
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const dossier = join(RACINE, slug)
const projets = JSON.parse(await readFile(PROJETS, 'utf8'))
const projet  = projets.find((p) => p.slug === slug)
if (!projet) throw new Error(`projet introuvable dans ${PROJETS} : ${slug}`)

await mkdir(dossier, { recursive: true })

/* Les originaux restent où ils sont : les déplacer ou les effacer est un autre
   geste, qui ne doit pas se produire par effet de bord d'un ajout de photos. */
const depuis = source ?? dossier
const bruts = (await readdir(depuis))
  .filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('.'))
  .sort()

let convertis = 0, deja = 0

for (const fichier of bruts) {
  const src  = join(depuis, fichier)
  const dest = join(dossier, `${assainir(basename(fichier, extname(fichier)))}.webp`)

  try {
    await stat(dest)
    deja++
    continue
  } catch { /* pas encore converti */ }

  if (simulation) {
    console.log(`  · ${fichier} → ${basename(dest)} (simulation)`)
    convertis++
    continue
  }

  const poidsAvant = (await stat(src)).size
  await sharp(src)
    .rotate()                                   // applique l'orientation EXIF
    .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITE })
    .toFile(dest)
  const poidsApres = (await stat(dest)).size

  convertis++
  console.log(
    `  ✓ ${fichier.padEnd(22)} ` +
    `${(poidsAvant / 1048576).toFixed(1)} Mo → ${(poidsApres / 1024).toFixed(0)} Ko`
  )
}

/* ── Liste des images ──
   Les arrivantes se déduisent des originaux déposés, jamais d'un balayage des
   .webp du dossier : celui-ci contient aussi ce qui n'a rien à faire dans la
   grille, à commencer par le HERO.webp qui tient la couverture. Un balayage
   ferait entrer la couverture dans la galerie à chaque ajout de match. */
const candidates = bruts.map(
  (f) => `/${join(dossier, `${assainir(basename(f, extname(f)))}.webp`).replace(/^public\//, '')}`
)

const connues = projet.galleryImages ?? []

/* La couverture vit dans le même dossier d'originaux que les photos de match,
   mais elle n'a rien à faire dans la grille : elle ouvre la page projet, au
   dessus de la galerie. Sans cette exclusion, pointer le script sur un dossier
   d'archive complet la ferait entrer dans la liste à chaque ajout de match. */
const horsGalerie = new Set(
  [projet.cover, projet.heroImage, projet.coverVideo].filter(Boolean)
)

const nouvelles = candidates.filter(
  (src) => !connues.includes(src) && !horsGalerie.has(src)
)

/* Par défaut les nouvelles photos se placent juste derrière l'image
   d'ouverture : c'est elle qui tient l'en-tête de la page projet
   (`galleryImages[0]`, voir PhotoGallery) et elle a été choisie, alors que le
   dernier match, lui, doit ouvrir la grille. */
const images = enFin
  ? [...connues, ...nouvelles]
  : [connues[0], ...nouvelles, ...connues.slice(1)].filter(Boolean)

/* Les ratios sont recalculés pour toute la galerie, pas seulement pour les
   arrivantes : c'est le seul moyen de garantir qu'ils restent alignés sur la
   liste après une insertion au milieu. */
const aspects = []
for (const src of images) {
  const fichier = join('public', src)
  try {
    const meta = await sharp(fichier).metadata()
    aspects.push(Number((meta.width / meta.height).toFixed(3)))
  } catch {
    /* Un fichier listé mais absent n'interrompt pas l'ajout : on retombe sur
       le 3:2 de PhotoGallery et on le signale, plutôt que de perdre le travail
       de conversion déjà fait pour une entrée périmée. */
    console.warn(`  ! introuvable, ratio par défaut : ${src}`)
    aspects.push(1.5)
  }
}

const avant = (projet.galleryImages ?? []).length
projet.galleryImages  = images
projet.galleryAspects = aspects

if (simulation) {
  console.log(`\n(simulation) ${avant} → ${images.length} photos`)
  for (const src of nouvelles) console.log(`  + ${basename(src)}`)
} else {
  await writeFile(PROJETS, JSON.stringify(projets, null, 2) + '\n')
  console.log(`\n${convertis} converties, ${deja} déjà présentes`)
  console.log(`${slug} : ${avant} → ${images.length} photos dans ${PROJETS}`)
}

if (nouvelles.length) {
  console.log(
    enFin
      ? 'Placées à la suite de la galerie.'
      : "Placées en tête, derrière l'image d'ouverture."
  )
  console.log('Pense à relancer : node scripts/build-galerie-foot.mjs')
}
