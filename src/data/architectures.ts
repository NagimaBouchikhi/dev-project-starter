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
    ],

    //workflow pour une personne seule
    workflow : {
        solo : [
          "1. Commence par définir tes TYPES (dans /types). C'est ton contrat.",
          "2. Crée les SERVICES factices (mock) pour simuler l'API.",
          "3. Crée tes PAGES statiques (sans logique).",
          "4. Connecte les pages aux services."
      ],
      team: [
        {
          title : "Dev UI / Integration",
          description : "S'occupe du visuel et l'experience utilisateur.",
          focus : ["/components", "/pages"]
        },
        {
          title: "Dev Logic / API",
          description : "Gère les appels réseau et la manipulation des données.",
          focus : ["/services", "/types"]
        }
      ]
    },

    firstSteps: [
      "mkdir src/components src:pages src/services",
      "touch src/types/User.ts",
      "touch src/services/api.ts",
      "git add . && git commit -m 'feat: init folder structure for MVC React Simple architecture'"
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
    ],


    workflow : {
      solo : [
        "1. DOMAIN FIRST : Écris tes Entités et tes Use-Cases (Règles métier).",
        "2. Définis les interfaces de tes Repositories (Contrats).",
        "3. Implémente la couche DATA (API réelle).",
        "4. Finis par la couche PRESENTATION (UI)."
      ],
      team: [
        {
          title: "Domain Expert",
          description : "Se concentre sur la logique métier. Ne touche pas au framawork",
          focus : ["/domain/entities", "/domain/use-cases"]
        },
        {
          title: "Date Engineer",
          description: "Connecte l'app au monde extérieur (API, DB...)",
          focus: ["/data/repositories", "/domain/interfaces"]
        },
        {
          title: "Frontend Developer",
          description: "Utilise les use-cases pour construire l'interface utilisateur.",
          focus: ["/presentation/components", "/presentation/pages"]
        }

      ]

    },

    firstSteps: [
      "mkdir src/domain/entities src/domain/use-cases",
      "touch src/domain/entities/User.ts",
      "touch src/domain/repositories/UserRepository.ts",
      "git add . && git commit -m 'feat: init folder structure for Clean Architecture'"
    ]
  }


];