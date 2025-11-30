# PyramidPlay — Plateforme Web Musique & Vidéo

PyramidPlay est une application web moderne qui propose la découverte d’artistes africains, l’écoute de morceaux, la gestion de playlists, la recherche par genres et un espace vidéos. L’interface est pensée pour être réactive, fluide et accessible.

Caractéristiques principales

- Catalogue d’artistes, d’albums et de titres (données mock en JSON)
- Lecteur audio avec contrôle du volume, répétition, shuffle et navigation précédente/suivante
- Favoris et bibliothèque personnelle (via context)
- Recherche plein‑texte sur titres, artistes et genres
- Section vidéos et shorts (mock JSON)

Pile technique

- React + TypeScript (React 19)
- Vite (dev, build et preview)
- React Router (routing SPA)
- Tailwind CSS 4 pour le style
- Context API pour l’état applicatif: `AudioPlayerContext`, `AuthContext`, `LibraryContext`
- Icônes: `lucide-react`

Données et assets

- Mock JSON: `public/mock/*.json` et `public/mock-video/*.json`
- Audio: `public/music/*.mp3`
- Images: `public/thumbnails/*.webp`, placeholder: `public/assets/placeholder.png`
- Les chemins d’assets sont absolus (`/music/...`, `/thumbnails/...`) pour fonctionner sur toutes les routes.

Déploiement

- Build vers `dist` via `npm run build`
- Fallback SPA et ressources statiques gérés par `vercel.json` (priorité filesystem, puis fallback `index.html`)
- Intégration Git Vercel recommandée pour les déploiements automatiques depuis `main`

Scripts

- `npm run dev` — serveur de développement Vite
- `npm run build` — build de production
- `npm run preview` — serveur statique pour prévisualiser `dist`

Structure succincte

- `src/components/*` — UI (cartes, grids, player, sidebar, etc.)
- `src/contexts/*` — état global (audio, auth, bibliothèque)
- `src/hooks/*` — chargement et recherche de données
- `src/pages/*` — pages routées (Accueil, Albums, Artistes, Recherche, Vidéos)
- `public/*` — assets statiques (mock, images, audio)

Notes techniques

- Le lecteur audio s’appuie sur `HTMLAudioElement` via `AudioPlayerContext`
- Les routes SPA sont servies par `index.html` et les fichiers statiques par le filesystem (Vercel)
- Les médias lourds sont suivis via Git LFS pour optimiser les pushes et le stockage

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
