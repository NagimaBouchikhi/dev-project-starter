
//Definit ce qu'est un dossier ou fichier dans notre arborescence
export interface FolderStructure {
    name: string;
    type: 'file' | 'folder';
    description?: string; // Description optionnelle
    children?: FolderStructure[]; // Enfants si c'est un dossier
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
}