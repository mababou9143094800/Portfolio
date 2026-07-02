// Icônes d'applications dessinées en SVG, fidèles au style macOS Big Sur+
// (carré arrondi « squircle », dégradés, glyphes blancs).

const SQUIRCLE =
  'M0 46C0 15 15 0 46 0h28c31 0 46 15 46 46v28c0 31-15 46-46 46H46C15 120 0 105 0 74V46Z'

function IconBase({ children, gradient, id }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          {gradient.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <path d={SQUIRCLE} />
        </clipPath>
      </defs>
      <path d={SQUIRCLE} fill={`url(#grad-${id})`} />
      <g clipPath={`url(#clip-${id})`}>{children}</g>
      <path d={SQUIRCLE} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
    </svg>
  )
}

// ── Finder (Projets) ─────────────────────────────────────────────────
export function FinderIcon() {
  return (
    <IconBase id="finder" gradient={[['0', '#4fc3f7'], ['1', '#1e88e5']]}>
      {/* moitié claire / moitié foncée du visage Finder */}
      <path d="M60 0 C30 34 30 86 60 120 L120 120 L120 0 Z" fill="#1565c0" opacity="0.55" />
      {/* yeux */}
      <rect x="34" y="38" width="7" height="22" rx="3.5" fill="#fff" />
      <rect x="79" y="38" width="7" height="22" rx="3.5" fill="#fff" />
      {/* sourire */}
      <path
        d="M28 78 C42 92 78 92 92 78"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </IconBase>
  )
}

// ── Mail (Contact) ───────────────────────────────────────────────────
export function MailIcon() {
  return (
    <IconBase id="mail" gradient={[['0', '#5ec2f7'], ['1', '#1a6ee0']]}>
      <rect x="22" y="34" width="76" height="52" rx="8" fill="#fff" />
      <path
        d="M24 40 L60 66 L96 40"
        stroke="#1a6ee0"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M24 82 L46 62 M96 82 L74 62" stroke="#cfe3fb" strokeWidth="3.5" strokeLinecap="round" />
    </IconBase>
  )
}

// ── Piliers ──────────────────────────────────────────────────────────
export function PillarsIcon() {
  return (
    <IconBase id="pillars" gradient={[['0', '#b287f2'], ['1', '#6b3fd4']]}>
      {/* fronton */}
      <path d="M60 20 L98 40 L22 40 Z" fill="#fff" />
      <rect x="22" y="44" width="76" height="6" rx="3" fill="#fff" />
      {/* 4 colonnes */}
      <rect x="26" y="56" width="9" height="34" rx="3" fill="#fff" />
      <rect x="46" y="56" width="9" height="34" rx="3" fill="#fff" />
      <rect x="66" y="56" width="9" height="34" rx="3" fill="#fff" />
      <rect x="86" y="56" width="9" height="34" rx="3" fill="#fff" />
      <rect x="20" y="94" width="80" height="7" rx="3.5" fill="#fff" />
    </IconBase>
  )
}

// ── Corbeille (style Dock : panier translucide, pas de squircle) ─────
export function TrashIcon({ full = false }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="grad-trash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8e8ee" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9a9aa6" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {full && (
        <g>
          <path d="M46 32 L58 14 L64 30 Z" fill="#d9d9e2" />
          <circle cx="72" cy="24" r="9" fill="#c9c9d4" />
          <rect x="38" y="22" width="14" height="12" rx="2" fill="#bfbfcc" transform="rotate(-14 45 28)" />
        </g>
      )}
      <path d="M34 36 L86 36 L80 106 Q79 112 73 112 L47 112 Q41 112 40 106 Z" fill="url(#grad-trash)" opacity="0.92" />
      <path d="M30 30 L90 30 L88 40 L32 40 Z" fill="#d4d4de" />
      {/* stries verticales */}
      {[44, 52, 60, 68, 76].map((xx, i) => (
        <line key={i} x1={xx} y1="46" x2={xx > 60 ? xx - 2 : xx > 56 ? xx : xx + 2} y2="104" stroke="#7c7c8a" strokeWidth="2" opacity="0.5" />
      ))}
    </svg>
  )
}

// ── Dossier macOS ────────────────────────────────────────────────────
export function FolderIcon() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="grad-folder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6cc5f5" />
          <stop offset="1" stopColor="#3d9be0" />
        </linearGradient>
      </defs>
      <path d="M14 34 Q14 28 20 28 L44 28 L52 38 L100 38 Q106 38 106 44 L106 88 Q106 94 100 94 L20 94 Q14 94 14 88 Z" fill="#2f7fc0" />
      <path d="M14 44 Q14 40 18 40 L102 40 Q106 40 106 44 L106 88 Q106 94 100 94 L20 94 Q14 94 14 88 Z" fill="url(#grad-folder)" />
    </svg>
  )
}

// ── Fichier PDF (CV) ─────────────────────────────────────────────────
export function FileIcon() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: 'block' }}>
      <path d="M30 12 L74 12 L94 32 L94 108 L30 108 Z" fill="#f5f5f7" />
      <path d="M74 12 L94 32 L74 32 Z" fill="#c9c9d2" />
      <rect x="40" y="48" width="44" height="4" rx="2" fill="#b3b3bd" />
      <rect x="40" y="58" width="44" height="4" rx="2" fill="#b3b3bd" />
      <rect x="40" y="68" width="30" height="4" rx="2" fill="#b3b3bd" />
      <rect x="36" y="82" width="30" height="14" rx="4" fill="#e74c5b" />
      <text x="51" y="93" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">PDF</text>
    </svg>
  )
}

// ── Réglages Système (engrenage) ─────────────────────────────────────
export function SettingsIcon() {
  return (
    <IconBase id="settings" gradient={[['0', '#8e8e98'], ['1', '#55555e']]}>
      <g transform="translate(60 60)">
        {/* dents de l'engrenage */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="-6"
            y="-34"
            width="12"
            height="14"
            rx="4"
            fill="#e8e8ee"
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle r="24" fill="#e8e8ee" />
        <circle r="11" fill="#55555e" />
      </g>
    </IconBase>
  )
}

// ── GitHub ───────────────────────────────────────────────────────────
export function GitHubIcon() {
  return (
    <IconBase id="github" gradient={[['0', '#3a3f46'], ['1', '#16191d']]}>
      <g transform="translate(19.2 19.2) scale(3.4)">
        <path
          fill="#fff"
          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
        />
      </g>
    </IconBase>
  )
}

// ── LinkedIn ─────────────────────────────────────────────────────────
export function LinkedInIcon() {
  return (
    <IconBase id="linkedin" gradient={[['0', '#28a2e4'], ['1', '#0a66c2']]}>
      <g transform="translate(24 24) scale(3)">
        <path
          fill="#fff"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z"
        />
      </g>
    </IconBase>
  )
}

// ── Snake ────────────────────────────────────────────────────────────
export function SnakeIcon() {
  return (
    <IconBase id="snake" gradient={[['0', '#66d97a'], ['1', '#1fa346']]}>
      <path
        d="M28 88 L60 88 C70 88 70 72 60 72 L44 72 C34 72 34 56 44 56 L76 56 C86 56 86 40 76 40 L48 40"
        stroke="#fff"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="30" cy="88" r="9" fill="#fff" />
      <circle cx="28" cy="85" r="2.4" fill="#1fa346" />
      {/* pomme */}
      <circle cx="88" cy="88" r="7" fill="#ff5f57" />
      <path d="M88 80 C88 77 90 76 92 75" stroke="#8b5a2b" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </IconBase>
  )
}
