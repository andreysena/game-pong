import React, { useEffect, useReducer } from "react";
import socketClient from 'socket.io-client';

const socket = socketClient('http://localhost:4000', { 
    transports : ['websocket'], 
    autoConnect: false 
});

const GameContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'CONNECTED':
            return {
                ...state,
                isConnected: action.payload
            };
        case 'PLAYERS':
            return {
                ...state,
                players: action.payload
            };
        case 'PLAYER':
            return {
                ...state,
                player: action.payload
            };
        case 'ROOMS':
            return {
                ...state,
                rooms: action.payload
            };
        case 'ROOM':
            return {
                ...state,
                room: state.rooms[state.players[action.payload].room]
            };
        case 'MATCH':
            return {
                ...state,
                match: action.payload
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        default:
            return state;
    }
};

const initalState = {
    isConnected: false,
    players: {},
    player: {},
    rooms: {},
    room: {},
    match: {},
    messages: [],
}

const GameProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado!');
            dispatch({type: 'CONNECTED', payload: true});
        });

        socket.on('disconnect', () => {
            console.log("Desconectado!");
            
        });

        socket.on('refreshPlayers', (players) => {
            dispatch({type: 'PLAYERS', payload: players});
            dispatch({type: 'PLAYER', payload: players[socket.id]});
        });

        socket.on('refreshRooms', (rooms) => {
            dispatch({type: 'ROOMS', payload: rooms});
            dispatch({type: 'ROOM', payload: socket.id});
        });

        socket.on('refreshMatch', (match) => {
            console.log(match);
            dispatch({type: 'MATCH', payload: match});
        });

        socket.on('receiveMessage', (receivedMessage) => {
            dispatch({type: 'ADD_MESSAGE', payload: receivedMessage});
        });

        socket.open();
    }, []);

   
    return (
        <GameContext.Provider value={state}>
            {props.children}
        </GameContext.Provider>
    )
};

const sendMessage = (message) => {
    socket.emit('sendMessage', message);
};

const createRoom = () => {
    socket.emit('createRoom');
};

const joinRoom = (roomId) => {
    socket.emit('joinRoom', roomId);
};

const leaveRoom = () => {
    socket.emit('leaveRoom');
};

const gameLoaded = () => {
    socket.emit('gameLoaded');
};

let lastType = undefined;
const sendKey = (type, key) => {
    if (lastType === type) {
        return;
    }

    lastType = type;
    socket.emit('sendKey', { type, key });
};

export {GameContext, GameProvider, sendMessage, createRoom, joinRoom, leaveRoom, gameLoaded, sendKey};

// const removeListener = (eventName, socket) => {
//     const listeners = socket.listeners(eventName);
//     Object.keys(listeners).forEach((key) => {
//         socket.removeListener(eventName, listeners[key]);
//     });
// };