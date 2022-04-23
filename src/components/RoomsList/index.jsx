import React, { useContext } from "react";
import './style.css';

import { GameContext, createRoom, joinRoom, leaveRoom } from '../../contexts/GameContext';
import Button from '../Button';

const RoomsList = () => {
    const { player, rooms, room } = useContext(GameContext);

    return (
        <div className="rooms-container">
            <div className="rooms-header">
                <span>Salas</span>
                { !player.room && <Button text={"Criar Sala"} onClick={createRoom} /> }
            </div>
            {
                !player.room &&
                    <div className="list">
                        <div className="list-rooms">
                            {
                                Object.keys(rooms).map((key) => {
                                    return (
                                        <div key={key} className="list-item">
                                            {rooms[key].name}
                                            <Button text={"Entrar"} onClick={() => joinRoom(key)} disabled={rooms[key].player1 && rooms[key].player2} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
            }
            {
                player.room && room &&
                    <div className="list-rooms">
                        {
                            rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2 ?
                                <Button text={"Iniciar Jogo"} />
                            :
                            <div className="list-item">
                                {room.name}
                                <Button text={"Sair"} onClick={leaveRoom} />
                            </div>
                        }   
                    </div>
            }
        </div>
    );
};

export default RoomsList;