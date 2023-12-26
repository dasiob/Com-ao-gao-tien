import React from 'react'

const Error = () => {
    const errorImageStyle = {
        display: 'block',
        margin: 'auto',
        marginTop: '3vh', 
    };
    return (
        <div >
            <img src="https://media.makeameme.org/created/its-a-bug-2365b68cf3.jpg" alt='Error' style={errorImageStyle}></img>
        </div>
    )
}

export default Error