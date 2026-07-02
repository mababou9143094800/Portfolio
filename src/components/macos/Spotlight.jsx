import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useWindowManager } from './WindowManager.jsx'
import { APPS } from '../../apps/registry.jsx'
import { projects } from '../../content.js'

// Recherche Spotlight : apps + projets, navigation clavier complète.
export default function Spotlight({ onClose }) {
  const wm = useWindowManager()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const apps = APPS.filter((a) => a.dock !== false || a.id === 'cv')
      .filter((a) => !q || a.name.toLowerCase().includes(q))
      .map((a) => ({
        type: 'Applications',
        id: `app-${a.id}`,
        label: a.name,
        icon: a.icon,
        run: () => wm.openApp(a.id),
      }))
    const projs = projects
      .filter(
        (p) =>
          q &&
          (p.name.toLowerCase().includes(q) ||
            p.stack.some((s) => s.toLowerCase().includes(q))),
      )
      .map((p) => ({
        type: 'Projets',
        id: `proj-${p.id}`,
        label: p.name,
        emoji: p.emoji,
        run: () => {
          window.__pendingProject = p.id
          window.dispatchEvent(new CustomEvent('finder:select', { detail: p.id }))
          wm.openApp('projects')
        },
      }))
    return [...apps, ...projs]
  }, [query, wm])

  useEffect(() => setIndex(0), [query])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[index]) {
      results[index].run()
      onClose()
    }
  }

  let lastType = null

  return (
    <motion.div
      className="spotlight-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      onPointerDown={onClose}
    >
      <motion.div
        className="spotlight"
        initial={{ scale: 0.92, opacity: 0, y: -12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.1 } }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="spotlight-input-row">
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.5">
            <circle cx="6" cy="6" r="4.4" />
            <path d="M9.4 9.4 L13 13" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Recherche Spotlight"
            spellCheck={false}
          />
        </div>
        {results.length > 0 && (
          <div className="spotlight-results">
            {results.map((r, i) => {
              const showHeader = r.type !== lastType
              lastType = r.type
              return (
                <div key={r.id}>
                  {showHeader && <p className="spotlight-section">{r.type}</p>}
                  <button
                    className={`spotlight-result ${i === index ? 'active' : ''}`}
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => {
                      r.run()
                      onClose()
                    }}
                  >
                    <span className="spotlight-result-icon">
                      {r.icon ? <r.icon /> : <span className="spotlight-emoji">{r.emoji}</span>}
                    </span>
                    {r.label}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
