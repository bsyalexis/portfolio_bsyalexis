/**
 * Conversion des photos d'un projet en WebP web-ready.
 *
 * Les scripts existants (convert-to-webp / optimize-images) balayent tout
 * `public/` : les relancer reconvertirait les projets déjà en ligne. Celui-ci
 * ne traite que les dossiers passés en argument, et laisse les originaux en
 * place — c'est un autre geste, volontairement séparé, de les déplacer.
 *
 *   node scripts/convert-projet.mjs volkan-eva-esport padelshot-p100-...
 */
import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const RACINE   = 'public/images/projets'
// Mêmes valeurs que optimize-images.mjs : au-delà de 2000 px un écran retina
// n'y gagne rien de visible, et le poids double.
const MAX      = 2000
const QUALITE  = 82

const slugs = process.argv.slice(2)
if (!slugs.length) {
  console.error('usage : node scripts/convert-projet.mjs <slug> [<slug>…]')
  process.exit(1)
}

/** Parcourt un dossier et ses sous-dossiers (inpick/ et theoplatel/). */
async function parcourir(dir) {
  const entrees = await readdir(dir, { withFileTypes: true })
  const fichiers = []
  for (const e of entrees) {
    if (e.name.startsWith('.')) continue
    const complet = join(dir, e.name)
    if (e.isDirectory()) fichiers.push(...(await parcourir(complet)))
    else fichiers.push(complet)
  }
  return fichiers
}

let avant = 0, apres = 0, faits = 0, ignores = 0

for (const slug of slugs) {
  const dossier = join(RACINE, slug)
  const tous = await parcourir(dossier)
  const sources = tous.filter((f) => /\.(jpe?g|png)$/i.test(f))

  console.log(`\n── ${slug} — ${sources.length} image(s)`)

  for (const src of sources) {
    const dest = src.replace(/\.(jpe?g|png)$/i, '.webp')

    // Un .webp déjà présent (les vignettes YouTube, par exemple) n'est pas
    // réécrasé : le script doit pouvoir être relancé sans dégrader.
    try {
      await stat(dest)
      console.log(`  · ${basename(src)} — .webp déjà présent, ignoré`)
      ignores++
      continue
    } catch { /* pas de .webp : on convertit */ }

    const meta = await sharp(src).metadata()
    const poidsAvant = (await stat(src)).size

    await sharp(src)
      .rotate()                                   // applique l'orientation EXIF
      .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITE })
      .toFile(dest)

    const poidsApres = (await stat(dest)).size
    const metaApres = await sharp(dest).metadata()

    avant += poidsAvant
    apres += poidsApres
    faits++

    const pct = ((1 - poidsApres / poidsAvant) * 100).toFixed(1)
    console.log(
      `  ✓ ${basename(src).padEnd(20)} ` +
      `${meta.width}×${meta.height} → ${metaApres.width}×${metaApres.height}  ` +
      `${(poidsAvant / 1048576).toFixed(1)} Mo → ${(poidsApres / 1024).toFixed(0)} Ko  (−${pct}%)`
    )
  }
}

console.log(
  `\n${faits} converties, ${ignores} ignorées — ` +
  `${(avant / 1048576).toFixed(0)} Mo → ${(apres / 1048576).toFixed(1)} Mo ` +
  `(−${((1 - apres / avant) * 100).toFixed(1)}%)`
)
