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
