import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { profileBase, profileI18n, projectsBase, pillarsBase } from './content.js'

// ── Internationalisation FR / EN ────────────────────────────────────────
// `useLang()` fournit la langue courante, le dictionnaire d'interface `t`
// et le contenu (profil, projets, piliers) déjà localisé.

const STRINGS = {
  fr: {
    locale: 'fr-FR',
    apps: {
      projects: 'Mes Projets',
      contact: 'Me Contacter',
      pillars: 'Mes Expériences',
      snake: 'Snake',
      about: 'À propos',
      cv: 'CV — Aperçu',
      trash: 'Corbeille',
      settings: 'Réglages Système',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    landing: {
      hello: 'Bonjour, je suis',
      cta: 'Explorer mon bureau',
      showMore: 'Afficher plus ▼',
      showLess: 'Afficher moins ▲',
    },
    desktop: {
      hintTitle: 'Bienvenue sur mon bureau 👋',
      hintText:
        'Ouvrez une app du Dock, explorez les menus, faites un clic droit… tout est interactif. Remontez pour revenir à l’accueil.',
      open: 'Ouvrir',
      rename: 'Renommer',
      moveToTrash: 'Placer dans la corbeille',
      getInfo: 'Obtenir les infos',
      newFolder: 'Nouveau dossier',
      changeWallpaper: 'Changer le fond d’écran',
      cleanUp: 'Ranger le bureau',
      untitledFolder: 'Dossier sans titre',
      switchLang: 'Switch to English',
    },
    menubar: {
      titles: { file: 'Fichier', edit: 'Édition', view: 'Présentation', window: 'Fenêtre', help: 'Aide' },
      about: 'À propos de ce portfolio',
      settings: 'Réglages Système…',
      changeWallpaper: 'Changer le fond d’écran',
      backHome: 'Revenir à l’accueil',
      restart: 'Redémarrer…',
      lockScreen: 'Verrouiller l’écran',
      newFinderWindow: 'Nouvelle fenêtre Finder',
      newMessage: 'Nouveau message',
      closeWindow: 'Fermer la fenêtre',
      closeAll: 'Tout fermer',
      undo: 'Annuler', redo: 'Rétablir', cut: 'Couper', copy: 'Copier', paste: 'Coller', selectAll: 'Tout sélectionner',
      enterFullscreen: 'Activer le plein écran',
      exitFullscreen: 'Quitter le plein écran',
      hideMenuBar: 'Masquer la barre des menus',
      minimize: 'Réduire',
      zoom: 'Agrandir',
      noWindow: 'Aucune fenêtre ouverte',
      spotlight: 'Rechercher (Spotlight)',
      sourceCode: 'Code source sur GitHub',
      contactMe: 'Me contacter',
      wifiOn: 'Wi-Fi : activé',
      wifiOff: 'Wi-Fi : désactivé',
      battery: 'Batterie : 87 %',
      powerSource: 'Source : adaptateur secteur',
      batterySettings: 'Réglages de la batterie…',
      ccToggles: { wifi: 'Wi-Fi', bluetooth: 'Bluetooth', airdrop: 'AirDrop', focus: 'Concentration' },
      on: 'Activé',
      off: 'Désactivé',
      brightness: 'Luminosité',
      sound: 'Son',
      finder: 'Finder',
    },
    window: { close: 'Fermer', minimize: 'Réduire', maximize: 'Agrandir' },
    dock: { openApp: (name) => `Ouvrir ${name}` },
    spotlight: { placeholder: 'Recherche Spotlight', applications: 'Applications', projects: 'Projets' },
    finder: {
      favorites: 'Favoris',
      allProjects: 'Mes Projets',
      recents: 'Récents',
      downloads: 'Téléchargements',
      tags: 'Tags',
      search: 'Rechercher',
      back: 'Précédent',
      forward: 'Suivant',
      emptyFolder: 'Ce dossier est vide.',
      noResults: 'Aucun résultat.',
      viewProject: 'Voir le projet ↗',
      sourceCode: 'Code source',
      items: (n) => `${n} élément${n > 1 ? 's' : ''}`,
      selected: (name) => ` — « ${name} » sélectionné`,
    },
    mail: {
      newMessage: 'Nouveau message',
      opening: 'Ouverture de votre app Mail…',
      attachToast: 'Les pièces jointes ne sont pas disponibles dans la démo 😉',
      attach: 'Pièce jointe',
      textSize: 'Taille du texte',
      send: 'Envoyer',
      to: 'À :',
      subject: 'Objet :',
      subjectPlaceholder: 'Une idée de projet ? Une opportunité ?',
      defaultSubject: 'Contact depuis votre portfolio',
      bodyPlaceholder: (firstName) => `Bonjour ${firstName},\n\nJe vous contacte au sujet de…`,
    },
    cv: {
      download: '⬇ Télécharger',
      profileSection: 'Profil',
      recentProjects: 'Projets récents',
      values: 'Valeurs',
      note: 'Contenu d’exemple — remplace',
      noteEnd: 'par ton vrai CV.',
    },
    about: {
      location: 'Localisation',
      specialty: 'Spécialité',
      specialtyValue: 'Réseaux & cybersécurité',
      site: 'Site',
      siteValue: 'Fait main + CLaude — React + Framer Motion',
      version: 'Version',
      versionValue: 'Portfolio 1.0 « Sequoia »',
      contact: 'Me contacter…',
    },
    pillarsApp: { intro: 'Mes expériences professionnelles et académiques.' },
    snake: {
      score: 'Score',
      best: 'Record',
      gameOver: 'Game Over',
      play: 'Jouer',
      replay: 'Rejouer',
      help: 'Flèches ou ZQSD — swipe sur mobile',
    },
    trash: {
      empty: 'La corbeille est vide',
      items: (n) => `${n} élément${n > 1 ? 's' : ''}`,
      emptyTrash: 'Vider la corbeille',
      emptyJoke: 'Rien ici. Comme ma dette technique. 🧹',
    },
    settings: {
      language: 'Langue',
      languageHint: 'La langue s’applique à tout le site.',
      french: 'Français',
      english: 'Anglais',
      appearance: 'Apparence',
      appearanceHint: 'Mode sombre permanent, comme tout bon terminal.',
      dark: 'Sombre',
    },
    ios: { hello: 'Bonjour 👋 je suis', hint: 'Touchez une app pour l’ouvrir', back: '‹ Accueil' },
  },

  en: {
    locale: 'en-US',
    apps: {
      projects: 'My Projects',
      contact: 'Contact Me',
      pillars: 'My Experiences',
      snake: 'Snake',
      about: 'About',
      cv: 'CV — Preview',
      trash: 'Trash',
      settings: 'System Settings',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    landing: {
      hello: "Hi, I'm",
      cta: 'Explore my desktop',
      showMore: 'Show more ▼',
      showLess: 'Show less ▲',
    },
    desktop: {
      hintTitle: 'Welcome to my desktop 👋',
      hintText:
        'Open an app from the Dock, browse the menus, right-click around… everything is interactive. Scroll back up to return home.',
      open: 'Open',
      rename: 'Rename',
      moveToTrash: 'Move to Trash',
      getInfo: 'Get Info',
      newFolder: 'New Folder',
      changeWallpaper: 'Change Wallpaper',
      cleanUp: 'Clean Up Desktop',
      untitledFolder: 'Untitled Folder',
      switchLang: 'Switch to French',
    },
    menubar: {
      titles: { file: 'File', edit: 'Edit', view: 'View', window: 'Window', help: 'Help' },
      about: 'About This Portfolio',
      settings: 'System Settings…',
      changeWallpaper: 'Change Wallpaper',
      backHome: 'Back to Home',
      restart: 'Restart…',
      lockScreen: 'Lock Screen',
      newFinderWindow: 'New Finder Window',
      newMessage: 'New Message',
      closeWindow: 'Close Window',
      closeAll: 'Close All',
      undo: 'Undo', redo: 'Redo', cut: 'Cut', copy: 'Copy', paste: 'Paste', selectAll: 'Select All',
      enterFullscreen: 'Enter Full Screen',
      exitFullscreen: 'Exit Full Screen',
      hideMenuBar: 'Hide Menu Bar',
      minimize: 'Minimize',
      zoom: 'Zoom',
      noWindow: 'No open windows',
      spotlight: 'Search (Spotlight)',
      sourceCode: 'Source code on GitHub',
      contactMe: 'Contact me',
      wifiOn: 'Wi-Fi: on',
      wifiOff: 'Wi-Fi: off',
      battery: 'Battery: 87%',
      powerSource: 'Power source: AC adapter',
      batterySettings: 'Battery Settings…',
      ccToggles: { wifi: 'Wi-Fi', bluetooth: 'Bluetooth', airdrop: 'AirDrop', focus: 'Focus' },
      on: 'On',
      off: 'Off',
      brightness: 'Brightness',
      sound: 'Sound',
      finder: 'Finder',
    },
    window: { close: 'Close', minimize: 'Minimize', maximize: 'Maximize' },
    dock: { openApp: (name) => `Open ${name}` },
    spotlight: { placeholder: 'Spotlight Search', applications: 'Applications', projects: 'Projects' },
    finder: {
      favorites: 'Favorites',
      allProjects: 'My Projects',
      recents: 'Recents',
      downloads: 'Downloads',
      tags: 'Tags',
      search: 'Search',
      back: 'Back',
      forward: 'Forward',
      emptyFolder: 'This folder is empty.',
      noResults: 'No results.',
      viewProject: 'View project ↗',
      sourceCode: 'Source code',
      items: (n) => `${n} item${n > 1 ? 's' : ''}`,
      selected: (name) => ` — “${name}” selected`,
    },
    mail: {
      newMessage: 'New Message',
      opening: 'Opening your Mail app…',
      attachToast: 'Attachments are not available in the demo 😉',
      attach: 'Attachment',
      textSize: 'Text size',
      send: 'Send',
      to: 'To:',
      subject: 'Subject:',
      subjectPlaceholder: 'A project idea? An opportunity?',
      defaultSubject: 'Contact from your portfolio',
      bodyPlaceholder: (firstName) => `Hello ${firstName},\n\nI’m reaching out about…`,
    },
    cv: {
      download: '⬇ Download',
      profileSection: 'Profile',
      recentProjects: 'Recent projects',
      values: 'Values',
      note: 'Sample content — replace',
      noteEnd: 'with your real CV.',
    },
    about: {
      location: 'Location',
      specialty: 'Specialty',
      specialtyValue: 'Networks & cybersecurity',
      site: 'Site',
      siteValue: 'Handmade — React + Framer Motion',
      version: 'Version',
      versionValue: 'Portfolio 1.0 “Sequoia”',
      contact: 'Contact me…',
    },
    pillarsApp: { intro: 'My professional and academic experiences.' },
    snake: {
      score: 'Score',
      best: 'Best',
      gameOver: 'Game Over',
      play: 'Play',
      replay: 'Play again',
      help: 'Arrow keys or WASD — swipe on mobile',
    },
    trash: {
      empty: 'Trash is empty',
      items: (n) => `${n} item${n > 1 ? 's' : ''}`,
      emptyTrash: 'Empty Trash',
      emptyJoke: 'Nothing here. Just like my technical debt. 🧹',
    },
    settings: {
      language: 'Language',
      languageHint: 'The language applies to the whole site.',
      french: 'French',
      english: 'English',
      appearance: 'Appearance',
      appearanceHint: 'Permanent dark mode, like any good terminal.',
      dark: 'Dark',
    },
    ios: { hello: "Hi 👋 I'm", hint: 'Tap an app to open it', back: '‹ Home' },
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'fr' || saved === 'en') return saved
    return navigator.language?.startsWith('fr') ? 'fr' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const t = STRINGS[lang]
    const profile = { ...profileBase, ...profileI18n[lang] }
    const projects = projectsBase.map((p) => ({ ...p, description: p.description[lang] }))
    const pillars = pillarsBase.map((p) => ({
      ...p,
      title: p.title[lang],
      text: p.text[lang],
      company: p.company[lang],
      period: p.period[lang],
    }))
    const setLang = (l) => {
      localStorage.setItem('lang', l)
      setLangState(l)
    }
    // Nom d'app localisé (Dock, Spotlight, barre de menus, titres de fenêtres)
    const appName = (app) => (app ? t.apps[app.id] ?? app.name : '')
    return { lang, setLang, t, profile, projects, pillars, appName }
  }, [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang doit être utilisé dans LangProvider')
  return ctx
}
