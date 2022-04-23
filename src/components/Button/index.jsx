import React from 'react';
import './style.css';

const Button = ({text, onClick = () => {}, disabled}) => {
    return (
        <button
            type='submit'
            className={'button click-animation'}
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? '#A2B5EB' : null 
            }}
        >
            {text}
        </button>
    );
};

export default Button;