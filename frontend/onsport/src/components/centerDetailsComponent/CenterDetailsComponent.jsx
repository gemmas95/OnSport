import React, { useState, useEffect } from 'react';
import './centerDetailsComponent.scss';
import centerStore from '../../store/centerStore';
import { loadCenters } from '../../actions/centerActions';
import TabCenterDetails from './TabCenterDetails';
import LoadingComponent from '../loadingComponent/loadingComponent';
import { NavLink } from 'react-router-dom';
import Map from '../mapComponent/Map';

function CenterDetailsComponent(props) {
    const [centers, setCenters] = useState(centerStore.getCenters());
    const [center, setCenter] = useState('');

    window.scrollTo(0, 0);

    useEffect(() => {
        centerStore.addChangeListener(onChange);
        // No fiquem el + perque no volem convertir a numero, ja es una string
        const centerId = props.match.params.centerId;
        if (centers.length === 0) {
            loadCenters();
        } else if (centerId) {
            setCenter(centerStore.getCenterById(centerId));
            return () => centerStore.removeChangeListener(onChange);
        }
    }, [centers.length, props.match.params.centerId]);
    function onChange() {
        setCenters(centerStore.getCenters());
    }

    return (
        <>
            {centers.length <= 0 && <LoadingComponent />}
            {centers.length > 0 && (
                <div className="centerContainer">
                    <div className="bannerContainer">
                        <img
                            className="bannerImage"
                            src={center.logo}
                            alt="logo_img"
                        ></img>

                        <h1>{center.name}</h1>
                    </div>
                    <div className="mainContainer">
                        <h2>Detalles del centro</h2>
                        <section className="descriptionCenter">
                            <TabCenterDetails
                                centerDescription={center.description}
                                centerOpinions={center.opiniones}
                                centerAct={center.activities}
                            />
                            <div className="flexRow">
                                <div>
                                    <div className="inline">
                                        <img
                                            src="https://cdn2.iconfinder.com/data/icons/social-media-8/512/pointer.png"
                                            alt="pointer_ubication"
                                        ></img>
                                        <p>
                                            <span>Ubicación:</span>{' '}
                                            {center.city}
                                        </p>
                                    </div>
                                    <Map
                                        city={center.city}
                                        street={center.street}
                                    />
                                </div>
                                <div>
                                    <p>
                                        <span>Contacta con nosotros:</span>
                                    </p>
                                    <div className="contactInfo">
                                        <p>
                                            <span>Telefono:</span>{' '}
                                            {center.phone}
                                        </p>
                                        <p>
                                            <span>Email:</span> {center.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="activityList">
                            <h2>Actividades</h2>
                            <div className="containerActivity">
                                {center.activities &&
                                    center.activities.map((activity) => {
                                        return (
                                            <div
                                                className="activity"
                                                key={activity._id}
                                            >
                                                <h3>{activity.name}</h3>
                                                <p>
                                                    <span>Disponibilidad:</span>{' '}
                                                    {activity.dates}
                                                </p>

                                                <p>
                                                    <span>
                                                        Punto de salida:
                                                    </span>{' '}
                                                    {activity.startPoint}
                                                </p>
                                                <p>
                                                    <span>Precio:</span>{' '}
                                                    {activity.price}€
                                                </p>
                                                <img
                                                    className="activityImage"
                                                    src={
                                                        activity
                                                            .images_collection[0]
                                                    }
                                                    alt="activity"
                                                ></img>
                                                <NavLink
                                                    to={`/activities/${activity._id}`}
                                                >
                                                    <button className="button__yellow">
                                                        Ver detalles
                                                    </button>
                                                </NavLink>
                                            </div>
                                        );
                                    })}
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}

export default CenterDetailsComponent;
