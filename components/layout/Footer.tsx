import Link        from 'next/link'
import ContactForm from './ContactForm'
import ModuleTrail from '@/components/motion/ModuleTrail'

const NAVIGATION = [
  { href: '/',         label: 'Accueil' },
  { href: '/travaux',  label: 'Travaux' },
  { href: '/#contact', label: 'Contact' },
]

const RESEAUX = [
  { href: 'https://www.instagram.com/alexbsy_/', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/alexis-bossy-aa3198196/', label: 'LinkedIn' },
  { href: 'https://behance.net', label: 'Behance' },
]

export default function Footer() {
  return (
    <footer id="contact" className="ft">

      {/* ── Section sombre + formulaire ── */}
      <div className="ft__engage">
        <div className="ft__engage-inner">

          <div className="ft__engage-left">
            <p className="label ft__engage-label">Contact</p>
            <h2 className="ft__engage-title">Discutons ensemble.</h2>
            <a href="mailto:contact@alexbsy.fr" className="ft__engage-mail">
              contact@alexbsy.fr
            </a>
          </div>

          <div className="ft__form-wrap">
            <ModuleTrail />
            <ContactForm />
          </div>

        </div>
      </div>

      {/* ── Liens ── */}
      <div className="ft__links">
        <div className="ft__links-inner">

          <div className="ft__col">
            <span className="label ft__col-label">Navigation</span>
            {NAVIGATION.map((l) => (
              <Link key={l.href} href={l.href} className="ft__link">{l.label}</Link>
            ))}
          </div>

          <div className="ft__col">
            <span className="label ft__col-label">Réseaux</span>
            {RESEAUX.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ft__link">
                {l.label}
              </a>
            ))}
          </div>

          {/* L'adresse est longue : elle prend les deux colonnes en pied de
              grille sur mobile plutôt que d'en déborder. */}
          <div className="ft__col ft__col--wide">
            <span className="label ft__col-label">Contact</span>
            <a href="mailto:contact@alexbsy.fr" className="ft__link">contact@alexbsy.fr</a>
          </div>

        </div>
      </div>

      {/* ── Barre © ── */}
      <div className="ft__bottom">
        <span className="ft__copy">Site par Bossy Alexis ı {new Date().getFullYear()}</span>
      </div>

    </footer>
  )
}
