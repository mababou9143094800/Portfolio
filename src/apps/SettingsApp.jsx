import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import './apps.css'

// Réglages Système : sélection de la langue du site (FR / EN).
export default function SettingsApp() {
  const { lang, setLang, t } = useLang()

  const LANGS = [
    { id: 'fr', flag: '🇫🇷', label: t.settings.french, native: 'Français' },
    { id: 'en', flag: '🇬🇧', label: t.settings.english, native: 'English' },
  ]

  return (
    <div className="settings">
      <section className="settings-section">
        <h3>🌐 {t.settings.language}</h3>
        <p className="settings-hint">{t.settings.languageHint}</p>
        <div className="settings-options">
          {LANGS.map((l) => (
            <motion.button
              key={l.id}
              className={`settings-option ${lang === l.id ? 'active' : ''}`}
              onClick={() => setLang(l.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="settings-flag">{l.flag}</span>
              <span className="settings-option-labels">
                <strong>{l.native}</strong>
                <small>{l.label}</small>
              </span>
              <span className={`settings-radio ${lang === l.id ? 'checked' : ''}`}>
                {lang === l.id && (
                  <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5.5 4.2 8.5 11 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h3>🎨 {t.settings.appearance}</h3>
        <p className="settings-hint">{t.settings.appearanceHint}</p>
        <div className="settings-options">
          <button className="settings-option active" disabled>
            <span className="settings-flag">🌙</span>
            <span className="settings-option-labels">
              <strong>{t.settings.dark}</strong>
            </span>
            <span className="settings-radio checked">
              <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                <path d="M1 5.5 4.2 8.5 11 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </div>
  )
}
