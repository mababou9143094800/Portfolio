import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import './apps.css'

// Mes 4 piliers : grille 2×2 de cartes animées.
export default function Pillars() {
  const { t, pillars } = useLang()
  return (
    <div className="pillars">
      <motion.p
        className="pillars-intro"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.pillarsApp.intro}
      </motion.p>
      <div className="pillars-grid">
        {pillars.map((p, i) => (
          <motion.article
            key={p.id}
            className="pillar-card"
            style={{ '--pillar-color': p.color }}
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12 + i * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <span className="pillar-icon">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <span className="pillar-index">0{i + 1}</span>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
