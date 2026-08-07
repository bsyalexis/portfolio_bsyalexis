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
      <div style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '16px',
        padding:        '48px 24px',
        textAlign:      'center',
      }}>
        <div style={{
          width:         '48px',
          height:        '48px',
          borderRadius:  '50%',
          background:    'var(--accent)',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          color:         '#fff',
          fontSize:      '1.3rem',
        }}>
          ✓
        </div>
        <p style={{ fontSize: '1rem', fontWeight: 500, color: '#ffffff', margin: 0 }}>
          Message envoyé !
        </p>
        <p style={{ fontSize: '0.8rem', fontWeight: 300, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          Je vous réponds dans les plus brefs délais.
        </p>
      </div>
    )
  }

  const fieldStyle: React.CSSProperties = {
    display:       'block',
    width:         '100%',
    background:    'rgba(255,255,255,0.06)',
    border:        '1px solid rgba(255,255,255,0.12)',
    borderRadius:  '6px',
    padding:       '11px 14px',
    color:         '#ffffff',
    fontFamily:    'inherit',
    fontSize:      '0.82rem',
    fontWeight:    300,
    outline:       'none',
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>

      {/* Anti-spam : invisible pour les humains, rempli par les bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
      />

      {/* Nom + Prénom */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          name="nom"
          placeholder="Nom *"
          required
          style={fieldStyle}
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom *"
          required
          style={fieldStyle}
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Adresse email *"
        required
        style={{ ...fieldStyle, marginBottom: '10px' }}
      />

      {/* Message */}
      <textarea
        name="message"
        placeholder="Votre message *"
        required
        rows={4}
        style={{ ...fieldStyle, resize: 'vertical', minHeight: '96px', marginBottom: '16px' }}
      />

      {/* Erreur */}
      {status === 'error' && (
        <div
          role="alert"
          style={{
            marginBottom:  '12px',
            padding:       '10px 14px',
            borderRadius:  '6px',
            background:    'rgba(220, 60, 60, 0.12)',
            border:        '1px solid rgba(220, 60, 60, 0.35)',
            color:         'rgba(255,255,255,0.85)',
            fontSize:      '0.78rem',
            fontWeight:    300,
            lineHeight:    1.5,
          }}
        >
          L’envoi a échoué. Réessayez, ou écrivez-moi directement à{' '}
          <a
            href="mailto:contact@alexbsy.fr"
            style={{ color: '#ffffff', textDecoration: 'underline' }}
          >
            contact@alexbsy.fr
          </a>
          .
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           '8px',
          padding:       '11px 24px',
          borderRadius:  '100px',
          background:    'var(--accent)',
          color:         '#ffffff',
          fontSize:      '0.82rem',
          fontWeight:    600,
          border:        'none',
          cursor:        status === 'sending' ? 'wait' : 'pointer',
          letterSpacing: '0.02em',
          opacity:       status === 'sending' ? 0.7 : 1,
          transition:    'opacity 0.2s',
          fontFamily:    'inherit',
        }}
      >
        {status === 'sending' ? 'Envoi…' : status === 'error' ? 'Réessayer →' : 'Envoyer →'}
      </button>

    </form>
  )
}
