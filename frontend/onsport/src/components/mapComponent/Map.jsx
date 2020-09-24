import React from 'react';

function Map({ city, street }) {
    function urlMap() {
        const key = `AIzaSyBWqzuZXBbrG-ROHQkdOyJ7x0R6mKkzqY4`;
        const url = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${city},${street}&zoom=10`;
        return url;
    }

    return (
        <iframe
            width="500"
            height="350"
            frameBorder="0"
            src={`${urlMap()}`}
            allowFullScreen
        ></iframe>
    );
}

export default Map;
