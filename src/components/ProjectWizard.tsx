import React, { use, useState } from 'react';
import { Users, User, Layout, Layers } from 'lucide-react';
import '../styles/ProjectWizard.css';

//Definit ce que APP doit nous donner
interface ProjectWizardProps {
    onComplete: (criteria: {teamSize: string; projectType: string}) => void;
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({onComplete}) => {

    //State du form
    const [teamSize, setTeamSize] = useState<'solo' | 'large'>('solo');
    const [projectType, setProjectType] = useState<'web' | 'fullstack'>('web');

    const handleSubmit = () => {
        //envoie les infos au parent
        onComplete({teamSize, projectType});
    }



    return (
        <div className='wizard'>
            <h2 className='wizard-title'>Configurons ton projet</h2>

            {/**Q1: Taille de l'équipe */}
            <div className='wizard-section'>
                <label className='wizard-label'>Tu travailles comment ? </label>
                <div className='wizard-options'>
                    <button
                        onClick={() => setTeamSize('solo')}
                        className={`wizard-option ${teamSize === 'solo' ? 'selected' : ''}`}
                    >
                        <User size={24}/>
                        <span>Solo</span>

                    </button>

                    <button
                        onClick={() => setTeamSize('large')}
                        className={`wizard-option ${teamSize === 'large' ? 'selected' : ''}`}
                    >
                        <Users size={24}/>
                        <span>En équipe</span>
                    </button>

                </div>

            </div>

            {/**Q2: Type de projet */}
            <div className='wizard-section'>
                <label className='wizard-label'>Quel type de projet ?</label>
                <div className='wizard-options'>

                    <button
                        onClick={() => setProjectType('web')}
                        className= {`wizard-option ${projectType === 'web' ? 'selected' : ''}`}
                    >
                        <Layout size={24}/>
                        <span>FrontEnd Simple</span>
                        <small>(React, Vue...)</small>
                    </button>

                    <button
                        onClick={() => setProjectType('fullstack')}
                        className= {`wizard-option ${projectType === 'fullstack' ? 'selected' : ''}`}
                    >
                        <Layers size={24}/>
                        <span>Complete / FullStack</span>
                        <small>(Domain, API, App)</small>
                    </button>

                </div>
            </div>

            {/**Validation */}
            <button className='wizard-submit' onClick={handleSubmit}>
                Trouver mon architecture 
            </button>
        </div>
    );
};
