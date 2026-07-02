import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import Desktop from './macos/Desktop.jsx'
import { profile } from '../content.js'
import './landing.css'

// La page fait ~3 hauteurs d'écran : le scroll pilote le zoom progressif
// du mini-bureau (à droite du hero) jusqu'au plein écran.
export default function LandingZoom() {
  const containerRef = useRef(null)
  const [zoomed, setZoomed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })

  // Bureau : de vignette à droite → plein écran centré
  const scale = useTransform(progress, [0, 1], [0.34, 1])
  const x = useTransform(progress, [0, 1], ['29%', '0%'])
  const y = useTransform(progress, [0, 1], ['0%', '0%'])
  const radius = useTransform(progress, [0, 0.9, 1], [40, 24, 0])
  const frameOpacity = useTransform(progress, [0.85, 1], [1, 0])

  // Hero : sort par la gauche pendant le zoom
  const heroOpacity = useTransform(progress, [0, 0.3], [1, 0])
  const heroX = useTransform(progress, [0, 0.35], ['0%', '-12%'])
  const arrowOpacity = useTransform(progress, [0, 0.12], [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const isZoomed = v > 0.95
    setZoomed((prev) => (prev !== isZoomed ? isZoomed : prev))
  })

  const scrollToDesktop = () => {
    const el = containerRef.current
    if (!el) return
    const top = el.offsetTop + el.offsetHeight - window.innerHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="zoom-container" ref={containerRef}>
      <div className="zoom-sticky">
        <div className="landing-backdrop" />

        {/* ── Présentation ─────────────────────────────── */}
        <motion.header
          className="hero"
          style={{ opacity: heroOpacity, x: heroX, pointerEvents: zoomed ? 'none' : 'auto' }}
        >
          <motion.p
            className="hero-hello"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Bonjour, je suis
          </motion.p>
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.firstName}
            <span className="hero-name-last"> {profile.lastName}</span>
          </motion.h1>
          <motion.h2
            className="hero-role"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.role}
          </motion.h2>
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.bio}
          </motion.p>
          <motion.button
            className="hero-cta"
            onClick={scrollToDesktop}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Explorer mon bureau
          </motion.button>
        </motion.header>

        {/* ── Bureau macOS zoomable ────────────────────── */}
        <motion.div
          className="desktop-zoom-frame"
          style={{
            scale,
            x,
            y,
            borderRadius: radius,
            pointerEvents: zoomed ? 'auto' : 'none',
          }}
        >
          <motion.div className="desktop-bezel" style={{ opacity: frameOpacity }} />
          <Desktop interactive={zoomed} onExitRequest={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </motion.div>

        {/* ── Flèche scroll ────────────────────────────── */}
        <motion.button
          className="scroll-arrow"
          style={{ opacity: arrowOpacity, pointerEvents: zoomed ? 'none' : 'auto' }}
          onClick={scrollToDesktop}
          aria-label="Faire défiler vers le bureau"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <span className="scroll-arrow-label">Scroll</span>
          <motion.svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M12 4v14m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      </div>
    </div>
  )
}
