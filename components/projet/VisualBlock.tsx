interface Visual {
  layout:   string
  images:   string[]
  vimeoId?: string
  videos?:  string[]
}

interface Props {
  visual: Visual
  dark?:  boolean
}

/* Gradients placeholder — lumière simulée pour habiller les blocs sans image */
const GRAD = [
  'radial-gradient(ellipse at 35% 35%, rgba(255,255,255,0.18) 0%, transparent 55%), linear-gradient(155deg, #c8c0b8 0%, #a09080 50%, #7a7068 100%)',
  'radial-gradient(ellipse at 65% 30%, rgba(255,255,255,0.14) 0%, transparent 50%), linear-gradient(155deg, #b0b4b8 0%, #888c90 50%, #606468 100%)',
  'radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.12) 0%, transparent 55%), linear-gradient(155deg, #d0c8be 0%, #aca098 50%, #888078 100%)',
]

function ImgBlock({ src, grad }: { src: string; grad: string }) {
  return (
    <div
      style={{
        width:                '100%',
        height:               '100%',
        background:           `url(${src}) center/cover no-repeat, ${grad}`,
        backgroundSize:       'cover',
        backgroundPosition:   'center',
      }}
    />
  )
}

function VidBlock({ src }: { src: string }) {
  return (
    <video
      autoPlay loop muted playsInline
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    >
      <source src={src} type="video/webm" />
    </video>
  )
}

export default function VisualBlock({ visual }: Props) {
  const { layout, images } = visual

  /* ── FULL ──────────────────────────── */
  if (layout === 'full') {
    if (visual.vimeoId) {
      return (
        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
          <iframe
            src={`https://player.vimeo.com/video/${visual.vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }
    return (
      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <ImgBlock src={images[0] ?? ''} grad={GRAD[0]} />
      </div>
    )
  }

  /* ── SPLIT EQUAL 50/50 ─────────────── */
  if (layout === 'split-equal') {
    return (
      <div
        style={{
          display:               'grid',
          gridTemplateColumns:   '1fr 1fr',
          gap:                   '3px',
          height:                '55vh',
          minHeight:             '300px',
          overflow:              'hidden',
        }}
      >
        {[0, 1].map((i) => (
          <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} />
        ))}
      </div>
    )
  }

  /* ── SPLIT ASYMMETRIC 40/60 ────────── */
  if (layout === 'split-asymmetric') {
    return (
      <div
        style={{
          display:               'grid',
          gridTemplateColumns:   '2fr 3fr',
          gap:                   '3px',
          height:                '65vh',
          minHeight:             '360px',
          overflow:              'hidden',
        }}
      >
        {[0, 1].map((i) => (
          <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} />
        ))}
      </div>
    )
  }

  /* ── BENTO GALLERY (9 images + 2 vidéos 16:9) ── */
  if (layout === 'bento') {
    const imgs = images
    const vids = visual.videos ?? []

    const imgCell = (idx: number, col: string, row: string, key: string) => (
      <div key={key} style={{ gridColumn: col, gridRow: row, overflow: 'hidden' }}>
        <ImgBlock src={imgs[idx] ?? ''} grad={GRAD[idx % GRAD.length]} />
      </div>
    )

    const vidCell = (idx: number, col: string, row: string, key: string) => (
      <div key={key} style={{ gridColumn: col, gridRow: row, overflow: 'hidden' }}>
        <VidBlock src={vids[idx] ?? ''} />
      </div>
    )

    return (
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          /*
            1 col  ≈ 360px → 16:9 = 202px
            2 cols ≈ 724px → 16:9 = 407px
            3 cols ≈ 1088px→ 16:9 = 612px
          */
          gridTemplateRows: '407px 202px 407px 202px 612px',
          gap: '3px',
        }}
      >
        {/* Row 1 (407px) : TRANSFO.webm 16:9 (2 cols) + img1 */}
        {vidCell(0, '1 / 3', '1', 'v0')}
        {imgCell(0, '3',     '1', 'i0')}

        {/* Row 2 (202px) : 3 images 16:9 */}
        {imgCell(2, '1', '2', 'i2')}
        {imgCell(3, '2', '2', 'i3')}
        {imgCell(4, '3', '2', 'i4')}

        {/* Row 3 (407px) : img2 + CONVERGENCE.webm 16:9 (2 cols) */}
        {imgCell(1, '1',     '3', 'i1')}
        {vidCell(1, '2 / 4', '3', 'v1')}

        {/* Row 4 (202px) : 3 images 16:9 */}
        {imgCell(5, '1', '4', 'i5')}
        {imgCell(6, '2', '4', 'i6')}
        {imgCell(7, '3', '4', 'i7')}

        {/* Row 5 (612px) : img9 pleine largeur 16:9 */}
        {imgCell(8, '1 / 4', '5', 'i8')}
      </div>
    )
  }

  /* ── SPLIT 3 colonnes égales ────────── */
  if (layout === 'split-3') {
    return (
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap:                 '3px',
          height:              '55vh',
          minHeight:           '300px',
          overflow:            'hidden',
        }}
      >
        {[0, 1, 2].map((i) => (
          <ImgBlock key={i} src={images[i] ?? ''} grad={GRAD[i % GRAD.length]} />
        ))}
      </div>
    )
  }

  /* ── GRID 3 colonnes — n images ─────── */
  if (layout === 'grid-3col') {
    const rows = Math.ceil(images.length / 3)
    const lastIsAlone = images.length % 3 === 1

    return (
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap:                 '3px',
          overflow:            'hidden',
        }}
      >
        {images.map((src, i) => {
          const isLast  = i === images.length - 1
          const colspan = isLast && lastIsAlone ? '1 / 4' : undefined
          const height  = isLast && lastIsAlone ? '480px' : '360px'
          return (
            <div
              key={i}
              style={{ gridColumn: colspan, height, overflow: 'hidden' }}
            >
              <ImgBlock src={src} grad={GRAD[i % GRAD.length]} />
            </div>
          )
        })}
        {/* padding pour compléter la dernière rangée si nécessaire */}
        {rows > 0 && images.length % 3 === 2 && <div />}
      </div>
    )
  }

  return null
}
