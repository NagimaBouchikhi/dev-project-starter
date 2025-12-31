import React, { useState } from 'react';
import { Folder, FileCode, ChevronRight, ChevronDown } from 'lucide-react';
import type { FolderStructure } from '../types';
import '../styles/FolderTreeStyle.css';

//Def des props ce que le composant recoit 
interface FolderTreeProps {
    structure: FolderStructure; 
    depth?: number; // Pour la gestion de l'indentation
}

export const FolderTree: React.FC<FolderTreeProps> = ({ structure, depth = 0 }) => {

    //State : dossier ouvert ou fermé
    const [isOpen, setIsOpen] = useState(true);

    //Est ce un dossier 
    const isFolder = structure.type === 'folder';

    //Fonction pour gérer le click (seulement si un dossier)
    const toggleFolder = () => {
        if (isFolder) {
            setIsOpen(!isOpen);
        }
    }

    return (

        <div className='select-none'>

            {/* Ligne représentant le dossier ou fichier */}
            <div 
                className={`folder-tree-item ${isFolder ? 'folder' : 'file' } depth-${depth}`}
                onClick={toggleFolder}
            >
                {isFolder && (
                    <span className='folder-toggle'>
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                )}
                <span className='folder-icon'>
                    {isFolder ? <Folder size={14} /> : <FileCode size={14} />}
                    
                </span>
                <span className='folder-name'>
                    {structure.name}
                </span>

            </div>

            {/* Si c'est un dossier et qu'il est ouvert, on affiche ses enfants */}
            {isFolder && isOpen && structure.children && (
                <div className='folder-children'>
                    {structure.children.map((child,index) => (
                        <FolderTree
                            key={`${child.name}-${index}`}
                            structure={child}
                            depth={depth + 1}
                        />

                    
                    ))}
                </div>
            )}


        </div>
    )
}