import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './apps.css'

const GRID = 20
const CELL = 20
const SIZE = GRID * CELL
const BASE_SPEED = 130 // ms par case
const MIN_SPEED = 65

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const KEYMAP = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  // ZQSD (clavier français) + WASD
  z: 'up', s: 'down', q: 'left', d: 'right',
  w: 'up', a: 'left',
}

function randomFood(snake) {
  while (true) {
    const f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f
  }
}

export default function SnakeGame() {
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | playing | over
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('snake-best') ?? 0))

  const game = useRef(null)
  const statusRef = useRef(status)
  statusRef.current = status

  const start = () => {
    game.current = {
      snake: [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }],
      dir: DIRS.right,
      nextDir: DIRS.right,
      food: { x: 14, y: 10 },
      grow: 0,
      lastTick: 0,
      speed: BASE_SPEED,
    }
    setScore(0)
    setStatus('playing')
  }

  // ── Boucle de jeu ─────────────────────────────────────────────────
  useEffect(() => {
    if (status !== 'playing') return
    let raf

    const loop = (t) => {
      const g = game.current
      if (!g.lastTick) g.lastTick = t

      if (t - g.lastTick >= g.speed) {
        g.lastTick = t
        g.dir = g.nextDir
        const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }

        const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
        const hitSelf = g.snake.some((s) => s.x === head.x && s.y === head.y)
        if (hitWall || hitSelf) {
          setStatus('over')
          setBest((b) => {
            const nb = Math.max(b, g.score ?? 0)
            localStorage.setItem('snake-best', String(nb))
            return nb
          })
          return
        }

        g.snake.unshift(head)
        if (head.x === g.food.x && head.y === g.food.y) {
          g.food = randomFood(g.snake)
          g.score = (g.score ?? 0) + 10
          g.speed = Math.max(MIN_SPEED, BASE_SPEED - g.score * 0.8)
          setScore(g.score)
        } else {
          g.snake.pop()
        }
      }

      draw(canvasRef.current, game.current)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [status])

  // ── Clavier ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      // Ne pas intercepter la saisie dans un champ texte (ex : fenêtre Mail)
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const dirName = KEYMAP[e.key.length === 1 ? e.key.toLowerCase() : e.key]
      if (dirName) {
        e.preventDefault()
        if (statusRef.current !== 'playing') return
        const g = game.current
        const nd = DIRS[dirName]
        // Interdit le demi-tour instantané
        if (nd.x !== -g.dir.x || nd.y !== -g.dir.y) g.nextDir = nd
      } else if ((e.key === ' ' || e.key === 'Enter') && statusRef.current !== 'playing') {
        e.preventDefault()
        start()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // ── Swipe tactile (mobile) ────────────────────────────────────────
  const touchStart = useRef(null)
  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchMove = (e) => {
    if (!touchStart.current || statusRef.current !== 'playing') return
    const dx = e.touches[0].clientX - touchStart.current.x
    const dy = e.touches[0].clientY - touchStart.current.y
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return
    const g = game.current
    const nd = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? DIRS.right : DIRS.left)
      : (dy > 0 ? DIRS.down : DIRS.up)
    if (nd.x !== -g.dir.x || nd.y !== -g.dir.y) g.nextDir = nd
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  // Dessin initial (plateau vide)
  useEffect(() => {
    draw(canvasRef.current, game.current)
  }, [])

  return (
    <div className="snake" onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div className="snake-header">
        <div className="snake-score">
          <span className="snake-score-label">Score</span>
          <motion.span key={score} className="snake-score-value" initial={{ scale: 1.4 }} animate={{ scale: 1 }}>
            {score}
          </motion.span>
        </div>
        <div className="snake-score">
          <span className="snake-score-label">Record</span>
          <span className="snake-score-value best">{best}</span>
        </div>
      </div>

      <div className="snake-board">
        <canvas ref={canvasRef} width={SIZE} height={SIZE} />
        <AnimatePresence>
          {status !== 'playing' && (
            <motion.div
              className="snake-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {status === 'over' && (
                <motion.p
                  className="snake-gameover"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  Game Over
                </motion.p>
              )}
              <motion.button
                className="snake-start"
                onClick={start}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {status === 'over' ? 'Rejouer' : 'Jouer'}
              </motion.button>
              <p className="snake-help">Flèches ou ZQSD — swipe sur mobile</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Rendu canvas ──────────────────────────────────────────────────────
function draw(canvas, g) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // Plateau : damier sombre très subtil
  ctx.fillStyle = '#141419'
  ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = 'rgba(255,255,255,0.022)'
  for (let yy = 0; yy < GRID; yy++) {
    for (let xx = 0; xx < GRID; xx++) {
      if ((xx + yy) % 2 === 0) ctx.fillRect(xx * CELL, yy * CELL, CELL, CELL)
    }
  }

  if (!g) return

  // Pomme
  const fx = g.food.x * CELL + CELL / 2
  const fy = g.food.y * CELL + CELL / 2
  ctx.fillStyle = '#ff5f57'
  ctx.beginPath()
  ctx.arc(fx, fy + 1, CELL / 2 - 3.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#8b5a2b'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(fx, fy - 6)
  ctx.quadraticCurveTo(fx + 3, fy - 10, fx + 5, fy - 10)
  ctx.stroke()

  // Serpent : dégradé de la tête à la queue, segments arrondis
  g.snake.forEach((s, i) => {
    const t = i / Math.max(g.snake.length - 1, 1)
    const light = 62 - t * 22
    ctx.fillStyle = `hsl(135, 65%, ${light}%)`
    const pad = 1.5
    roundRect(ctx, s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 6)
    ctx.fill()
  })

  // Yeux sur la tête
  const head = g.snake[0]
  const hx = head.x * CELL + CELL / 2
  const hy = head.y * CELL + CELL / 2
  const ex = g.dir.y !== 0 ? 4.5 : 0
  const ey = g.dir.x !== 0 ? 4.5 : 0
  const ox = g.dir.x * 3
  const oy = g.dir.y * 3
  ctx.fillStyle = '#10261a'
  ctx.beginPath()
  ctx.arc(hx - ex + ox, hy - ey + oy, 2.1, 0, Math.PI * 2)
  ctx.arc(hx + ex + ox, hy + ey + oy, 2.1, 0, Math.PI * 2)
  ctx.fill()
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
