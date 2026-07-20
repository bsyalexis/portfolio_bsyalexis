import sharp from 'sharp'
import { readdir, stat, writeFile, readFile } from 'fs/promises'
import { join, relative, extname } from 'path'

const PUBLIC = 'public'
const MAX_WIDTH = 2000
const MAX_HEIGHT = 2000
const QUALITY = 82

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(full)))
    else files.push(full)
  }
  return files
}

async function optimize() {
  const all = await walk(PUBLIC)
  // Find original jpg/png files that have a .webp counterpart
  const originals = all.filter((f) => /\.(jpg|jpeg|png)$/i.test(f))

  console.log(`Found ${originals.length} original images to re-optimize`)

  let totalBefore = 0
  let totalAfter = 0
  let resized = 0

  for (const src of originals) {
    const rel = relative(PUBLIC, src)
    const webpDest = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')

    try {
      const meta = await sharp(src).metadata()
      const w = meta.width || 0
      const h = meta.height || 0

      let webpBefore = 0
      try { webpBefore = (await stat(webpDest)).size } catch {}
      totalBefore += webpBefore

      if (w <= MAX_WIDTH && h <= MAX_HEIGHT) {
        totalAfter += webpBefore
        continue
      }

      const buf = await sharp(src)
        .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer()

      await writeFile(webpDest, buf)
      totalAfter += buf.length
      resized++
      const pct = webpBefore > 0 ? ((1 - buf.length / webpBefore) * 100).toFixed(1) : '?'
      console.log(`✓ ${rel}  ${w}x${h} → 2000px  (${(webpBefore/1024).toFixed(0)}KB → ${(buf.length/1024).toFixed(0)}KB, -${pct}%)`)
    } catch (err) {
      console.error(`✗ ${rel}: ${err.message}`)
    }
  }

  console.log(`\n${resized} images resized`)
  console.log(`Before: ${(totalBefore/1024/1024).toFixed(1)} MB`)
  console.log(`After:  ${(totalAfter/1024/1024).toFixed(1)} MB`)
  console.log(`Saved:  ${((totalBefore-totalAfter)/1024/1024).toFixed(1)} MB`)
}

optimize()
