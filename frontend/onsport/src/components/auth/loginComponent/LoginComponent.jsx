import { useAuth0 } from '@auth0/auth0-react';

import React from 'react';
import LogoutButton from '../logoutButton/LogoutButton';

import './loginComponent.scss';
// import { login, logout } from '../../../actions/authActions';

function LoginComponent(props) {
    const { loginWithRedirect } = useAuth0();

    /*     const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); */
    return (
        <div className="mainContainer">
            <h1>Sign in</h1>
            <form>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    //                    value={email}
                    //                    onChange={(event) => handleChange(event, setEmail)}
                    required
                ></input>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    //                    value={password}
                    //                    onChange={(event) => handleChange(event, setPassword)}
                    required
                ></input>
                {/*                 <button
                    className="submit"
                    type="submit"
                    value="Dive in"
                    onClick={(event) => {
                        event.preventDefault();
                        login(email, password);
                    }}
                ></button> */}
                <button onClick={() => loginWithRedirect()}>Log In</button>
                <LogoutButton />
            </form>
        </div>
    );
}

export default LoginComponent;
