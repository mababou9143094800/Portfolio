import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useWindowManager } from './WindowManager.jsx'

const MENUBAR_H = 28
const DOCK_SPACE = 86

export default function MacWindow({ app, index, state, desktopRef }) {
  const { closeApp, minimizeApp, toggleMaximize, focusApp, focusedId } = useWindowManager()
  const focused = focusedId === app.id

  const initial = useRef(null)
  if (initial.current === null) {
    const deskW = desktopRef.current?.offsetWidth ?? window.innerWidth
    const deskH = desktopRef.current?.offsetHeight ?? window.innerHeight
    const w = Math.min(app.width, deskW - 100)
    const h = Math.min(app.height, deskH - MENUBAR_H - DOCK_SPACE - 40)
    initial.current = {
      w,
      h,
      x: Math.max(20, (deskW - w) / 2 + (index - 1.5) * 70),
      y: Math.max(MENUBAR_H + 10, (deskH - h) / 2 - 30 + index * 26),
    }
  }

  const x = useMotionValue(initial.current.x)
  const y = useMotionValue(initial.current.y)
  const w = useMotionValue(initial.current.w)
  const h = useMotionValue(initial.current.h)
  const saved = useRef(null)
  const mountedRef = useRef(false)

  // ── Plein écran (bouton vert) : anime position + dimensions ──────
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    const spring = { type: 'spring', stiffness: 300, damping: 32 }
    if (state.maximized) {
      saved.current = { x: x.get(), y: y.get(), w: w.get(), h: h.get() }
      const deskW = desktopRef.current?.offsetWidth ?? window.innerWidth
      const deskH = desktopRef.current?.offsetHeight ?? window.innerHeight
      animate(x, 0, spring)
      animate(y, MENUBAR_H, spring)
      animate(w, deskW, spring)
      animate(h, deskH - MENUBAR_H - DOCK_SPACE, spring)
    } else if (saved.current) {
      animate(x, saved.current.x, spring)
      animate(y, saved.current.y, spring)
      animate(w, saved.current.w, spring)
      animate(h, saved.current.h, spring)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.maximized])

  // ── Déplacement à la souris depuis la barre de titre ─────────────
  const onTitlePointerDown = (e) => {
    if (state.maximized || e.button !== 0) return
    const el = e.currentTarget
    const startX = e.clientX
    const startY = e.clientY
    const baseX = x.get()
    const baseY = y.get()
    const deskW = desktopRef.current?.offsetWidth ?? window.innerWidth
    const deskH = desktopRef.current?.offsetHeight ?? window.innerHeight

    const onMove = (ev) => {
      const nx = baseX + (ev.clientX - startX)
      const ny = baseY + (ev.clientY - startY)
      x.set(Math.min(Math.max(nx, -w.get() + 120), deskW - 120))
      y.set(Math.min(Math.max(ny, MENUBAR_H), deskH - 50))
    }
    const onUp = () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
    }
    el.setPointerCapture(e.pointerId)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
  }

  // ── Redimensionnement par les bords / le coin ─────────────────────
  const onResizePointerDown = (dir) => (e) => {
    if (state.maximized || e.button !== 0) return
    e.stopPropagation()
    const el = e.currentTarget
    const startX = e.clientX
    const startY = e.clientY
    const baseW = w.get()
    const baseH = h.get()
    const deskW = desktopRef.current?.offsetWidth ?? window.innerWidth
    const deskH = desktopRef.current?.offsetHeight ?? window.innerHeight

    const onMove = (ev) => {
      if (dir.includes('r')) {
        const nw = baseW + (ev.clientX - startX)
        w.set(Math.min(Math.max(nw, 380), deskW - x.get()))
      }
      if (dir.includes('b')) {
        const nh = baseH + (ev.clientY - startY)
        h.set(Math.min(Math.max(nh, 280), deskH - y.get()))
      }
    }
    const onUp = () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
    }
    el.setPointerCapture(e.pointerId)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
  }

  // ── Variants ouverture / réduction / fermeture ───────────────────
  const variants = {
    hidden: { scale: 0.5, opacity: 0, y: 48 },
    open: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 380, damping: 30, mass: 0.9 },
    },
    // Effet « genie » simplifié : la fenêtre plonge vers le centre du Dock
    minimized: () => {
      const deskW = desktopRef.current?.offsetWidth ?? window.innerWidth
      const deskH = desktopRef.current?.offsetHeight ?? window.innerHeight
      return {
        x: deskW / 2 - (x.get() + w.get() / 2),
        y: deskH - y.get() - 30,
        scale: 0.05,
        opacity: 0,
        transition: { duration: 0.42, ease: [0.5, 0, 0.75, 0.4] },
      }
    },
    closed: { scale: 0.65, opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } },
  }

  const AppContent = app.component

  return (
    <motion.div
      className="mac-window"
      style={{
        x,
        y,
        width: w,
        height: h,
        zIndex: state.z,
        pointerEvents: state.minimized ? 'none' : 'auto',
      }}
      onPointerDownCapture={() => focusApp(app.id)}
    >
      <motion.div
        className={`mac-window-inner ${focused ? 'focused' : ''} ${state.maximized ? 'maximized' : ''}`}
        variants={variants}
        initial="hidden"
        animate={state.minimized ? 'minimized' : 'open'}
        exit="closed"
      >
        <div
          className="mac-titlebar"
          onPointerDown={onTitlePointerDown}
          onDoubleClick={() => toggleMaximize(app.id)}
        >
          <div className="traffic-lights" onPointerDown={(e) => e.stopPropagation()}>
            <button
              className="tl tl-close"
              onClick={() => closeApp(app.id)}
              aria-label="Fermer"
            >
              <svg viewBox="0 0 12 12">
                <path d="M3.2 3.2l5.6 5.6M8.8 3.2l-5.6 5.6" stroke="#7d1d17" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="tl tl-min"
              onClick={() => minimizeApp(app.id)}
              aria-label="Réduire"
            >
              <svg viewBox="0 0 12 12">
                <path d="M2.5 6h7" stroke="#9a6b07" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="tl tl-max"
              onClick={() => toggleMaximize(app.id)}
              aria-label="Agrandir"
            >
              <svg viewBox="0 0 12 12">
                <path d="M3.5 6.8V3.5h3.3zM8.5 5.2v3.3H5.2z" fill="#1d6f24" />
              </svg>
            </button>
          </div>
          <span className="mac-window-title">{app.name}</span>
          <span className="titlebar-spacer" />
        </div>
        <div className="mac-window-body">
          <AppContent />
        </div>

        {/* Poignées de redimensionnement */}
        {!state.maximized && (
          <>
            <div className="resize-handle resize-r" onPointerDown={onResizePointerDown('r')} />
            <div className="resize-handle resize-b" onPointerDown={onResizePointerDown('b')} />
            <div className="resize-handle resize-br" onPointerDown={onResizePointerDown('rb')} />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
