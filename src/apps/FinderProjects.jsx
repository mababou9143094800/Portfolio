import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../content.js'
import './apps.css'

// Fenêtre style Finder : sidebar à gauche, grille de projets, panneau
// de détail à droite quand un projet est sélectionné.
export default function FinderProjects() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = projects.find((p) => p.id === selectedId)

  return (
    <div className="finder">
      <aside className="finder-sidebar">
        <p className="finder-sidebar-heading">Favoris</p>
        <button className="finder-sidebar-item active">
          <span className="fs-icon">📁</span> Mes Projets
        </button>
        <button className="finder-sidebar-item">
          <span className="fs-icon">🕘</span> Récents
        </button>
        <button className="finder-sidebar-item">
          <span className="fs-icon">⬇️</span> Téléchargements
        </button>
        <p className="finder-sidebar-heading">Tags</p>
        <span className="finder-tag"><i style={{ background: '#4a90d9' }} /> Web</span>
        <span className="finder-tag"><i style={{ background: '#8e6fd8' }} /> Mobile</span>
        <span className="finder-tag"><i style={{ background: '#4ab87a' }} /> Open source</span>
      </aside>

      <div className="finder-main">
        <div className="finder-toolbar">
          <div className="finder-nav">
            <button className="finder-nav-btn" aria-label="Précédent">‹</button>
            <button className="finder-nav-btn" aria-label="Suivant">›</button>
          </div>
          <span className="finder-path">Mes Projets</span>
          <div className="finder-search">🔍</div>
        </div>

        <div className="finder-content">
          <div className="finder-grid">
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                className={`finder-item ${selectedId === p.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="finder-item-icon" style={{ background: `${p.color}26`, borderColor: `${p.color}55` }}>
                  {p.emoji}
                </span>
                <span className="finder-item-name">{p.name}</span>
                <span className="finder-item-year">{p.year}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.aside
                className="finder-detail"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              >
                <div className="finder-detail-icon" style={{ background: `${selected.color}26` }}>
                  {selected.emoji}
                </div>
                <h3>{selected.name}</h3>
                <p className="finder-detail-desc">{selected.description}</p>
                <div className="finder-detail-stack">
                  {selected.stack.map((s) => (
                    <span key={s} className="stack-chip" style={{ borderColor: `${selected.color}66` }}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="finder-detail-links">
                  <a href={selected.link} target="_blank" rel="noreferrer" className="detail-btn primary">
                    Voir le projet ↗
                  </a>
                  <a href={selected.repo} target="_blank" rel="noreferrer" className="detail-btn">
                    Code source
                  </a>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        <div className="finder-statusbar">
          {projects.length} éléments{selected ? ` — « ${selected.name} » sélectionné` : ''}
        </div>
      </div>
    </div>
  )
}
