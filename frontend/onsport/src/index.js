import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <Auth0Provider
        domain="dev-8wo87k37.eu.auth0.com"
        clientId="5HshGNjDZpL6hEuJIvZu1Ht6uKvGtREI"
        redirectUri={'http://localhost:3000/auth/profile'}
    >
        <Router>
            <App />
        </Router>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
