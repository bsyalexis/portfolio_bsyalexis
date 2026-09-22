'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    if (!ACCESS_KEY) {
      console.error('NEXT_PUBLIC_WEB3FORMS_KEY manquante : le message n’a pas été envoyé.')
      setStatus('error')
      return
    }

    data.append('access_key', ACCESS_KEY)
    data.append('subject', `Nouveau message depuis alexbsy.com : ${data.get('prenom')} ${data.get('nom')}`)
    data.append('from_name', 'alexbsy.com')

    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body:   data,
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? `HTTP ${res.status}`)
      }

      setStatus('sent')
    } catch (err) {
      console.error('Envoi du formulaire de contact échoué :', err)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="cform__done" role="status">
        <span className="cform__check" aria-hidden="true">✓</span>
        <p className="cform__done-title">Message envoyé !</p>
        <p className="cform__done-text">Je vous réponds dans les plus brefs délais.</p>
      </div>
    )
  }

  return (
    <form className="cform" onSubmit={handleSubmit} noValidate>

      {/* Anti-spam : invisible pour les humains, rempli par les bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
      />

      {/* Les libellés sont visuellement masqués et non absents : un champ
          qui n'a qu'un placeholder n'est pas nommé pour un lecteur d'écran,
          et son intitulé disparaît dès la première lettre saisie. */}
      <div className="cform__row">
        <label className="sr-only" htmlFor="cf-nom">Nom</label>
        <input
          id="cf-nom" className="cform__field"
          type="text" name="nom" placeholder="Nom *"
          required autoComplete="family-name"
        />
        <label className="sr-only" htmlFor="cf-prenom">Prénom</label>
        <input
          id="cf-prenom" className="cform__field"
          type="text" name="prenom" placeholder="Prénom *"
          required autoComplete="given-name"
        />
      </div>

      <label className="sr-only" htmlFor="cf-email">Adresse email</label>
      <input
        id="cf-email" className="cform__field"
        type="email" name="email" placeholder="Adresse email *"
        required autoComplete="email" inputMode="email"
        autoCapitalize="off" spellCheck={false}
      />

      <label className="sr-only" htmlFor="cf-message">Votre message</label>
      <textarea
        id="cf-message" className="cform__field cform__field--area"
        name="message" placeholder="Votre message *"
        required rows={4}
      />

      {status === 'error' && (
        <div role="alert" className="cform__error">
          L’envoi a échoué. Réessayez, ou écrivez-moi directement à{' '}
          <a href="mailto:contact@alexbsy.fr">contact@alexbsy.fr</a>.
        </div>
      )}

      <button type="submit" className="cform__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi…' : status === 'error' ? 'Réessayer →' : 'Envoyer →'}
      </button>

    </form>
  )
}
