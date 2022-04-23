import React, {useContext} from 'react';
import './style.css';

import { GameContext } from '../../contexts/GameContext';
import RoomsList from '../RoomsList';
import PlayerList from '../PlayersList';
import Chat from '../Chat';
import Game from '../Game';

const Pong = () => {
    const { isConnected, match } = useContext(GameContext);
    return (
        <>
            
            {
                !isConnected &&  
                    <div>
                        <h1>Conectando...</h1>
                    </div>
            }

            { match.status && <Game /> }

            {   
                !match.status &&
                <div className='pong-container'>
                    <div className='list-container'>
                        <RoomsList />
                        <PlayerList />
                    </div>
                    <Chat/>
                </div>   
            }    
        </>
    );
};

export default Pong;