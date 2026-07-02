import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
} from 'framer-motion'
import { useWindowManager } from './WindowManager.jsx'
import { APPS } from '../../apps/registry.jsx'

const ICON_SIZE = 52
const ICON_SIZE_MAX = 88
const MAGNIFY_RANGE = 150

export default function Dock() {
  // Position X du curseur : pilote l'effet de loupe du Dock
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="mac-dock-wrapper">
      <motion.div
        className="mac-dock"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {APPS.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  )
}

function DockIcon({ app, mouseX }) {
  const ref = useRef(null)
  const { windows, openApp } = useWindowManager()
  const bounce = useAnimationControls()

  const state = windows[app.id]
  const isOpen = Boolean(state?.open)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds || val === Infinity) return MAGNIFY_RANGE
    return val - (bounds.x + bounds.width / 2)
  })

  const sizeRaw = useTransform(
    distance,
    [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE],
    [ICON_SIZE, ICON_SIZE_MAX, ICON_SIZE],
  )
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 200, damping: 14 })

  const handleClick = () => {
    if (!isOpen) {
      // Rebond façon macOS au lancement
      bounce.start({
        y: [0, -26, 0, -12, 0],
        transition: { duration: 0.8, ease: 'easeOut' },
      })
    }
    openApp(app.id)
  }

  const Icon = app.icon

  return (
    <div className="dock-item">
      <span className="dock-tooltip">{app.name}</span>
      <motion.button
        ref={ref}
        className="dock-icon"
        style={{ width: size, height: size }}
        animate={bounce}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        aria-label={`Ouvrir ${app.name}`}
      >
        <Icon />
      </motion.button>
      <span className={`dock-dot ${isOpen ? 'visible' : ''}`} />
    </div>
  )
}
