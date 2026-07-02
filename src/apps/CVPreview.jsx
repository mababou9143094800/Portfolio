import { motion } from 'framer-motion'
import { profile, projects, pillars } from '../content.js'
import './apps.css'

// Fenêtre style Aperçu affichant le CV, avec téléchargement du PDF
// (remplace public/cv.pdf par ton vrai CV).
export default function CVPreview() {
  return (
    <div className="cv">
      <div className="cv-toolbar">
        <span className="cv-toolbar-name">CV — {profile.firstName} {profile.lastName}.pdf</span>
        <a className="cv-download" href="/cv.pdf" download={`CV-${profile.firstName}-${profile.lastName}.pdf`}>
          ⬇ Télécharger
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
            <h3>Profil</h3>
            <p>{profile.bio}</p>
          </section>
          <section>
            <h3>Projets récents</h3>
            {projects.slice(0, 3).map((p) => (
              <div className="cv-line" key={p.id}>
                <strong>{p.name}</strong> <em>({p.year})</em> — {p.stack.join(', ')}
              </div>
            ))}
          </section>
          <section>
            <h3>Valeurs</h3>
            <p>{pillars.map((p) => p.title).join(' · ')}</p>
          </section>
          <p className="cv-placeholder-note">
            📄 Contenu d'exemple — remplace <code>public/cv.pdf</code> par ton vrai CV.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
