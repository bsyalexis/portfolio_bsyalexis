'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    // TODO: connecter à une API route ou Resend/Formspree
    setTimeout(() => setStatus('sent'), 900)
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
        {status === 'sending' ? 'Envoi…' : 'Envoyer →'}
      </button>

    </form>
  )
}
