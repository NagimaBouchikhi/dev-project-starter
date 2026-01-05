
//Definit ce qu'est un dossier ou fichier dans notre arborescence
export interface FolderStructure {
    name: string;
    type: 'file' | 'folder';
    description?: string; // Description optionnelle
    children?: FolderStructure[]; // Enfants si c'est un dossier
}

//Role en equipe
export interface TeamRole {
    title: string; //ex: "Frontend Developer"
    description: string; //ce qu'il fait"
    focus: string[]; //les dossiers qu'il touche 

}

//Definit ce qu'une Architecture compléte
export interface Architecture {
    id: string;
    name: string;
    description: string;
    //a qui s'adresse cette architecture
    recommendation: {
        teamSize: 'solo' | 'small' |  'large';
        projectType: 'web' | 'mobile' | 'api' | 'fullstack';
    };
    //structure de dossier concréte
    structure: FolderStructure[];

    //La strategie de travail
    workflow : {
        solo : string[]; //Liste des etape une personne seule 
        team : TeamRole[]; //Liste des rôles pour une équipe
    }

    //Les actions concrète pour démarrer 
    firstSteps?: string[];
}