import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, profile } from '../content.js'
import { useOptionalWindowManager } from '../components/macos/WindowManager.jsx'
import './apps.css'

const TAGS = [
  ['Web', '#4a90d9'],
  ['Mobile', '#8e6fd8'],
  ['Open source', '#4ab87a'],
]

const VIEW_LABELS = {
  all: 'Mes Projets',
  recent: 'Récents',
  downloads: 'Téléchargements',
}

// Fenêtre style Finder : sidebar, recherche, tags et navigation
// précédent/suivant réellement fonctionnels.
export default function FinderProjects() {
  const wm = useOptionalWindowManager()
  const [history, setHistory] = useState([{ type: 'all' }])
  const [histIndex, setHistIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const view = history[histIndex]

  const navigate = (v) => {
    if (JSON.stringify(v) === JSON.stringify(view)) return
    setHistory((h) => [...h.slice(0, histIndex + 1), v])
    setHistIndex((i) => i + 1)
    setSelectedId(null)
    setQuery('')
  }
  const goBack = () => histIndex > 0 && (setHistIndex(histIndex - 1), setSelectedId(null))
  const goForward = () =>
    histIndex < history.length - 1 && (setHistIndex(histIndex + 1), setSelectedId(null))

  // Sélection demandée par Spotlight / ouverture d'un dossier du bureau
  useEffect(() => {
    if (window.__pendingProject) {
      setSelectedId(window.__pendingProject)
      window.__pendingProject = null
    }
    if (window.__pendingFinderView) {
      const v = window.__pendingFinderView
      window.__pendingFinderView = null
      setHistory((h) => [...h, v])
      setHistIndex((i) => i + 1)
    }
    const onSelect = (e) => {
      navigate({ type: 'all' })
      setSelectedId(e.detail)
    }
    const onNavigate = (e) => navigate(e.detail)
    window.addEventListener('finder:select', onSelect)
    window.addEventListener('finder:navigate', onNavigate)
    return () => {
      window.removeEventListener('finder:select', onSelect)
      window.removeEventListener('finder:navigate', onNavigate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [histIndex, history])

  // ── Contenu selon la vue + recherche ──────────────────────────────
  const items = useMemo(() => {
    let list = projects
    if (view.type === 'recent') {
      list = [...projects].sort((a, b) => b.year.localeCompare(a.year)).slice(0, 3)
    } else if (view.type === 'tag') {
      list = projects.filter((p) => p.tags?.includes(view.tag))
    } else if (view.type === 'downloads' || view.type === 'folder') {
      list = []
    }
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.stack.some((s) => s.toLowerCase().includes(q)),
      )
    }
    return list
  }, [view, query])

  const selected = projects.find((p) => p.id === selectedId)
  const pathLabel = view.type === 'tag' ? view.tag : view.type === 'folder' ? view.name : VIEW_LABELS[view.type]

  const openCV = () => {
    if (wm) wm.openApp('cv')
    else window.open('/cv.pdf', '_blank')
  }

  return (
    <div className="finder">
      <aside className="finder-sidebar">
        <p className="finder-sidebar-heading">Favoris</p>
        <button
          className={`finder-sidebar-item ${view.type === 'all' ? 'active' : ''}`}
          onClick={() => navigate({ type: 'all' })}
        >
          <span className="fs-icon">📁</span> Mes Projets
        </button>
        <button
          className={`finder-sidebar-item ${view.type === 'recent' ? 'active' : ''}`}
          onClick={() => navigate({ type: 'recent' })}
        >
          <span className="fs-icon">🕘</span> Récents
        </button>
        <button
          className={`finder-sidebar-item ${view.type === 'downloads' ? 'active' : ''}`}
          onClick={() => navigate({ type: 'downloads' })}
        >
          <span className="fs-icon">⬇️</span> Téléchargements
        </button>
        <p className="finder-sidebar-heading">Tags</p>
        {TAGS.map(([tag, color]) => (
          <button
            key={tag}
            className={`finder-sidebar-item finder-tag-btn ${view.type === 'tag' && view.tag === tag ? 'active' : ''}`}
            onClick={() => navigate({ type: 'tag', tag })}
          >
            <i className="finder-tag-dot" style={{ background: color }} /> {tag}
          </button>
        ))}
      </aside>

      <div className="finder-main">
        <div className="finder-toolbar">
          <div className="finder-nav">
            <button
              className="finder-nav-btn"
              onClick={goBack}
              disabled={histIndex === 0}
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              className="finder-nav-btn"
              onClick={goForward}
              disabled={histIndex >= history.length - 1}
              aria-label="Suivant"
            >
              ›
            </button>
          </div>
          <span className="finder-path">{pathLabel}</span>
          <div className="finder-search-box">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.5">
              <circle cx="6" cy="6" r="4.4" />
              <path d="M9.4 9.4 L13 13" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="finder-content">
          <div className="finder-grid">
            {items.map((p, i) => (
              <motion.button
                key={p.id}
                className={`finder-item ${selectedId === p.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + i * 0.04, duration: 0.3, ease: 'easeOut' }}
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

            {view.type === 'downloads' && !query && (
              <motion.button
                className="finder-item"
                onDoubleClick={openCV}
                onClick={openCV}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="finder-item-icon finder-item-file">📄</span>
                <span className="finder-item-name">CV — {profile.firstName}.pdf</span>
                <span className="finder-item-year">PDF</span>
              </motion.button>
            )}

            {items.length === 0 && view.type !== 'downloads' && (
              <p className="finder-empty">
                {view.type === 'folder' ? 'Ce dossier est vide.' : 'Aucun résultat.'}
              </p>
            )}
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
          {view.type === 'downloads' ? 1 : items.length} élément
          {(view.type === 'downloads' ? 1 : items.length) > 1 ? 's' : ''}
          {selected ? ` — « ${selected.name} » sélectionné` : ''}
        </div>
      </div>
    </div>
  )
}
