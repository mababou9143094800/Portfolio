import { AnimatePresence, motion } from 'framer-motion'
import { useDesktopState } from '../components/macos/desktopState.js'
import { FolderIcon } from '../components/macos/icons.jsx'
import './apps.css'

// Fenêtre Corbeille : contient quelques reliques + les dossiers que le
// visiteur a supprimés du bureau.
export default function TrashApp() {
  const desktop = useDesktopState()
  const items = desktop?.trashItems ?? []

  return (
    <div className="trash">
      <div className="trash-toolbar">
        <span>{items.length === 0 ? 'La corbeille est vide' : `${items.length} élément${items.length > 1 ? 's' : ''}`}</span>
        <button
          className="trash-empty-btn"
          disabled={items.length === 0}
          onClick={() => desktop?.emptyTrash()}
        >
          Vider la corbeille
        </button>
      </div>
      <div className="trash-grid">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="trash-item"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3, rotate: -12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              title={item.name}
            >
              <span className="trash-item-icon">
                {item.type === 'folder' ? <FolderIcon /> : <span className="trash-item-emoji">{item.emoji ?? '📄'}</span>}
              </span>
              <span className="trash-item-name">{item.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <motion.p className="trash-empty-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Rien ici. Comme ma dette technique. 🧹
          </motion.p>
        )}
      </div>
    </div>
  )
}
