import React from 'react';
import './loadingComponent.scss';

function loadingComponent() {
    return (
        <div className="mainContainer__centered mainContainer">
            <img
                src="https://i.pinimg.com/originals/cd/23/fb/cd23fb22066170c0e25ed35f2a487ce2.gif"
                alt="loading_gif"
            ></img>
            <p>Loading...</p>
        </div>
    );
}

export default loadingComponent;
