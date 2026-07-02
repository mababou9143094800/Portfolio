import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WindowManagerProvider, useWindowManager } from './WindowManager.jsx'
import MenuBar from './MenuBar.jsx'
import Dock from './Dock.jsx'
import MacWindow from './Window.jsx'
import { APPS } from '../../apps/registry.jsx'
import './macos.css'

export default function Desktop({ interactive, onExitRequest }) {
  return (
    <WindowManagerProvider>
      <DesktopInner interactive={interactive} onExitRequest={onExitRequest} />
    </WindowManagerProvider>
  )
}

function DesktopInner({ interactive, onExitRequest }) {
  const desktopRef = useRef(null)
  const { windows, anyOpen, anyVisible, focusedId } = useWindowManager()

  // Quand une fenêtre est visible, on verrouille le scroll de la page :
  // impossible de dézoomer sans avoir tout fermé ou réduit d'abord.
  useEffect(() => {
    const locked = interactive && anyVisible
    document.body.classList.toggle('desktop-locked', locked)
    return () => document.body.classList.remove('desktop-locked')
  }, [interactive, anyVisible])

  const focusedApp = APPS.find((a) => a.id === focusedId)

  return (
    <div className="mac-desktop" ref={desktopRef}>
      {/* Fond d'écran abstrait façon Sequoia sombre */}
      <div className="mac-wallpaper">
        <div className="wp-blob wp-blob-1" />
        <div className="wp-blob wp-blob-2" />
        <div className="wp-blob wp-blob-3" />
        <div className="wp-grain" />
      </div>

      <MenuBar appName={focusedApp?.name ?? 'Finder'} onExitRequest={onExitRequest} />

      {/* Indication au premier affichage */}
      <AnimatePresence>
        {interactive && !anyOpen && (
          <motion.div
            className="desktop-hint"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <p>Bienvenue sur mon bureau 👋</p>
            <span>Ouvrez une application depuis le Dock — ou remontez pour revenir à l’accueil.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fenêtres */}
      <div className="mac-windows-layer">
        <AnimatePresence>
          {APPS.map(
            (app, i) =>
              windows[app.id]?.open && (
                <MacWindow
                  key={app.id}
                  app={app}
                  index={i}
                  state={windows[app.id]}
                  desktopRef={desktopRef}
                />
              ),
          )}
        </AnimatePresence>
      </div>

      <Dock />
    </div>
  )
}
