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
  }, 
  {
    id: 'clean-architecture',
    name: 'Clean Architecture',
    description: 'Une architecture modulaire et testable, idéale pour les projets de taille moyenne à grande.',
    recommendation: {
      teamSize: 'large',
      projectType: 'fullstack'
    },
    structure: [
       {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'domain',
            type: 'folder',
            description: 'Le coeur du métier. AUCUNE dépendance externe. (pas de React, pas de d\'API)',
            children: [
              { name: 'entities', type: 'folder', description: 'Modèles purs', children: [] },
              { name: 'use-cases', type: 'folder', description: 'Règles métier', children: [] },
              { name: 'repositories-interfaces', type: 'folder', description: 'Contrats (interfaces) pour les données', children: [] }
            ]
          },
          {
            name: 'data',
            type: 'folder',
            description: 'Implémentations des données (API,base de données...)',
            children: [
              {name: 'repositories', type: 'folder', description: 'Implémentation des contrats de domain', children: [] },
              {name: 'sources', type : 'folder', description: 'Sources de données Remote (API) ou Local (base de données)', children: []}
            ]
          },
          {
            name: 'presentation',
            type: 'folder',
            description: 'Interface utilisateur (React, Vue...)',
            children: [
              {name: 'components', type : 'folder', children:[]},
              {name: 'pages', type : 'folder', children:[]},
              { name: 'view-models', type: 'folder', description: 'État de la vue', children: [] }
            ]
          }
        ]
       }
    ]
  }

]