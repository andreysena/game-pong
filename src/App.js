import './App.css';
import { GameProvider } from './contexts/GameContext';

import Pong from './components/Pong';

function App() {

    return (
        <div className='main-container'>
            <GameProvider>
                <Pong />
            </GameProvider>
        </div>
    );
}

export default App;
