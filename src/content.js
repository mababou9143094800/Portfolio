// ── Contenu du portfolio ────────────────────────────────────────────────
// Le contenu traduisible est fourni en FR et EN ; la composition par langue
// est faite dans src/i18n.jsx (useLang).

// Les adresses sont assemblées à l'exécution : la chaîne complète n'apparaît
// pas dans le bundle JS, ce qui déjoue les scrapers d'emails basiques.
const email = ['mathieu', '.', 'dilhan91'].join('') + '@' + ['gmail', 'com'].join('.')
const proEmail = ['mathieu', 'dilhan', 'pro'].join('.') + '@' + ['gmail', 'com'].join('.')

// Champs indépendants de la langue
export const profileBase = {
  firstName: 'Mathieu',
  lastName: 'Dilhan',
  email,
  github: 'https://github.com/mababou9143094800',
  linkedin: 'https://linkedin.com/in/mathieu-dilhan-b84562300',
  location: 'Villejuif, France',
}

export const profileI18n = {
  fr: {
    role: "Etudiant en cybersécurité à l'Efrei Paris",
    tagline:
      'Bienvenue sur mon portfolio interactif ! Explorez mes projets et découvrez ma passion pour le développement web et la cybersécurité.',
    bio: `🎯 À la recherche d'une alternance en réseaux et cybersécurité, du 1er septembre au 31 juillet (rythme 3 jours entreprise / 2 jours école).

Étudiant ingénieur en cycle renforcé à l'Efrei Paris depuis 2023, passionné par l'informatique sous toutes ses formes : systèmes, réseaux et cybersécurité.

Curieux de nature, j'aime comprendre comment les choses fonctionnent en profondeur, ce qui m'amène régulièrement à monter et configurer mes propres machines, expérimenter avec la virtualisation (Proxmox) et déployer des projets de self-hosting. Cette approche pratique complète ma formation académique, qui couvre notamment la cybersécurité, les réseaux, les télécommunications et les bases de données.

J'ai récemment travaillé sur un projet de sécurisation d'infrastructure d'entreprise autour d'outils open source (pfSense, OPNsense, IPSec, Suricata), et j'ai eu l'occasion de découvrir le monde de l'entreprise lors d'un stage en environnement bancaire.

Sérieux et rigoureux dans mon travail, je reste quelqu'un d'ouvert et à l'écoute, des qualités que j'ai développées à travers 7 ans de handball, aujourd'hui remplacé par l'escalade.

📩 N'hésitez pas à me contacter à ${proEmail} ou via LinkedIn pour échanger sur une opportunité d'alternance.`,
  },
  en: {
    role: 'Cybersecurity student at Efrei Paris',
    tagline:
      'Welcome to my interactive portfolio! Explore my projects and discover my passion for web development and cybersecurity.',
    bio: `🎯 Looking for an apprenticeship in networks and cybersecurity, from September 1st to July 31st (3 days in the company / 2 days at school).

Engineering student in the reinforced track at Efrei Paris since 2023, passionate about every side of IT: systems, networks and cybersecurity.

Naturally curious, I love understanding how things work in depth, which regularly leads me to build and configure my own machines, experiment with virtualization (Proxmox) and deploy self-hosting projects. This hands-on approach complements my academic training, which covers cybersecurity, networks, telecommunications and databases.

I recently worked on a project securing a corporate infrastructure with open-source tools (pfSense, OPNsense, IPSec, Suricata), and I discovered the corporate world during an internship in a banking environment.

Serious and rigorous in my work, I remain open-minded and a good listener — qualities I built through 7 years of handball, now replaced by climbing.

📩 Feel free to reach out at ${proEmail} or via LinkedIn to discuss an apprenticeship opportunity.`,
  },
}

