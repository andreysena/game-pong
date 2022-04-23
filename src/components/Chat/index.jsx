import React, { useContext, useState, useRef, useEffect} from 'react';
import './style.css';

import { GameContext, sendMessage } from '../../contexts/GameContext';
import Button from '../Button';

const Chat = () => {
    const { messages } = useContext(GameContext);
    const [messageToSend, setMessageToSend] = useState('');
    const { player } = useContext(GameContext);
    const wrapper = useRef();

    const sendMessageAndClearInput = () => {
        sendMessage(messageToSend);
        setMessageToSend("");
    };

    useEffect(() => {
        wrapper.current.scrollTop = wrapper.current.scrollHeight;
    }, [messages]);

    return (
        <div className='chat-container'>
            <div className='chat-background'>
                <div className='messages-container'>
                    <div ref={wrapper} className="wrapper">
                        <div className="messages">
                            {
                                messages.map((message, i) => {
                                    if (message.sender === player.name) {
                                        return (
                                            <span key={i} className='self-player-message'>{message.message}</span>
                                        );
                                    } else if (message.sender === 'game') {
                                        return (
                                            <span key={i} className='game-message'>{message.message}</span>
                                        );
                                    } else {
                                        return (
                                            <span key={i} className="player-message">{`${message.sender}: ${message.message}`}</span>
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='input-container'>
                    <input 
                        name='input'
                        type="text" 
                        value={messageToSend} 
                        onChange={(e) => setMessageToSend(e.target.value)} 
                    />
                    <Button
                        text={"Enviar"}
                        onClick={messageToSend ? () => sendMessageAndClearInput() : null} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat;