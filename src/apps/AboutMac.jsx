import { motion } from 'framer-motion'
import { profile } from '../content.js'
import './apps.css'

// « À propos de ce Mac », version portfolio.
export default function AboutMac() {
  return (
    <div className="about">
      <motion.div
        className="about-avatar"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        👨‍💻
      </motion.div>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <p className="about-role">{profile.role}</p>
      <div className="about-specs">
        <div><span>Localisation</span>{profile.location}</div>
        <div><span>Spécialité</span>Web full-stack</div>
        <div><span>Site</span>Fait main — React + Framer Motion</div>
        <div><span>Version</span>Portfolio 1.0 « Sequoia »</div>
      </div>
      <a className="about-btn" href={`mailto:${profile.email}`}>
        Me contacter…
      </a>
    </div>
  )
}
