import Link        from 'next/link'
import ContactForm from './ContactForm'

export default function Footer() {
  return (
    <footer id="contact">

      {/* ── Section sombre + formulaire ── */}
      <div style={styles.engage}>
        <div style={styles.engageInner} className="engage-inner">

          {/* Gauche — texte */}
          <div style={styles.engageLeft}>
            <p className="label" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', marginBottom: '18px' }}>
              Contact
            </p>
            <h2 style={styles.engageHeading}>
              Engageons la<br />conversation.
            </h2>
            <p style={styles.engageDesc}>
              Disponible pour des missions de vidéo, photographie,
              direction artistique et webdesign.
            </p>
            <a href="mailto:contact@alexisbossy.com" style={styles.engageCta}>
              contact@alexisbossy.com
            </a>
          </div>

          {/* Droite — formulaire de contact */}
          <div style={styles.formWrap}>
            <ContactForm />
          </div>

        </div>
      </div>

      {/* ── Liens + grand nom ── */}
      <div style={styles.links}>
        <div style={styles.linksInner} className="footer-links-inner">

          <div style={styles.col}>
            <span className="label" style={styles.colLabel}>Navigation</span>
            <Link href="/" style={styles.link}>Accueil</Link>
            <Link href="/travaux" style={styles.link}>Travaux</Link>
            <Link href="/#services" style={styles.link}>Services</Link>
            <Link href="/#contact" style={styles.link}>Contact</Link>
          </div>

          <div style={styles.col}>
            <span className="label" style={styles.colLabel}>Réseaux</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Instagram</a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Vimeo</a>
          </div>

          <div style={styles.col}>
            <span className="label" style={styles.colLabel}>Contact</span>
            <a href="mailto:contact@alexisbossy.com" style={styles.link}>contact@alexisbossy.com</a>
          </div>

          <div style={styles.logoCol}>
            <span style={styles.bigLogo}>Alexis Bossy</span>
          </div>

        </div>
      </div>

      {/* ── Barre © ── */}
      <div style={styles.bottom}>
        <div style={styles.bottomInner}>
          <span style={styles.copy}>© {new Date().getFullYear()} Alexis Bossy</span>
          <Link href="/travaux" style={styles.copy}>Travaux</Link>
        </div>
      </div>

    </footer>
  )
}

const styles: Record<string, React.CSSProperties> = {
  /* Engage */
  engage: {
    background: '#111010',
    padding: '80px 56px 72px',
  },
  engageInner: {
    maxWidth:             '1100px',
    margin:               '0 auto',
    display:              'grid',
    gridTemplateColumns:  '1fr 1fr',
    gap:                  '72px',
    alignItems:           'start',
  },
  engageLeft: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '16px',
  },
  engageHeading: {
    fontSize:      'clamp(2rem, 3.5vw, 3rem)',
    fontWeight:    700,
    letterSpacing: '-0.03em',
    lineHeight:    1.08,
    color:         '#ffffff',
    margin:        0,
  },
  engageDesc: {
    fontSize:   '0.85rem',
    fontWeight: 300,
    color:      'rgba(255,255,255,0.4)',
    lineHeight: 1.75,
    maxWidth:   '340px',
    margin:     0,
  },
  engageCta: {
    display:        'inline-block',
    color:          'rgba(255,255,255,0.55)',
    fontSize:       '0.78rem',
    fontWeight:     400,
    textDecoration: 'none',
    borderBottom:   '1px solid rgba(255,255,255,0.18)',
    paddingBottom:  '2px',
    width:          'fit-content',
  },
  formWrap: {
    paddingTop: '4px',
  },

  /* Links */
  links: {
    background:    '#111010',
    borderTop:     '1px solid rgba(255,255,255,0.07)',
    paddingTop:    '48px',
    paddingBottom: '24px',
  },
  linksInner: {
    maxWidth:             '1100px',
    margin:               '0 auto',
    paddingInline:        '56px',
    display:              'grid',
    gridTemplateColumns:  '1fr 1fr 1fr 1.5fr',
    gap:                  '32px',
    alignItems:           'end',
  },
  col: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '10px',
  },
  colLabel: {
    color:        'rgba(255,255,255,0.25)',
    marginBottom: '4px',
    display:      'block',
  },
  link: {
    fontSize:       '0.82rem',
    fontWeight:     300,
    color:          'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    transition:     'color 0.2s',
  },
  logoCol: {
    display:        'flex',
    alignItems:     'flex-end',
    justifyContent: 'flex-end',
  },
  bigLogo: {
    fontSize:      'clamp(1.5rem, 2.6vw, 2.2rem)',
    fontWeight:    700,
    color:         'rgba(255,255,255,0.1)',
    letterSpacing: '-0.02em',
    lineHeight:    1,
  },

  /* Bottom */
  bottom: {
    background:   '#111010',
    borderTop:    '1px solid rgba(255,255,255,0.06)',
    paddingBlock: '18px',
  },
  bottomInner: {
    maxWidth:       '1100px',
    margin:         '0 auto',
    paddingInline:  '56px',
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  copy: {
    fontSize:       '0.7rem',
    fontWeight:     400,
    color:          'rgba(255,255,255,0.2)',
    textDecoration: 'none',
  },
}
