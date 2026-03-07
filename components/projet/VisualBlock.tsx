interface Visual {
  layout:   string
  images:   string[]
  vimeoId?: string
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

  return null
}
