import React from 'react';
import { NavLink } from 'react-router-dom';
import './navComponent.scss';
import LoginButton from '../auth/loginComponent/LoginButton';
import LogoutButton from '../auth/logoutButton/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

function NavComponent() {
    const { user, isAuthenticated } = useAuth0();

    return (
        <header className="nav__alignment">
            <h1 className="logoPage">OnSport</h1>
            <NavLink to="/">Sports</NavLink>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && (
                <>
                    <NavLink to="/auth/profile">
                        <img
                            className="profileImg"
                            src={
                                (user && user.picture) ||
                                'https://image.flaticon.com/icons/svg/848/848043.svg'
                            }
                            alt="Profile"
                        ></img>
                    </NavLink>
                    <LogoutButton />
                </>
            )}
        </header>
    );
}

export default NavComponent;
