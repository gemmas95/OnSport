import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './../profileComponent/profileComponent.scss';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            className="button__red"
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
