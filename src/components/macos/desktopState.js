import { createContext, useContext } from 'react'

// État partagé du bureau (corbeille, fond d'écran…) accessible depuis les
// apps (ex : la fenêtre Corbeille) sans dépendance circulaire.
export const DesktopStateContext = createContext(null)

export function useDesktopState() {
  return useContext(DesktopStateContext)
}
