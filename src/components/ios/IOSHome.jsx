import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DOCK_APPS as APPS } from '../../apps/registry.jsx'
import { profile } from '../../content.js'
import './ios.css'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(id)
  }, [])
  return now
}

const timeFmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' })

// Sur mobile, le bureau macOS devient un écran d'accueil iOS :
// widget de présentation + les 4 mêmes apps.
export default function IOSHome() {
  const [openedId, setOpenedId] = useState(null)
  const now = useClock()
  const opened = APPS.find((a) => a.id === openedId)

  return (
    <div className="ios">
      <div className="ios-wallpaper">
        <div className="wp-blob wp-blob-1" />
        <div className="wp-blob wp-blob-2" />
        <div className="wp-blob wp-blob-3" />
      </div>

      {/* Barre de statut */}
      <div className="ios-statusbar">
        <span className="ios-time">{timeFmt.format(now)}</span>
        <div className="ios-status-icons">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
            <rect x="0" y="7" width="3" height="4" rx="1" />
            <rect x="4.5" y="5" width="3" height="6" rx="1" />
            <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
            <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM4.9 7.4a4.7 4.7 0 0 1 6.2 0l-1.2 1.3a3 3 0 0 0-3.8 0L4.9 7.4ZM2.4 4.9a8.2 8.2 0 0 1 11.2 0l-1.2 1.2a6.5 6.5 0 0 0-8.8 0L2.4 4.9ZM0 2.4a11.8 11.8 0 0 1 16 0l-1.2 1.3a10 10 0 0 0-13.6 0L0 2.4Z" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
            <rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" />
            <path d="M23.5 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Widget de présentation */}
      <motion.div
        className="ios-widget"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="ios-widget-hello">Bonjour 👋 je suis</p>
        <h1>
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="ios-widget-role">{profile.role}</p>
        <p className="ios-widget-bio">{profile.tagline}</p>
      </motion.div>

      {/* Grille d'apps */}
      <div className="ios-grid">
        {APPS.map((app, i) => (
          <motion.button
            key={app.id}
            className="ios-app"
            onClick={() => setOpenedId(app.id)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.88 }}
          >
            <span className="ios-app-icon">
              <app.icon />
            </span>
            <span className="ios-app-label">{app.name}</span>
          </motion.button>
        ))}
      </div>

      <p className="ios-hint">Touchez une app pour l’ouvrir</p>

      {/* Dock */}
      <motion.div
        className="ios-dock"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {APPS.map((app) => (
          <button key={app.id} className="ios-dock-icon" onClick={() => setOpenedId(app.id)}>
            <app.icon />
          </button>
        ))}
      </motion.div>

      {/* App plein écran */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="ios-app-screen"
            initial={{ scale: 0.3, opacity: 0, borderRadius: 60 }}
            animate={{ scale: 1, opacity: 1, borderRadius: 0 }}
            exit={{ scale: 0.3, opacity: 0, borderRadius: 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="ios-app-header">
              <button className="ios-back" onClick={() => setOpenedId(null)}>
                ‹ Accueil
              </button>
              <span className="ios-app-title">{opened.name}</span>
              <span className="ios-header-spacer" />
            </div>
            <div className="ios-app-content">
              <opened.component />
            </div>
            <button
              className="ios-home-indicator"
              onClick={() => setOpenedId(null)}
              aria-label="Revenir à l’accueil"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
