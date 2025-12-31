import type { Architecture } from "../types";

export const ARCHITECTURES: Architecture[] = [
    {
    id: 'mvc-react-simple',
    name: 'MVC Simple (React)',
    description: 'Une structure classique séparant la logique, les données et la vue. Idéal pour débuter.',
    recommendation: {
      teamSize: 'solo',
      projectType: 'web'
    },
    structure: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            description: 'Composants réutilisables (Boutons, Inputs...)',
            children: []
          },
          {
            name: 'pages',
            type: 'folder',
            description: 'Les pages principales de l\'application (Vues)',
            children: []
          },
          {
            name: 'services',
            type: 'folder',
            description: 'Appels API et logique métier (Controllers)',
            children: []
          },
          {
            name: 'types',
            type: 'folder',
            description: 'Définitions TypeScript (Models)',
            children: []
          }
        ]
      }
    ]
  }

]