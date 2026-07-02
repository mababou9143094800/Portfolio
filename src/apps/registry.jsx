import { FinderIcon, MailIcon, PillarsIcon, SnakeIcon } from '../components/macos/icons.jsx'
import FinderProjects from './FinderProjects.jsx'
import MailContact from './MailContact.jsx'
import Pillars from './Pillars.jsx'
import SnakeGame from './SnakeGame.jsx'

// Les 4 applications du Dock. width/height = taille par défaut des fenêtres.
export const APPS = [
  {
    id: 'projects',
    name: 'Mes Projets',
    icon: FinderIcon,
    component: FinderProjects,
    width: 900,
    height: 580,
  },
  {
    id: 'contact',
    name: 'Me Contacter',
    icon: MailIcon,
    component: MailContact,
    width: 700,
    height: 540,
  },
  {
    id: 'pillars',
    name: 'Mes 4 Piliers',
    icon: PillarsIcon,
    component: Pillars,
    width: 760,
    height: 560,
  },
  {
    id: 'snake',
    name: 'Snake',
    icon: SnakeIcon,
    component: SnakeGame,
    width: 460,
    height: 600,
  },
]
