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
    ],

    prompts: [
      {
        label: "Générer un Service API",
        content: "Agis comme un expert React/TypeScript. Crée un service dans 'src/services' utilisant Fetch. Il doit gérer les erreurs avec un try/catch et typer les retours avec une interface définie dans 'src/types'. Le code doit être propre et commenté."
      },
      {
        label: "Créer un Composant UI",
        content: "Crée un composant React fonctionnel dans 'src/components'. Utilise TailwindCSS pour le style. Le composant doit être typé avec React.FC et accepter des props claires. N'ajoute pas de logique métier complexe, garde-la pour les pages."
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
    ],

    prompts: [
       {
        label: "Générer une Entité (Domain)",
        content: "Agis comme un Architecte Logiciel. Crée une Entité pour le dossier 'src/domain/entities'. C'est une classe ou interface TypeScript pure, SANS aucune dépendance à React, Axios ou une librairie externe. Elle doit contenir uniquement des règles métier."
      },
      {
        label: "Use-Case (Logique Métier)",
        content: "Crée un Use-Case pour 'src/domain/use-cases'. Il doit implémenter une interface stricte, contenir une méthode 'execute()', et utiliser l'injection de dépendance pour le Repository. Interdit d'importer du code de la couche Presentation." 
      },
      {
        label: "Implementer un Repository",
        content: "Crée une implémentation de Repository dans 'src/data/repositories'. Elle doit implémenter l'interface définie dans le Domain. C'est ici que tu fais l'appel API réel."
      }
    ]
  }


];