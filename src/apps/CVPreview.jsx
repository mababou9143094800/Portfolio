import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import './apps.css'

// Fenêtre style Aperçu affichant le CV, avec téléchargement du PDF
// (remplace public/cv.pdf par ton vrai CV).
export default function CVPreview() {
  const { t, profile, projects, pillars } = useLang()
  return (
    <div className="cv">
      <div className="cv-toolbar">
        <span className="cv-toolbar-name">CV — {profile.firstName} {profile.lastName}.pdf</span>
        <a className="cv-download" href="/cv.pdf" download={`CV-${profile.firstName}-${profile.lastName}.pdf`}>
          {t.cv.download}
        </a>
      </div>
      <div className="cv-page-wrap">
        <motion.div
          className="cv-page"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <header className="cv-header">
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>{profile.role} · {profile.location}</p>
            <p className="cv-contact">{profile.email}</p>
          </header>
          <section>
            <h3>{t.cv.profileSection}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{profile.bio}</p>
          </section>
          <section>
            <h3>{t.cv.recentProjects}</h3>
            {projects.slice(0, 3).map((p) => (
              <div className="cv-line" key={p.id}>
                <strong>{p.name}</strong> <em>({p.year})</em> — {p.stack.join(', ')}
              </div>
            ))}
          </section>
          <section>
            <h3>{t.cv.values}</h3>
            <p>{pillars.map((p) => p.title).join(' · ')}</p>
          </section>
          <p className="cv-placeholder-note">
            📄 {t.cv.note} <code>public/cv.pdf</code> {t.cv.noteEnd}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
