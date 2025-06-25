# Scores de lisibilité pour textes français

## Objectif 

L'objectif de ce programme est de permettre, à partir d'un texte saisi ou d'un fichier importé en texte brut, .docx ou .odt, le calcul de sept scores de lisibilité :

* LIX 
* RIX
* Automated Readability Index (ARI)
* Gunning Fog index
* Coleman-Liau index
* Flesch-Kincaid Grade Level (FKGL)
* Simple Measure of Gobbledygook index (SMOG).

Ce programme permet aussi l'affichage des statistiques du texte sur lesquelles il s'est fondé pour effectuer le calcul. Il affiche les nombres de: 

* caractères
* voyelles
* digrammes
* trigrammes
* syllabes graphiques
* mots
* mots de plus de six caractères
* mots de plus de trois syllabes
* phrases

## Description

Ce programme repose entièrement sur les expressions régulières pour établir les variables qui servent au calcul de ces scores de lisibilité. 

Si les expressions régulières apportent une réponse algorithmique efficace pour la grande majorité des variables à établir, elles se revèlent moins précises, bien que souvent suffisantes, pour calculer le nombre de syllabes d'un mot. Cela est étroitement lié à la complexité et à l'irrégularité de la langue française. 

Pour faire face à ce problème et afin que les résultats soient fiables, il a été décidé de procéder au décompte des syllabes graphiques et non phoniques : pour cela, on comptabilise d'abord le nombre de voyelles dans un mot donné ; ensuite, on soustrait à cette somme le nombre de digrammes et de trigrammes qui s'y trouvent.

### Pile technologique : React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
