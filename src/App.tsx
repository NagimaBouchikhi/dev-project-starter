import { ARCHITECTURES } from './data/architectures';
import { FolderTree } from './components/FolderTree';
import './styles/App.css';

function App() {

  //pour tester on choisis la première architecture 
  const selectedArchitecture = ARCHITECTURES[0];

  return (
    <div className="app">
      
      {/* Header */}
      <header className='app-header'>
        <h1 className="app-container">
        DevProject Starter
        </h1>

        <p className="app-subtitle">Visualisez la structure avant de coder</p>
      </header>

      {/* Zone principale */}
      <div className='app-grid'>

        {/* Colonne gauche : explication */}
        <div className='app-card'>
          <h2 className='app-card-title'>{selectedArchitecture.name}</h2>
          <p className='app-card-desc'>{selectedArchitecture.description}</p>
          <div className='app-recommendation'>
            <strong>Recommandé pour :</strong>
            <ul>
              <li>Equipe : {selectedArchitecture.recommendation.teamSize}</li>
              <li>Type : {selectedArchitecture.recommendation.projectType}</li>
            </ul>
          </div>
        </div>

        {/* Colonne droite : arborescence */}
        <div className='app-card'>
          <h3 className='app-card-subtitle'>Structure du projet</h3>
          <div className='folder-tree-container'>
            {selectedArchitecture.structure.map((item,index) => (
              <FolderTree 
                key={index}
                structure={item}
              />
            ))}
          </div>
        </div>
      </div>
  
    </div>
  )
}

export default App