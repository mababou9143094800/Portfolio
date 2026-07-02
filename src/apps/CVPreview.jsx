import { useLang } from '../i18n.jsx'
import './apps.css'

export default function CVPreview() {
  const { t, profile } = useLang()
  return (
    <div className="cv">
      <div className="cv-toolbar">
        <span className="cv-toolbar-name">CV — {profile.firstName} {profile.lastName}.pdf</span>
        <a className="cv-download" href="/cv.pdf" download={`CV-${profile.firstName}-${profile.lastName}.pdf`}>
          {t.cv.download}
        </a>
      </div>
      <iframe
        className="cv-iframe"
        src="/cv.pdf"
        title={`CV ${profile.firstName} ${profile.lastName}`}
      />
    </div>
  )
}
