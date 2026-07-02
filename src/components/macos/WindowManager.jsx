import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

// Gestion centralisée des fenêtres : ouverture, fermeture, réduction,
// plein écran et ordre d'empilement (focus).
const WindowManagerContext = createContext(null)

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState({})
  const zCounter = useRef(10)

  const openApp = useCallback((id) => {
    zCounter.current += 1
    const z = zCounter.current
    setWindows((prev) => {
      const win = prev[id]
      if (win?.open) {
        // Déjà ouverte : on la restaure si réduite, et on la met au premier plan
        return { ...prev, [id]: { ...win, minimized: false, z } }
      }
      return { ...prev, [id]: { open: true, minimized: false, maximized: false, z } }
    })
  }, [])

  const closeApp = useCallback((id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], open: false } }))
  }, [])

  const minimizeApp = useCallback((id) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }))
  }, [])

  const toggleMaximize = useCallback((id) => {
    zCounter.current += 1
    const z = zCounter.current
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], maximized: !prev[id].maximized, z },
    }))
  }, [])

  const focusApp = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]?.open || prev[id].z === zCounter.current) return prev
      zCounter.current += 1
      return { ...prev, [id]: { ...prev[id], z: zCounter.current } }
    })
  }, [])

  const value = useMemo(() => {
    const openWindows = Object.entries(windows).filter(([, w]) => w.open)
    const visible = openWindows.filter(([, w]) => !w.minimized)
    const focusedId = visible.length
      ? visible.reduce((a, b) => (a[1].z > b[1].z ? a : b))[0]
      : null
    return {
      windows,
      focusedId,
      anyOpen: openWindows.length > 0,
      anyVisible: visible.length > 0,
      openApp,
      closeApp,
      minimizeApp,
      toggleMaximize,
      focusApp,
    }
  }, [windows, openApp, closeApp, minimizeApp, toggleMaximize, focusApp])

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) throw new Error('useWindowManager doit être utilisé dans WindowManagerProvider')
  return ctx
}

// Variante tolérante pour les composants d'apps partagés avec la version
// iOS, qui s'affichent hors du provider.
export function useOptionalWindowManager() {
  return useContext(WindowManagerContext)
}
