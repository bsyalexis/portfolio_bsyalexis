import sharp from 'sharp'
import { readdir, stat, rename } from 'fs/promises'
import { join, extname, relative } from 'path'

const PUBLIC = 'public'
const QUALITY = 85 // high quality, no visible loss

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

async function convert() {
  const all = await walk(PUBLIC)
  const images = all.filter((f) => /\.(jpg|jpeg|png)$/i.test(f))

  console.log(`Found ${images.length} images to convert`)

  let saved = 0
  for (const src of images) {
    const ext = extname(src)
    const dest = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    const rel = relative(PUBLIC, src)

    try {
      const original = await stat(src)
      await sharp(src).webp({ quality: QUALITY }).toFile(dest)
      const converted = await stat(dest)

      const pct = ((1 - converted.size / original.size) * 100).toFixed(1)
      saved += original.size - converted.size
      console.log(`✓ ${rel} → .webp  (${pct}% smaller)`)
    } catch (err) {
      console.error(`✗ ${rel}: ${err.message}`)
    }
  }

  console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(2)} MB`)
}

convert()
