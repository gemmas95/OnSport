import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../logoutButton/LogoutButton';
import './profileComponent.scss';
import { useState, useEffect } from 'react';
import { createUser, loadUsers } from './../../../actions/authActions';
import { createCenter, loadCenters } from './../../../actions/centerActions';
import LoadingComponent from '../../loadingComponent/loadingComponent';
import userStore from '../../../store/userStore';
import centerStore from './../../../store/centerStore';
import { NavLink, useHistory } from 'react-router-dom';

// Formularios que se rellenarán según sea usuario o centro
import CenterForm from './centerForm';
import UserForm from './userForm';

// Perfiles de centros o usuarios existentes
import CenterProfile from './centerProfile';
import UserProfile from './userProfile';

function ProfileComponent() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const history = useHistory();

    // El actualUser es una valiable ligada a un useState que llama al Store y coge los users cargados allí cuando existe un usuario ya registrado, tendrá todo lo que tenga el usuario a la base de datos
    const [userMongo, setUserMongo] = useState(userStore.getUser(user?.sub));
    const [centerMongo, setCenterMongo] = useState(
        centerStore.getCenterBySub(user?.sub)
    );

    // userId apuntará al valor de user.sub de Auth0 después de la promesa
    const [userId, setUserId] = useState([]);

    // Variables de los inputs user pendientes de que colección irá el usuario
    const [userAdmin, setAdmin] = useState();

    // Cada vez que hay un canvio en el userId o se hace todo lo del useEffect
    useEffect(() => {
        userStore.addChangeListener(onChange);

        window.scrollTo(0, 0);

        // Esta función se conecta a la api y le envia el sub para que detecte el usuario si ya existe y nos hace un GET
        if (user) setUserId(user);
        loadUsers(user?.sub);
        loadCenters(user?.sub);

        return () => userStore.removeChangeListener(onChange);
    }, [userId, user]);

    // Variables y handlers inputs center
    const [dataCenter, setDataCenter] = useState({
        name: '',
        logo: '',
        sport: '',
        id: '',
        phone: '',
        city: '',
        street: '',
        postal_code: '',
        location: '',
        description: '',
        opiniones: [],
        activities: []
    });

    const handleCenterChange = ({ target }) => {
        setDataCenter({
            ...dataCenter,
            sub: user?.sub,
            email: user?.email,
            [target.name]: target.value
        });
    };
    const handleCenterSubmit = (event) => {
        if (
            dataCenter.name === '' ||
            dataCenter.logo === '' ||
            dataCenter.city === '' ||
            dataCenter.sport === '' ||
            dataCenter.description === ''
        ) {
            alert('Error! You must enter the required inputs');
            return false;
        } else {
            event.preventDefault();
            createCenter(dataCenter);
            alert(
                "Welcome on board! We're pleasured to have you in our travel"
            );
            history.push('/');
        }
    };

    // Variables y handlers inputs user
    const [dataUser, setDataUser] = useState({
        username: '',
        lastname: '',
        image: '',
        phone: '',
        usergender: '',
        cart: []
    });

    const handleUserChange = ({ target }) => {
        setDataUser({
            ...dataUser,
            email: user?.email,
            sub: user?.sub,
            userAdmin: userAdmin,

            [target.name]: target.value
        });
    };
    const handleUserSubmit = (event) => {
        if (dataUser.username === '' || dataUser.lastname === '') {
            alert('Error! You must enter the required inputs');
            return false;
        } else {
            event.preventDefault();
            createUser(dataUser);
            alert('Welcome on board! You hope you enjoy your experience here');
            history.push('/');
        }
    };

    // congif pre render
    function onChange() {
        // si existe user setea el user en el setUserId que apunta a la avriable userMongo y sera lo que le retorna del store
        setUserMongo(userStore.getUser());
        // Hacemos un get de los centros
        setCenterMongo(centerStore.getCenterBySub(user?.sub));
    }

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <>
            {isAuthenticated && (
                <div className="mainContainer">
                    <section className="containerProfile">
                        <h2>
                            Bienvenido{' '}
                            {userMongo?.name || centerMongo?.name || user.email}
                            !
                        </h2>
                        {!userMongo && !centerMongo && (
                            <section className="flex__row__profile">
                                <img src={user.picture} alt={user.name} />
                                <div className="containerProfile">
                                    <>
                                        <label htmlFor="admin">
                                            {' '}
                                            Quieres registrarte como centro o un
                                            usuario?
                                        </label>
                                        <select
                                            type="text"
                                            id="admin"
                                            name="permissions"
                                            onChange={(event) =>
                                                setAdmin(
                                                    event.target.value.trim()
                                                )
                                            }
                                            required
                                        >
                                            <option value={userAdmin}>
                                                --Please choose an option--
                                            </option>
                                            <option value="center">
                                                Centro
                                            </option>
                                            <option value="user">
                                                Usuario
                                            </option>
                                        </select>
                                    </>
                                    {userAdmin === 'user' && (
                                        <UserForm
                                            dataUser={dataUser}
                                            onChange={handleUserChange}
                                            onSubmit={handleUserSubmit}
                                        />
                                    )}
                                    {userAdmin === 'center' && (
                                        <CenterForm
                                            dataCenter={dataCenter}
                                            onChange={handleCenterChange}
                                            onSubmit={handleCenterSubmit}
                                        />
                                    )}
                                </div>
                            </section>
                        )}
                        <div className="form__alignment">
                            {userMongo && (
                                <UserProfile
                                    user={user}
                                    userMongo={userMongo}
                                />
                            )}
                            {centerMongo && (
                                <CenterProfile
                                    user={user}
                                    centerMongo={centerMongo}
                                />
                            )}
                            {centerMongo && (
                                <div className="detailsUsers">
                                    <NavLink
                                        className="createActivity"
                                        to={
                                            '/activities/formactivity/newActivity'
                                        }
                                    >
                                        <button className="button__yellow">
                                            Crear nueva actividad
                                        </button>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <LogoutButton />
                    </section>
                </div>
            )}
        </>
    );
}

export default ProfileComponent;