export const projectsBase = [
  {
    id: 'luxapp',
    name: 'LuxApp',
    emoji: '🎓',
    color: '#e74c5b',
    year: '2025',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    tags: ['Web'],
    description: {
      fr: "Plateforme d'apprentissage pour aider les utilisateurs à maîtriser leurs appareils Apple. Cours interactifs, suivi de progression et abonnements.",
      en: 'Learning platform helping users master their Apple devices. Interactive courses, progress tracking and subscriptions.',
    },
    link: 'https://example.com',
    repo: 'https://github.com/username/luxapp',
  },
  {
    id: 'meteora',
    name: 'Meteora',
    emoji: '🌤️',
    color: '#4a90d9',
    year: '2025',
    stack: ['Vue.js', 'API REST', 'Chart.js'],
    tags: ['Web'],
    description: {
      fr: 'Application météo minimaliste avec prévisions horaires, cartes interactives et visualisations de données climatiques.',
      en: 'Minimalist weather app with hourly forecasts, interactive maps and climate data visualizations.',
    },
    link: 'https://example.com',
    repo: 'https://github.com/username/meteora',
  },
  {
    id: 'taskflow',
    name: 'TaskFlow',
    emoji: '✅',
    color: '#8e6fd8',
    year: '2024',
    stack: ['Next.js', 'Prisma', 'tRPC'],
    tags: ['Web', 'Open source'],
    description: {
      fr: 'Gestionnaire de tâches collaboratif avec tableaux kanban, temps réel et notifications intelligentes.',
      en: 'Collaborative task manager with kanban boards, real-time sync and smart notifications.',
    },
    link: 'https://example.com',
    repo: 'https://github.com/username/taskflow',
  },
  {
    id: 'pixelfolio',
    name: 'PixelFolio',
    emoji: '🎨',
    color: '#e8944a',
    year: '2024',
    stack: ['HTML/CSS', 'JavaScript', 'GSAP'],
    tags: ['Web', 'Open source'],
    description: {
      fr: "Galerie d'art génératif : des œuvres uniques créées en direct dans le navigateur avec des algorithmes créatifs.",
      en: 'Generative art gallery: unique artworks created live in the browser with creative algorithms.',
    },
    link: 'https://example.com',
    repo: 'https://github.com/username/pixelfolio',
  },
  {
    id: 'devnotes',
    name: 'DevNotes',
    emoji: '📝',
    color: '#4ab87a',
    year: '2023',
    stack: ['React Native', 'Firebase'],
    tags: ['Mobile'],
    description: {
      fr: 'Application mobile de prise de notes pour développeurs avec coloration syntaxique et synchronisation cloud.',
      en: 'Mobile note-taking app for developers with syntax highlighting and cloud sync.',
    },
    link: 'https://example.com',
    repo: 'https://github.com/username/devnotes',
  },
]

export const pillarsBase = [
  {
    id: 'curiosite',
    icon: '🔭',
    color: '#4a90d9',
    title: { fr: 'Curiosité', en: 'Curiosity' },
    text: {
      fr: "J'explore sans cesse de nouvelles technologies et de nouveaux paradigmes. Chaque projet est une occasion d'apprendre quelque chose que je ne savais pas la veille.",
      en: "I constantly explore new technologies and paradigms. Every project is a chance to learn something I didn't know the day before.",
    },
  },
  {
    id: 'rigueur',
    icon: '📐',
    color: '#8e6fd8',
    title: { fr: 'Rigueur', en: 'Rigor' },
    text: {
      fr: "Un code propre, testé et documenté n'est pas une option. Je crois qu'un travail bien fait se voit dans les détails que personne ne remarque.",
      en: 'Clean, tested and documented code is not optional. I believe good work shows in the details nobody notices.',
    },
  },
  {
    id: 'creativite',
    icon: '💡',
    color: '#e8944a',
    title: { fr: 'Créativité', en: 'Creativity' },
    text: {
      fr: "La technique au service de l'idée. J'aime trouver des solutions inattendues et concevoir des interfaces qui surprennent et enchantent.",
      en: 'Technique in service of the idea. I love finding unexpected solutions and designing interfaces that surprise and delight.',
    },
  },
  {
    id: 'partage',
    icon: '🤝',
    color: '#4ab87a',
    title: { fr: 'Partage', en: 'Sharing' },
    text: {
      fr: "Le savoir n'a de valeur que s'il circule. Mentorat, open source, documentation : je m'investis pour que l'équipe grandisse avec moi.",
      en: 'Knowledge only has value if it circulates. Mentoring, open source, documentation: I invest myself so the team grows with me.',
    },
  },
]
