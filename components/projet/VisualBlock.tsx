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
          /* row 2 & 4 : 2 cols wide ≈ 724px → 16:9 ≈ 407px */
          gridTemplateRows:    '380px 407px 300px 407px 260px',
          gap:                 '3px',
        }}
      >
        {/* Row 1 : img1 large (2 cols) + img3 portrait */}
        {imgCell(0, '1 / 3', '1', 'i0')}
        {imgCell(2, '3',     '1', 'i2')}

        {/* Row 2 : TRANSFO.webm 16:9 (2 cols) + img4 BTS */}
        {vidCell(0, '1 / 3', '2', 'v0')}
        {imgCell(3, '3',     '2', 'i3')}

        {/* Row 3 : 3 images égales */}
        {imgCell(4, '1', '3', 'i4')}
        {imgCell(5, '2', '3', 'i5')}
        {imgCell(6, '3', '3', 'i6')}

        {/* Row 4 : img2 + CONVERGENCE.webm 16:9 (2 cols) */}
        {imgCell(1, '1',     '4', 'i1')}
        {vidCell(1, '2 / 4', '4', 'v1')}

        {/* Row 5 : img8 large (2 cols) + img9 */}
        {imgCell(7, '1 / 3', '5', 'i7')}
        {imgCell(8, '3',     '5', 'i8')}
      </div>
    )
  }

  return null
}
