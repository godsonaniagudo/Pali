import React from 'react';
import "./styles/styles.css"


const Button = ({label, onClick}) => {
    return (
        <button onClick={() => {
            if (onClick) {
                onClick()
            }
        }}>{label}</button>
    )
}

export default Button