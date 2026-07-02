import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WindowManagerProvider, useWindowManager } from './WindowManager.jsx'
import { DesktopStateContext } from './desktopState.js'
import MenuBar from './MenuBar.jsx'
import Dock from './Dock.jsx'
import MacWindow from './Window.jsx'
import MenuList from './MenuList.jsx'
import Spotlight from './Spotlight.jsx'
import { FileIcon, FolderIcon, GlobeIcon } from './icons.jsx'
import { APPS } from '../../apps/registry.jsx'
import { useLang } from '../../i18n.jsx'
import './macos.css'

export default function Desktop({ interactive, onExitRequest }) {
  return (
    <WindowManagerProvider>
      <DesktopInner interactive={interactive} onExitRequest={onExitRequest} />
    </WindowManagerProvider>
  )
}

let folderCounter = 0

const INITIAL_TRASH = [
  { id: 't1', name: 'ancien-portfolio-2019.html', emoji: '🌐' },
  { id: 't2', name: 'jquery-slider-final-V2(1).zip', emoji: '🗜️' },
  { id: 't3', name: 'idees-de-startup.txt', emoji: '💡' },
]

function DesktopInner({ interactive, onExitRequest }) {
  const desktopRef = useRef(null)
  const wm = useWindowManager()
  const { windows, anyOpen, anyVisible, focusedId } = wm
  const { t, profile, appName, lang, setLang } = useLang()

  const [wallpaper, setWallpaper] = useState(0)
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [ctxMenu, setCtxMenu] = useState(null) // { x, y, items }
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [renamingId, setRenamingId] = useState(null)
  const [desktopItems, setDesktopItems] = useState([
    { id: 'cv-file', type: 'file', name: `CV — ${profile.firstName}.pdf` },
  ])
  const [trashItems, setTrashItems] = useState(INITIAL_TRASH)

  const cycleWallpaper = useCallback(() => setWallpaper((w) => (w + 1) % 3), [])
  const emptyTrash = useCallback(() => setTrashItems([]), [])

  const newFolder = () => {
    folderCounter += 1
    const id = `folder-${folderCounter}`
    setDesktopItems((items) => [
      ...items,
      { id, type: 'folder', name: folderCounter === 1 ? t.desktop.untitledFolder : `${t.desktop.untitledFolder} ${folderCounter}` },
    ])
    setRenamingId(id)
    setSelectedIcon(id)
  }

  const moveToTrash = (id) => {
    const item = desktopItems.find((i) => i.id === id)
    if (!item) return
    setDesktopItems((items) => items.filter((i) => i.id !== id))
    setTrashItems((items) => [...items, { ...item, id: `trash-${item.id}-${Date.now()}` }])
  }

  // ── Verrouillage du scroll quand une fenêtre est visible ──────────
  useEffect(() => {
    const locked = interactive && anyVisible
    document.body.classList.toggle('desktop-locked', locked)
    return () => document.body.classList.remove('desktop-locked')
  }, [interactive, anyVisible])

  // ── Raccourci Spotlight (⌘K / Ctrl+K) ─────────────────────────────
  useEffect(() => {
    if (!interactive) return
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSpotlightOpen((s) => !s)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [interactive])

  // ── Menu contextuel (clic droit) ──────────────────────────────────
  // Pas besoin de tester `interactive` : tant que le zoom n'est pas
  // terminé, le cadre du bureau a pointer-events: none.
  const onContextMenu = (e) => {
    e.preventDefault()
    const iconEl = e.target.closest('.desktop-icon')
    const chrome = e.target.closest('.mac-window, .mac-dock-wrapper, .mac-menubar, .spotlight')
    const rect = desktopRef.current.getBoundingClientRect()
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    if (iconEl) {
      const id = iconEl.dataset.iconId
      const item = desktopItems.find((i) => i.id === id)
      setSelectedIcon(id)
      setCtxMenu({
        ...pos,
        items:
          item?.type === 'file'
            ? [
                { label: t.desktop.open, action: () => wm.openApp('cv') },
                { divider: true },
                { label: t.desktop.moveToTrash, disabled: true },
                { label: t.desktop.getInfo, disabled: true },
              ]
            : [
                { label: t.desktop.open, action: () => openFolder(item) },
                { label: t.desktop.rename, action: () => setRenamingId(id) },
                { divider: true },
                { label: t.desktop.moveToTrash, action: () => moveToTrash(id) },
              ],
      })
    } else if (!chrome) {
      setCtxMenu({
        ...pos,
        items: [
          { label: t.desktop.newFolder, action: newFolder },
          { divider: true },
          { label: t.desktop.changeWallpaper, action: cycleWallpaper },
          { label: t.desktop.cleanUp, disabled: true },
          { divider: true },
          { label: t.desktop.getInfo, disabled: true },
        ],
      })
    } else {
      setCtxMenu(null)
    }
  }

  // Fermer menu contextuel / désélectionner au clic
  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest('.mac-menu')) setCtxMenu(null)
      if (!e.target.closest('.desktop-icon')) setSelectedIcon(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])

  const openFolder = (item) => {
    window.__pendingFinderView = { type: 'folder', name: item.name }
    window.dispatchEvent(new CustomEvent('finder:navigate', { detail: { type: 'folder', name: item.name } }))
    wm.openApp('projects')
  }

  const focusedApp = APPS.find((a) => a.id === focusedId)

  const desktopState = { trashItems, emptyTrash }

  return (
    <DesktopStateContext.Provider value={desktopState}>
      <div className="mac-desktop" ref={desktopRef} onContextMenu={onContextMenu}>
        {/* Fond d'écran (3 ambiances, changées via menus / clic droit) */}
        <div className="mac-wallpaper" data-theme={wallpaper}>
          <div className="wp-blob wp-blob-1" />
          <div className="wp-blob wp-blob-2" />
          <div className="wp-blob wp-blob-3" />
          <div className="wp-grain" />
        </div>

        <MenuBar
          appName={focusedApp ? appName(focusedApp) : t.menubar.finder}
          onExitRequest={onExitRequest}
          cycleWallpaper={cycleWallpaper}
          openSpotlight={() => setSpotlightOpen(true)}
        />

        {/* Icônes du bureau (CV + dossiers créés + bascule de langue) */}
        <div className="desktop-icons">
          {desktopItems.map((item) => (
            <DesktopIcon
              key={item.id}
              item={item}
              selected={selectedIcon === item.id}
              renaming={renamingId === item.id}
              onSelect={() => setSelectedIcon(item.id)}
              onOpen={() => (item.type === 'file' ? wm.openApp('cv') : openFolder(item))}
              onRename={(name) => {
                setDesktopItems((items) =>
                  items.map((i) => (i.id === item.id ? { ...i, name: name || i.name } : i)),
                )
                setRenamingId(null)
              }}
            />
          ))}
          <motion.div
            className="desktop-icon"
            style={{ cursor: 'pointer' }}
            onDoubleClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            title={t.desktop.switchLang}
          >
            <span className="desktop-icon-img"><GlobeIcon /></span>
            <span className="desktop-icon-label">{t.desktop.switchLang}</span>
          </motion.div>
        </div>

        {/* Indication au premier affichage */}
        <AnimatePresence>
          {interactive && !anyOpen && (
            <motion.div
              className="desktop-hint"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <p>{t.desktop.hintTitle}</p>
              <span>{t.desktop.hintText}</span>
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

        {/* Spotlight */}
        <AnimatePresence>
          {spotlightOpen && <Spotlight onClose={() => setSpotlightOpen(false)} />}
        </AnimatePresence>

        {/* Menu contextuel */}
        <AnimatePresence>
          {ctxMenu && (
            <MenuList
              className="context-menu"
              style={{ left: ctxMenu.x, top: ctxMenu.y }}
              items={ctxMenu.items}
              onClose={() => setCtxMenu(null)}
            />
          )}
        </AnimatePresence>

        {/* Assombrissement piloté par le Centre de contrôle */}
        <div className="brightness-overlay" />
      </div>
    </DesktopStateContext.Provider>
  )
}

function DesktopIcon({ item, selected, renaming, onSelect, onOpen, onRename }) {
  const inputRef = useRef(null)
  useEffect(() => {
    if (renaming) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [renaming])

  return (
    <motion.div
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      data-icon-id={item.id}
      onPointerDown={onSelect}
      onDoubleClick={onOpen}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="desktop-icon-img">
        {item.type === 'file' ? <FileIcon /> : <FolderIcon />}
      </span>
      {renaming ? (
        <input
          ref={inputRef}
          className="desktop-icon-rename"
          defaultValue={item.name}
          onBlur={(e) => onRename(e.target.value.trim())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onRename(e.target.value.trim())
            if (e.key === 'Escape') onRename(item.name)
          }}
          onPointerDown={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="desktop-icon-label">{item.name}</span>
      )}
    </motion.div>
  )
}
