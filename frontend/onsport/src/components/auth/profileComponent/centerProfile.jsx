import React, { useEffect, useState } from 'react';
import './profileComponent.scss';
import { deleteActivity } from './../../../actions/activityActions';
import { useHistory, NavLink } from 'react-router-dom';
import { loadCenters } from '../../../actions/centerActions';
import centerStore from '../../../store/centerStore';

function CenterProfile({ centerMongo, user }) {
    const [actualCenter, setActualActivities] = useState(
        centerStore.getCenterById(centerMongo._id)
    );
    const history = useHistory();

    // UseEffect necesary in order to update activitylist at same moment of eliminate one
    useEffect(() => {
        centerStore.addChangeListener(onChange);

        loadCenters();

        return () => centerStore.removeChangeListener(onChange);
        // LA CLAVE EN RECARGAR SI CANVIA actualCenter.activities.lenght
    }, [actualCenter.activities.length]);
    function onChange() {
        setActualActivities(centerStore.getCenterById(centerMongo._id));
    }

    function onDelete(event, activityId) {
        event.preventDefault();
        deleteActivity(activityId);
        alert(`This activity has been deleted`);
        history.push('/auth/profile');
    }
    return (
        <>
            <div className="form__alignment">
                <img
                    src={centerMongo.logo || user.picture}
                    alt="user_picture"
                ></img>
                <p> Nombre: {centerMongo.name}</p>
                <p> Email: {centerMongo.email}</p>

                <p> Deporte: {centerMongo.sport}</p>
                <p> Telefono: {centerMongo.phone}</p>
                <p> Ciudad: {centerMongo.city}</p>
                <p> Calle: {centerMongo.street}</p>
                <p> Codigo postal: {centerMongo.postal_code}</p>
                <p> Descripción: {centerMongo.description}</p>
            </div>
            {centerMongo.activities && (
                <>
                    <h1>Tus actividades</h1>{' '}
                    {actualCenter.activities.map((activity) => {
                        return (
                            <section
                                key={activity._id}
                                className="activity__center__container"
                            >
                                <>
                                    <div className="activity__center__small">
                                        <p>
                                            <span>Nombre:</span> {activity.name}
                                        </p>
                                        <p>
                                            <span>Disponibilidad:</span>{' '}
                                            {activity.dates}
                                        </p>

                                        <p>
                                            <span>Punto de salida:</span>{' '}
                                            {activity.startPoint}
                                        </p>
                                        <p>
                                            <span>Precio:</span>{' '}
                                            {activity.price}€
                                        </p>
                                        <img
                                            className="activityImage"
                                            src={
                                                activity.images_collection ||
                                                activity.images_collection[0]
                                            }
                                            alt="activity"
                                        ></img>
                                        <div className="buttons__alignment__row">
                                            <NavLink
                                                to={`/activities/formactivity/${activity._id}`}
                                            >
                                                <button className="button__yellow">
                                                    Modificar
                                                </button>
                                            </NavLink>
                                            <button
                                                className="button__red"
                                                onClick={(event) =>
                                                    onDelete(
                                                        event,
                                                        activity._id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                        <NavLink
                                            to={`/activities/${activity._id}`}
                                        >
                                            Ver detalle
                                        </NavLink>
                                    </div>
                                    <div className="usersSubscribed__container">
                                        <span>
                                            Personas que quieren realizar la
                                            actividad:
                                        </span>{' '}
                                        <ul>
                                            {activity?.usersSubscribed.map(
                                                (userSubs) => {
                                                    return (
                                                        <li key={userSubs.sub}>
                                                            {userSubs.username},{' '}
                                                            {userSubs.email},{' '}
                                                            {userSubs.phone}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </>
                            </section>
                        );
                    })}
                </>
            )}
        </>
    );
}
export default CenterProfile;
