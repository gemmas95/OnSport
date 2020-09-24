import React, { useState, useEffect } from 'react';
import './activityDetailsComponent.scss';
import activityStore from '../../store/activityStore';
import { getActivityById } from '../../actions/activityActions';
import LoadingComponent from '../loadingComponent/loadingComponent';
import Carrousel from './MyGallery';
import { addActitvityOfCart } from '../../actions/authActions';
import { useAuth0 } from '@auth0/auth0-react';
import userStore from '../../store/userStore';

function ActivityDetailsComponent(props) {
    const { isAuthenticated, user } = useAuth0();
    const [activity, setActivity] = useState(
        activityStore.getActivityById(props.match.params.activityId)
    );
    const [userMongo, setUserMongo] = useState(userStore.getUser());
    const [activityId] = useState(props.match.params.activityId);

    const [isSubscribed, setIsSubscribed] = useState(
        userStore.isSubscribed(props.match.params.activityId)
    );

    // Cada vegada que canvii alguna de les coses del useEffect farà tot aquest codi
    useEffect(() => {
        userStore.addChangeListener(onCartChange);

        return () => {
            userStore.removeChangeListener(onCartChange);
        };
    }, [user, isSubscribed, userMongo]);

    function onCartChange() {
        setIsSubscribed(userStore.isSubscribed(props.match.params.activityId));
        setUserMongo(userStore.getUser());
    }

    useEffect(() => {
        activityStore.addChangeListener(onChange);
        if (!activity) {
            getActivityById(props.match.params.activityId);
        }
        return () => {
            activityStore.removeChangeListener(onChange);
        };
    }, [activity, user, props.match.params.activityId]);

    function onChange() {
        setActivity(activityStore.getActivity());
    }

    // Llamamos a esta función al agragar o quitar del cart las activities
    function onSubmit(userMongo, activityId) {
        addActitvityOfCart(userMongo?._id, activityId);
    }

    return (
        <>
            {!activity && <LoadingComponent />}
            {activity && (
                <div className="centerContainer">
                    <div className="bannerContainerDetails">
                        <img
                            src="https://checkyeti.imgix.net/images/optimized/diver-min14.jpg"
                            alt="logo_img"
                        ></img>
                        <h1>{activity && activity.name}</h1>
                    </div>
                    <div className="mainContainer">
                        <section className="descriptionCenter activity__description">
                            <p>{activity && activity.description}</p>
                            <div>
                                <span>Fechas:</span>
                                <p>{activity.dates}</p>
                            </div>
                            <p>
                                <span>Punto de salida:</span>{' '}
                                {activity && activity.startPoint}
                            </p>
                            <p>
                                <span>Especies en el área:</span>{' '}
                                {activity && activity.speciesInArea}
                            </p>
                            <p>
                                <span>Precio:</span>{' '}
                                {activity && activity.price}$
                            </p>
                        </section>
                        <div className="flex_col_to_row__container">
                            <section>
                                <h3>Características específicas</h3>
                                <div className="descriptionCenter  descriptionCenter__other details__activity__alignment">
                                    <p>
                                        <span>Dificultad:</span>{' '}
                                        {activity && activity.difficulty}
                                    </p>
                                    <p>
                                        <span>Tipo: </span>
                                        {activity && activity.type}
                                    </p>
                                    <p>
                                        <span>Profundidad:</span>{' '}
                                        {activity && activity.depth}m
                                    </p>
                                </div>
                                <div className="text__align__center">
                                    <p>
                                        <span>Requisitos:</span>{' '}
                                        {activity && activity.requisits}
                                    </p>
                                </div>
                            </section>
                        </div>
                        <div className="activity__images__container">
                            <h4>Galeria de imágenes</h4>

                            <Carrousel myActivity={activity} />
                        </div>

                        <section className="descriptionCenter">
                            <div className="buttons__container">
                                {isAuthenticated && userMongo && isSubscribed && (
                                    // Envia una acción al put

                                    <button
                                        onClick={() =>
                                            onSubmit(userMongo, activityId)
                                        }
                                    >
                                        Desapuntarse
                                    </button>
                                )}

                                {isAuthenticated &&
                                    userMongo &&
                                    !isSubscribed && (
                                        <button
                                            onClick={() =>
                                                onSubmit(userMongo, activityId)
                                            }
                                        >
                                            Reserva tu plaza
                                        </button>
                                    )}
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}

export default ActivityDetailsComponent;
