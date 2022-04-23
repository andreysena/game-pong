import React, { useContext } from 'react';
import './style.css';

import { GameContext } from '../../contexts/GameContext';

const PlayersList = () => {
    const { players } = useContext(GameContext);
    
    return (
        <div className='players-container'>
            <div className="players-header">
                <span>Jogadores</span>
            </div>
            <div className='list-players'>
                {Object.keys(players)
                    .map((key) => (
                        <div key={key} className='player-name'>{ players[key].name }</div>
                    ))
                }
            </div>
        </div>
    );
};

export default PlayersList;