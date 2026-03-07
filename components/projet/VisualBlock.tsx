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

  /* ── BENTO GALLERY (9 images + 2 vidéos) ── */
  if (layout === 'bento') {
    const imgs = images          // [0..8] → 1.png..9.png
    const vids = visual.videos ?? []  // [0]=TRANSFO, [1]=CONVERGENCE

    const cell = (
      content: React.ReactNode,
      col: string,
      row: string,
      key: string
    ) => (
      <div key={key} style={{ gridColumn: col, gridRow: row, overflow: 'hidden', position: 'relative' }}>
        {content}
      </div>
    )

    return (
      <div
        style={{
          display:               'grid',
          gridTemplateColumns:   '1fr 1fr 1fr',
          gridTemplateRows:      '320px 280px 300px 300px 240px',
          gap:                   '3px',
        }}
      >
        {/* Row 1 : img1 large (2 cols) + img2 */}
        {cell(<ImgBlock src={imgs[0] ?? ''} grad={GRAD[0]} />, '1 / 3', '1', 'i0')}
        {cell(<ImgBlock src={imgs[1] ?? ''} grad={GRAD[1]} />, '3',     '1', 'i1')}

        {/* Row 2 : img3 + vidéo TRANSFO + img4 */}
        {cell(<ImgBlock src={imgs[2] ?? ''} grad={GRAD[2]} />, '1', '2', 'i2')}
        {cell(<VidBlock src={vids[0] ?? ''} />,                '2', '2', 'v0')}
        {cell(<ImgBlock src={imgs[3] ?? ''} grad={GRAD[0]} />, '3', '2', 'i3')}

        {/* Row 3 : img5 + img6 + img7 */}
        {cell(<ImgBlock src={imgs[4] ?? ''} grad={GRAD[1]} />, '1', '3', 'i4')}
        {cell(<ImgBlock src={imgs[5] ?? ''} grad={GRAD[2]} />, '2', '3', 'i5')}
        {cell(<ImgBlock src={imgs[6] ?? ''} grad={GRAD[0]} />, '3', '3', 'i6')}

        {/* Row 4 : img8 large (2 cols) + vidéo CONVERGENCE */}
        {cell(<ImgBlock src={imgs[7] ?? ''} grad={GRAD[1]} />, '1 / 3', '4', 'i7')}
        {cell(<VidBlock src={vids[1] ?? ''} />,                '3',     '4', 'v1')}

        {/* Row 5 : img9 pleine largeur */}
        {cell(<ImgBlock src={imgs[8] ?? ''} grad={GRAD[2]} />, '1 / 4', '5', 'i8')}
      </div>
    )
  }

  return null
}
