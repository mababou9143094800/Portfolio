import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import './apps.css'

// « À propos de ce Mac », version portfolio.
export default function AboutMac() {
  const { t, profile } = useLang()
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
        <div><span>{t.about.location}</span>{profile.location}</div>
        <div><span>{t.about.specialty}</span>{t.about.specialtyValue}</div>
        <div><span>{t.about.site}</span>{t.about.siteValue}</div>
        <div><span>{t.about.version}</span>{t.about.versionValue}</div>
      </div>
      <a className="about-btn" href={`mailto:${profile.email}`}>
        {t.about.contact}
      </a>
    </div>
  )
}
