import { ARCHITECTURES } from './data/architectures';
import { FolderTree } from './components/FolderTree';
import './styles/App.css';
import { useState } from 'react';
import type { Architecture } from './types';
import { ProjectWizard } from './components/ProjectWizard';
import { ArrowLeft } from 'lucide-react';
import { TeamRoles } from './components/TeamRole';
import { FirstSteps } from './components/FirstSteps';
import { AIPrompts } from './components/AIPrompts';
import { AIAdvisor } from './components/AIAdvisor';

function App() {

  //Quelle architecture est selectionnée (null ou debut)
  const [selectedArchitecture,setSelectedArchitecture] = useState<Architecture | null>(null);
  const [userChoices, setUserChoices] = useState<{teamSize: string; projectType: string} | null>(null);

  //Appeler quand le formulaire est validé
  const handleFormComplete = (criteria: {teamSize: string; projectType: string}) => {
    setUserChoices(criteria);
    //On cherche l'architecture qui matche exactement les critéres
    const found = ARCHITECTURES.find(arch => 
      arch.recommendation.teamSize === criteria.teamSize &&
      arch.recommendation.projectType === criteria.projectType
    );

    //Si on trouve, on affiche, Sinon par default on met le MVC pour linstant a gere avec erreur plus tard 
    if (found) {
      setSelectedArchitecture(found);
    } else {
      setSelectedArchitecture(ARCHITECTURES[0]);
    }
  }

  return (
    <div className="app">
      
      {/* Header */}
      <header className='app-header'>
        <h1 className="app-container">
        DevProject Starter
        </h1>

        <p className="app-subtitle">Visualisez la structure avant de coder</p>
      </header>

      {/**Conteneur principal */}
      {!selectedArchitecture ? (
        <div className='app-view app-view-form'>

          {/**Formulaire de sélection */}
          <ProjectWizard onComplete={handleFormComplete}/> 
        </div>
      ): (
        <div className='app-view app-view-result'>

          {/* Bouton retour au formulaire */}
          <button
            className='app-back-button'
            onClick={() => setSelectedArchitecture(null)}
          >
            <ArrowLeft size={20} />
            Changer les critères
          </button>

          {/**AI Conseil*/}
          <div className='app-ai-advisor'>
            <AIAdvisor/>
          </div>


          <div className='app-grid'>
          {/**Colonne de gauche info architecture + team role + first steps */}
        
            <div className='app-card app-architecture-info'>
              <div className='app-architecture-header'>
                <span className='app-badge'> Recommendé</span>
                <h2 className='app-architecture-title'>
                  {selectedArchitecture.name}
                </h2>
              </div>

              <p className='app-architecture-description'>
                {selectedArchitecture.description}
              </p>

              <div className='app-architecture-reasons'>
                <h3>Pourquoi ce choix ? </h3>
                <ul>
                  <li>
                    Equipe : 
                    <span>
                      {selectedArchitecture.recommendation.teamSize === 'solo'
                        ? 'Solo'
                        : 'Equipe'}
                    </span>
                  </li>

                  <li>
                    Type de projet :
                    <span>
                      {selectedArchitecture.recommendation.projectType}
                    </span>
                  </li>
                </ul>
              </div>

              {/**Plan d'attaque */}
              <div className='team-roles'>
                <TeamRoles
                  architecture={selectedArchitecture}
                  mode={userChoices?.teamSize === 'solo' ? 'solo' : 'team'}
                />
              </div>

              {/**First Steps */}
              <div className='first-steps-container'>
                <FirstSteps steps={selectedArchitecture.firstSteps} />
              </div>
          </div>


          {/**Colonne de droite Arborescence + prompts */}
          <div className = 'app-sidebar-sticky'>
            <div className='app-card app-structure'>
              <h3 className='app-structure-title'>Structure de dossier</h3>
              <div className='app-structure-tree'>
                {selectedArchitecture.structure.map((item,index) => (
                  <FolderTree 
                    key={index}
                    structure={item}
                  />
                ))}
              </div>
          </div>

          {/**Prompts IA */}
          <div className='app-card app-ai-prompts'>
            <AIPrompts prompts={selectedArchitecture.prompts}/>
          </div>
        </div>
      </div>
      </div>
      )}

    </div>
  );
}

export default App