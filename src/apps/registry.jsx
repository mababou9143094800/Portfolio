import { FinderIcon, MailIcon, PillarsIcon, SnakeIcon, TrashIcon, FileIcon, GitHubIcon, LinkedInIcon, SettingsIcon } from '../components/macos/icons.jsx'
import { profileBase } from '../content.js'
import FinderProjects from './FinderProjects.jsx'
import MailContact from './MailContact.jsx'
import Pillars from './Pillars.jsx'
import SnakeGame from './SnakeGame.jsx'
import AboutMac from './AboutMac.jsx'
import CVPreview from './CVPreview.jsx'
import TrashApp from './TrashApp.jsx'
import SettingsApp from './SettingsApp.jsx'

// Toutes les applications. `dock` : true = zone principale du Dock,
// 'trash' = à droite du séparateur, false = ouvrable uniquement
// via menus / Spotlight / icônes du bureau.
// Les apps avec `href` n'ouvrent pas de fenêtre : elles renvoient vers
// un lien externe dans un nouvel onglet.
export const APPS = [
  {
    id: 'projects',
    name: 'Mes Projets',
    icon: FinderIcon,
    component: FinderProjects,
    width: 900,
    height: 580,
    dock: true,
  },
  {
    id: 'contact',
    name: 'Me Contacter',
    icon: MailIcon,
    component: MailContact,
    width: 700,
    height: 540,
    dock: true,
  },
  {
    id: 'pillars',
    name: 'Mes 4 Piliers',
    icon: PillarsIcon,
    component: Pillars,
    width: 760,
    height: 560,
    dock: true,
  },
  {
    id: 'snake',
    name: 'Snake',
    icon: SnakeIcon,
    component: SnakeGame,
    width: 460,
    height: 600,
    dock: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: GitHubIcon,
    href: profileBase.github,
    dock: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: LinkedInIcon,
    href: profileBase.linkedin,
    dock: true,
  },
  {
    id: 'settings',
    name: 'Réglages Système',
    icon: SettingsIcon,
    component: SettingsApp,
    width: 520,
    height: 480,
    dock: true,
  },
  {
    id: 'about',
    name: 'À propos',
    icon: FinderIcon,
    component: AboutMac,
    width: 440,
    height: 480,
    dock: false,
  },
  {
    id: 'cv',
    name: 'CV — Aperçu',
    icon: FileIcon,
    component: CVPreview,
    width: 620,
    height: 640,
    dock: false,
  },
  {
    id: 'trash',
    name: 'Corbeille',
    icon: TrashIcon,
    component: TrashApp,
    width: 560,
    height: 400,
    dock: 'trash',
  },
]

export const DOCK_APPS = APPS.filter((a) => a.dock === true)
export const TRASH_APP = APPS.find((a) => a.dock === 'trash')
