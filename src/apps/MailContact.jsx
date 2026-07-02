import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../content.js'
import './apps.css'

// Fenêtre style « Nouveau message » de Mail : le bouton d'envoi ouvre le
// client mail du visiteur avec l'adresse et le contenu pré-remplis.
export default function MailContact() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(false)

  const send = () => {
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || 'Contact depuis votre portfolio',
    )}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <div className="mail">
      <div className="mail-toolbar">
        <motion.button
          className="mail-send"
          onClick={send}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          title="Envoyer"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
        <span className="mail-toolbar-title">{sent ? 'Ouverture de votre app Mail…' : 'Nouveau message'}</span>
        <div className="mail-toolbar-icons">
          <span title="Pièce jointe">📎</span>
          <span title="Police">Aa</span>
        </div>
      </div>

      <div className="mail-fields">
        <div className="mail-field">
          <label>À :</label>
          <span className="mail-recipient">
            {profile.firstName} {profile.lastName} &lt;{profile.email}&gt;
          </span>
        </div>
        <div className="mail-field">
          <label>Objet :</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Une idée de projet ? Une opportunité ?"
          />
        </div>
      </div>

      <textarea
        className="mail-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`Bonjour ${profile.firstName},\n\nJe vous contacte au sujet de…`}
      />

      <div className="mail-footer">
        <a href={profile.github} target="_blank" rel="noreferrer" className="mail-social">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
          </svg>
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mail-social">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z" />
          </svg>
          LinkedIn
        </a>
        <span className="mail-location">📍 {profile.location}</span>
      </div>
    </div>
  )
}
