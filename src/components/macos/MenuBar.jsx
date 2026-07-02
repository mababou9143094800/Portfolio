import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MenuList from './MenuList.jsx'
import { useWindowManager } from './WindowManager.jsx'
import { APPS } from '../../apps/registry.jsx'
import { profile } from '../../content.js'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 10)
    return () => clearInterval(id)
  }, [])
  return now
}

const dateFmt = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' })

const NETWORKS = ['Livebox-Mathieu', 'Freebox-du-voisin', 'iPhone de Mathieu']

export default function MenuBar({ appName, onExitRequest, cycleWallpaper, openSpotlight }) {
  const now = useClock()
  const wm = useWindowManager()
  const rootRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(null) // id du menu / popover ouvert
  const [wifiNetwork, setWifiNetwork] = useState(NETWORKS[0])
  const [toggles, setToggles] = useState({ wifi: true, bluetooth: true, airdrop: false, focus: false })
  const [volume, setVolume] = useState(70)

  // Fermeture au clic extérieur / Échap
  useEffect(() => {
    if (!openMenu) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpenMenu(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  const focused = wm.focusedId
  const focusedWin = focused ? wm.windows[focused] : null
  const closeAll = () =>
    Object.entries(wm.windows).forEach(([id, w]) => w.open && wm.closeApp(id))

  // ── Définition des menus ──────────────────────────────────────────
  const menus = {
    apple: [
      { label: 'À propos de ce portfolio', action: () => wm.openApp('about') },
      { divider: true },
      { label: 'Réglages Système…', disabled: true },
      { label: 'Changer le fond d’écran', action: cycleWallpaper },
      { divider: true },
      { label: 'Revenir à l’accueil', action: onExitRequest },
      { divider: true },
      { label: 'Redémarrer…', action: () => window.location.reload() },
      { label: 'Verrouiller l’écran', shortcut: '⌃⌘Q', disabled: true },
    ],
    file: [
      { label: 'Nouvelle fenêtre Finder', shortcut: '⌘N', action: () => wm.openApp('projects') },
      { label: 'Nouveau message', action: () => wm.openApp('contact') },
      { divider: true },
      { label: 'Fermer la fenêtre', shortcut: '⌘W', disabled: !focused, action: () => wm.closeApp(focused) },
      { label: 'Tout fermer', shortcut: '⌥⌘W', disabled: !wm.anyOpen, action: closeAll },
    ],
    edit: [
      { label: 'Annuler', shortcut: '⌘Z', disabled: true },
      { label: 'Rétablir', shortcut: '⇧⌘Z', disabled: true },
      { divider: true },
      { label: 'Couper', shortcut: '⌘X', disabled: true },
      { label: 'Copier', shortcut: '⌘C', disabled: true },
      { label: 'Coller', shortcut: '⌘V', disabled: true },
      { label: 'Tout sélectionner', shortcut: '⌘A', disabled: true },
    ],
    view: [
      {
        label: focusedWin?.maximized ? 'Quitter le plein écran' : 'Activer le plein écran',
        shortcut: '⌃⌘F',
        disabled: !focused,
        action: () => wm.toggleMaximize(focused),
      },
      { divider: true },
      { label: 'Changer le fond d’écran', action: cycleWallpaper },
      { label: 'Masquer la barre des menus', disabled: true },
    ],
    window: [
      { label: 'Réduire', shortcut: '⌘M', disabled: !focused, action: () => wm.minimizeApp(focused) },
      { label: 'Agrandir', disabled: !focused, action: () => wm.toggleMaximize(focused) },
      { divider: true },
      ...(wm.anyOpen
        ? APPS.filter((a) => wm.windows[a.id]?.open).map((a) => ({
            label: a.name,
            checked: a.id === focused,
            action: () => wm.openApp(a.id),
          }))
        : [{ label: 'Aucune fenêtre ouverte', disabled: true }]),
    ],
    help: [
      { label: 'Rechercher (Spotlight)', shortcut: '⌘K', action: openSpotlight },
      { divider: true },
      { label: 'Code source sur GitHub', action: () => window.open(profile.github, '_blank') },
      { label: 'Me contacter', action: () => wm.openApp('contact') },
    ],
  }

  const MENU_TITLES = [
    ['file', 'Fichier'],
    ['edit', 'Édition'],
    ['view', 'Présentation'],
    ['window', 'Fenêtre'],
    ['help', 'Aide'],
  ]

  const toggle = (id) => setOpenMenu((m) => (m === id ? null : id))
  // Un menu déjà ouvert : le survol d'un autre titre bascule dessus (comme macOS)
  const hoverSwitch = (id) => openMenu && openMenu !== id && setOpenMenu(id)

  return (
    <div className="mac-menubar" ref={rootRef}>
      <div className="menubar-left">
        <div className="menubar-entry">
          <button
            className={`menubar-apple ${openMenu === 'apple' ? 'open' : ''}`}
            onClick={() => toggle('apple')}
            onMouseEnter={() => hoverSwitch('apple')}
          >
            <svg width="14" height="16" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788 341c-6 4-109 62-109 190 0 148 130 200 134 202-1 3-21 71-69 141-43 61-88 122-156 122s-86-40-165-40c-77 0-104 41-167 41s-107-57-157-126C41 787 0 664 0 547c0-187 122-286 242-286 64 0 117 42 157 42 38 0 97-45 170-45 27 0 127 3 219 83zM554 172c32-38 55-91 55-144 0-7-1-15-2-21-52 2-114 35-152 78-29 33-57 86-57 140 0 8 2 16 2 19 3 0 9 1 14 1 47 0 106-31 140-73z" />
            </svg>
          </button>
          <AnimatePresence>
            {openMenu === 'apple' && (
              <MenuList items={menus.apple} onClose={() => setOpenMenu(null)} className="menubar-dropdown" />
            )}
          </AnimatePresence>
        </div>

        <span className="menubar-app-name">{appName}</span>

        {MENU_TITLES.map(([id, title]) => (
          <div className="menubar-entry" key={id}>
            <button
              className={`menubar-item ${openMenu === id ? 'open' : ''}`}
              onClick={() => toggle(id)}
              onMouseEnter={() => hoverSwitch(id)}
            >
              {title}
            </button>
            <AnimatePresence>
              {openMenu === id && (
                <MenuList items={menus[id]} onClose={() => setOpenMenu(null)} className="menubar-dropdown" />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="menubar-right">
        {/* Wi-Fi */}
        <div className="menubar-entry">
          <button
            className={`menubar-status-btn ${openMenu === 'wifi' ? 'open' : ''}`}
            onClick={() => toggle('wifi')}
            title="Wi-Fi"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" opacity={toggles.wifi ? 1 : 0.35}>
              <path d="M8 9.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM4.9 7.4a4.7 4.7 0 0 1 6.2 0l-1.2 1.3a3 3 0 0 0-3.8 0L4.9 7.4ZM2.4 4.9a8.2 8.2 0 0 1 11.2 0l-1.2 1.2a6.5 6.5 0 0 0-8.8 0L2.4 4.9ZM0 2.4a11.8 11.8 0 0 1 16 0l-1.2 1.3a10 10 0 0 0-13.6 0L0 2.4Z" />
            </svg>
          </button>
          <AnimatePresence>
            {openMenu === 'wifi' && (
              <MenuList
                className="menubar-dropdown align-right"
                onClose={() => setOpenMenu(null)}
                items={[
                  {
                    label: toggles.wifi ? 'Wi-Fi : activé' : 'Wi-Fi : désactivé',
                    action: () => setToggles((t) => ({ ...t, wifi: !t.wifi })),
                  },
                  { divider: true },
                  ...NETWORKS.map((n) => ({
                    label: n,
                    checked: toggles.wifi && n === wifiNetwork,
                    disabled: !toggles.wifi,
                    action: () => setWifiNetwork(n),
                  })),
                ]}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Spotlight */}
        <button className="menubar-status-btn" onClick={openSpotlight} title="Recherche Spotlight (⌘K)">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="6" cy="6" r="4.4" />
            <path d="M9.4 9.4 L13 13" strokeLinecap="round" />
          </svg>
        </button>

        {/* Centre de contrôle */}
        <div className="menubar-entry">
          <button
            className={`menubar-status-btn ${openMenu === 'cc' ? 'open' : ''}`}
            onClick={() => toggle('cc')}
            title="Centre de contrôle"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="1" width="16" height="6" rx="3" fillOpacity="0.9" />
              <circle cx="4" cy="4" r="2.2" fill="#1c1c22" />
              <rect x="0" y="9" width="16" height="6" rx="3" fillOpacity="0.9" />
              <circle cx="12" cy="12" r="2.2" fill="#1c1c22" />
            </svg>
          </button>
          <AnimatePresence>
            {openMenu === 'cc' && (
              <motion.div
                className="control-center"
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.08 } }}
                transition={{ duration: 0.12 }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="cc-toggles">
                  {[
                    ['wifi', 'Wi-Fi', '📶'],
                    ['bluetooth', 'Bluetooth', '🔵'],
                    ['airdrop', 'AirDrop', '📡'],
                    ['focus', 'Concentration', '🌙'],
                  ].map(([key, label, icon]) => (
                    <button
                      key={key}
                      className={`cc-toggle ${toggles[key] ? 'on' : ''}`}
                      onClick={() => setToggles((t) => ({ ...t, [key]: !t[key] }))}
                    >
                      <span className="cc-toggle-icon">{icon}</span>
                      <span className="cc-toggle-label">{label}</span>
                      <span className="cc-toggle-state">{toggles[key] ? 'Activé' : 'Désactivé'}</span>
                    </button>
                  ))}
                </div>
                <div className="cc-slider">
                  <label>☀️ Luminosité</label>
                  <BrightnessSlider />
                </div>
                <div className="cc-slider">
                  <label>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'} Son</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Batterie */}
        <div className="menubar-entry">
          <button
            className={`menubar-status-btn ${openMenu === 'battery' ? 'open' : ''}`}
            onClick={() => toggle('battery')}
            title="Batterie"
          >
            <svg width="22" height="11" viewBox="0 0 25 12">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
              <rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" />
              <path d="M23.5 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
            </svg>
          </button>
          <AnimatePresence>
            {openMenu === 'battery' && (
              <MenuList
                className="menubar-dropdown align-right"
                onClose={() => setOpenMenu(null)}
                items={[
                  { label: 'Batterie : 87 %', disabled: true },
                  { label: 'Source : adaptateur secteur', disabled: true },
                  { divider: true },
                  { label: 'Réglages de la batterie…', disabled: true },
                ]}
              />
            )}
          </AnimatePresence>
        </div>

        <span className="menubar-clock">
          {dateFmt.format(now)} {timeFmt.format(now)}
        </span>
      </div>
    </div>
  )
}

// Slider de luminosité : pilote réellement l'assombrissement du bureau
// via la variable CSS --desktop-dim (appliquée par Desktop.jsx).
function BrightnessSlider() {
  const [value, setValue] = useState(100)
  const apply = (v) => {
    setValue(v)
    document.documentElement.style.setProperty('--desktop-dim', String(((100 - v) / 100) * 0.72))
  }
  return <input type="range" min="15" max="100" value={value} onChange={(e) => apply(Number(e.target.value))} />
}
