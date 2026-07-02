import { motion } from 'framer-motion'

// Liste de menu générique (menus déroulants de la barre de menu + menus
// contextuels). items : { label, shortcut?, disabled?, checked?, divider?, action? }
export default function MenuList({ items, onClose, className = '', style }) {
  return (
    <motion.div
      className={`mac-menu ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.96, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.08 } }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item.divider ? (
          <div className="mac-menu-divider" key={`d${i}`} />
        ) : (
          <button
            key={item.label + i}
            className={`mac-menu-item ${item.disabled ? 'disabled' : ''}`}
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return
              item.action?.()
              onClose?.()
            }}
          >
            <span className="mac-menu-check">{item.checked ? '✓' : ''}</span>
            <span className="mac-menu-label">{item.label}</span>
            {item.shortcut && <span className="mac-menu-shortcut">{item.shortcut}</span>}
          </button>
        ),
      )}
    </motion.div>
  )
}
