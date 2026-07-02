import { useEffect, useState } from 'react'

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

export default function MenuBar({ appName, onExitRequest }) {
  const now = useClock()

  return (
    <div className="mac-menubar">
      <div className="menubar-left">
        <button className="menubar-apple" onClick={onExitRequest} title="Revenir à l’accueil">
          <svg width="14" height="16" viewBox="0 0 814 1000" fill="currentColor">
            <path d="M788 341c-6 4-109 62-109 190 0 148 130 200 134 202-1 3-21 71-69 141-43 61-88 122-156 122s-86-40-165-40c-77 0-104 41-167 41s-107-57-157-126C41 787 0 664 0 547c0-187 122-286 242-286 64 0 117 42 157 42 38 0 97-45 170-45 27 0 127 3 219 83zM554 172c32-38 55-91 55-144 0-7-1-15-2-21-52 2-114 35-152 78-29 33-57 86-57 140 0 8 2 16 2 19 3 0 9 1 14 1 47 0 106-31 140-73z" />
          </svg>
        </button>
        <span className="menubar-app-name">{appName}</span>
        <span className="menubar-item">Fichier</span>
        <span className="menubar-item">Édition</span>
        <span className="menubar-item">Présentation</span>
        <span className="menubar-item">Fenêtre</span>
        <span className="menubar-item">Aide</span>
      </div>
      <div className="menubar-right">
        <svg className="menubar-status-icon" width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 9.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM4.9 7.4a4.7 4.7 0 0 1 6.2 0l-1.2 1.3a3 3 0 0 0-3.8 0L4.9 7.4ZM2.4 4.9a8.2 8.2 0 0 1 11.2 0l-1.2 1.2a6.5 6.5 0 0 0-8.8 0L2.4 4.9ZM0 2.4a11.8 11.8 0 0 1 16 0l-1.2 1.3a10 10 0 0 0-13.6 0L0 2.4Z" />
        </svg>
        <svg className="menubar-status-icon" width="22" height="11" viewBox="0 0 25 12">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" />
          <path d="M23.5 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
        </svg>
        <span className="menubar-clock">
          {dateFmt.format(now)} {timeFmt.format(now)}
        </span>
      </div>
    </div>
  )
}
