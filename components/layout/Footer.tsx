import Link        from 'next/link'
import ContactForm from './ContactForm'

export default function Footer() {
  return (
    <footer id="contact">

      {/* ── Section sombre + formulaire ── */}
      <div style={styles.engage} className="footer-engage">
        <div style={styles.engageInner} className="engage-inner">

          {/* Gauche — texte */}
          <div style={styles.engageLeft}>
            <p className="label" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', marginBottom: '18px' }}>
              Contact
            </p>
            <h2 style={styles.engageHeading}>
              Discutons ensemble.
            </h2>
            <a href="mailto:bsy.alexis@gmail.com" style={styles.engageCta}>
              bsy.alexis@gmail.com
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
            <Link href="/#contact" style={styles.link}>Contact</Link>
          </div>

          <div style={styles.col}>
            <span className="label" style={styles.colLabel}>Réseaux</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" style={styles.link}>Behance</a>
          </div>

          <div style={styles.col}>
            <span className="label" style={styles.colLabel}>Contact</span>
            <a href="mailto:bsy.alexis@gmail.com" style={styles.link}>bsy.alexis@gmail.com</a>
          </div>

        </div>
      </div>

      {/* ── Barre © ── */}
      <div style={styles.bottom}>
        <div style={styles.bottomInner} className="footer-bottom-inner">
          <span style={styles.copy}>Site par Bossy Alexis — {new Date().getFullYear()}</span>
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
    maxWidth:        '1100px',
    margin:          '0 auto',
    paddingInline:   '56px',
    display:         'flex',
    justifyContent:  'center',
    gap:             '80px',
    alignItems:      'start',
  },
  col: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '10px',
    alignItems:    'center',
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
  /* Bottom */
  bottom: {
    background:   '#111010',
    paddingBlock: '18px',
  },
  bottomInner: {
    maxWidth:       '1100px',
    margin:         '0 auto',
    paddingInline:  '56px',
    display:        'flex',
    justifyContent: 'center',
    alignItems:     'center',
  },
  copy: {
    fontSize:       '0.7rem',
    fontWeight:     400,
    color:          'rgba(255,255,255,0.2)',
    textDecoration: 'none',
  },
}
