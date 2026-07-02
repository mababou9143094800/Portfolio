# 🖥️ Portfolio — Bureau macOS interactif

Portfolio one-page qui se vit comme un vrai Mac : une présentation, un scroll qui zoome
progressivement dans un bureau macOS plein écran, et des applications à explorer —
fenêtres déplaçables, menus fonctionnels, Spotlight, corbeille… et même un Snake.

**[→ Voir la démo](https://example.com)** *(à mettre à jour après déploiement)*

## ✨ Fonctionnalités

### Expérience
- **Zoom au scroll** : la page d'accueil zoome progressivement dans le bureau jusqu'au
  plein écran ; scroller vers le haut depuis le bureau ramène à l'accueil
- **Mode sombre** façon macOS Sequoia, 3 fonds d'écran cyclables
- **Version mobile** : le bureau devient un écran d'accueil iOS avec les mêmes apps

### Un bureau macOS fidèle
- **Fenêtres complètes** : déplacement, redimensionnement (bords + coin), feux
  tricolores fonctionnels (fermer / réduire vers le Dock / agrandir), multi-fenêtres
  avec gestion du focus, double-clic sur la barre de titre pour agrandir
- **Dock** avec effet de loupe, rebond au lancement, indicateurs d'apps ouvertes,
  et une corbeille qui se remplit vraiment
- **Barre de menu fonctionnelle** : menus , Fichier, Fenêtre… avec de vraies
  actions, horloge en direct, popovers Wi-Fi et batterie
- **Centre de contrôle** avec curseur de luminosité qui assombrit l'écran
- **Spotlight** (`⌘K` / `Ctrl+K`) : recherche les apps et les projets
- **Clic droit** : nouveau dossier (renommable), corbeille, changement de fond d'écran

### Les applications
| App | Description |
|---|---|
| 📁 **Mes Projets** | Style Finder : sidebar, recherche, tags, historique de navigation, panneau de détail |
| ✉️ **Me Contacter** | Style Mail : compose un message et l'envoie via votre client mail (`mailto`) |
| 🏛️ **Mes 4 Piliers** | Les valeurs qui guident mon travail |
| 🐍 **Snake** | Flèches ou ZQSD, swipe sur mobile, record sauvegardé |
| 📄 **CV** | Icône sur le bureau, aperçu style Preview + téléchargement PDF |

## 🛠️ Stack

- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [Framer Motion](https://www.framer.com/motion/) pour toutes les animations
  (zoom au scroll, loupe du Dock, fenêtres, genie effect…)
- Aucune autre dépendance — le canvas du Snake et les icônes SVG sont faits main

## 🚀 Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production dans dist/
```

## 🎨 Personnaliser

Tout le contenu est centralisé dans **[`src/content.js`](src/content.js)** :
profil, projets (avec stack, tags, liens), piliers, coordonnées.

- Remplace **`public/cv.pdf`** par ton vrai CV
- Les icônes d'apps sont dans [`src/components/macos/icons.jsx`](src/components/macos/icons.jsx)
- Les apps sont déclarées dans [`src/apps/registry.jsx`](src/apps/registry.jsx)

## 📂 Structure

```
src/
├── content.js                  # ← ton contenu (profil, projets, piliers)
├── App.jsx                     # bascule desktop / mobile
├── components/
│   ├── LandingZoom.jsx         # accueil + zoom au scroll
│   ├── macos/                  # le bureau : fenêtres, dock, menus, Spotlight…
│   └── ios/                    # l'écran d'accueil iOS (mobile)
└── apps/                       # le contenu des fenêtres (Finder, Mail, Snake…)
```

---

Fait avec soin par **Mathieu Dilhan** — [me contacter](mailto:mathieu.dilhan91@gmail.com)
