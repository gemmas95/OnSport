import React from 'react';
import { NavLink } from 'react-router-dom';

function userProfile({ user, userMongo }) {
    return (
        <>
            <img src={user.picture} alt={user.sub}></img>
            <p> Nombre: {userMongo.username}</p>
            <p> Apellido: {userMongo.lastname}</p>
            <p> Email: {userMongo.email}</p>
            <p> Teléfono: {userMongo.phone}</p>
            <h1>Actividades en las que estas apuntado:</h1>
            <ul>
                {userMongo.cart.map((activity) => {
                    return (
                        <li key={activity._id}>
                            <NavLink to={`/activities/${activity._id}`}>
                                <span>{activity.name}</span>{' '}
                            </NavLink>
                            , starts in {activity.startPoint}, at{' '}
                            {activity.dates}!
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default userProfile;
