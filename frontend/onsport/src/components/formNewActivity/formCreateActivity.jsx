import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
    createActivity,
    loadActivities
} from './../../actions/activityActions';
import centerStore from './../../store/centerStore';
import activityStore from '../../store/activityStore';
import { loadCenters } from './../../actions/centerActions';

import FormActivity from './FormActivity';

import Geocode from 'react-geocode';

import { useHistory } from 'react-router-dom';

function FormCreateActivity(props) {
    const history = useHistory();

    const activityId = props.match.params.activityId;

    // Busqueda del identificador del usuario
    const { user, isAuthenticated } = useAuth0();
    const [centerMongo, setMongoCenter] = useState(
        centerStore.getCenterBySub(user?.sub)
    );
    const [activityMongo, setMongoActivity] = useState(null);

    const [activityName, setActivityName] = useState('');

    const userSub = user?.sub;

    useEffect(() => {
        centerStore.addChangeListener(onChange);

        window.scrollTo(0, 0);

        // Esta función se conecta a la api y le envia el sub para que detecte el usuario si ya existe y nos hace un GET

        if (isAuthenticated) {
            loadCenters();
            setMongoCenter(centerStore.getCenterBySub(user?.sub));
        }

        return () => centerStore.removeChangeListener(onChange);
    }, [user, userSub]);

    useEffect(() => {
        activityStore.addChangeListener(onChange);

        (async function asyncLoadActivities() {
            await loadActivities();
            setMongoActivity(activityStore.getActivityById(activityId));
        })();

        if (activityMongo) {
            setActivityName(activityMongo.name);
        }

        return () => activityStore.removeChangeListener(onChange);
    }, [centerMongo]);

    function onChange() {
        // si existe user setea el user en el setMongoCenter que apunta a la avriable centerMongo y sera lo que le retorna del store
        setMongoCenter(centerStore.getCenterBySub(user?.sub));
    }
    const centerId = centerMongo?._id;

    // useState de todas las variables de los inputs

    const [dataActivity, setDataCenter] = useState({
        name: activityName,
        sport: '',
        description: '',
        dates: '',
        price: '',
        requisits: '',
        duration: '',
        images_collection: '',
        depth: '',
        difficulty: '',
        type: '',
        startPoint: '',
        speciesInArea: '',
        location: ''
    });

    // GeoCode condiguration
    Geocode.setApiKey('AIzaSyBxnEm9tPVCwxE3WCAwPuFb2vUxG96HXFs');
    Geocode.setLanguage('en');
    Geocode.setRegion('es');

    const handleChange = ({ target }) => {
        setDataCenter({
            ...dataActivity,
            [target.name]: target.value,
            centerId
        });
    };

    // Submit configuration
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            dataActivity.name === '' ||
            dataActivity.description === '' ||
            dataActivity.dates === '' ||
            dataActivity.sport === '' ||
            dataActivity.price === '' ||
            dataActivity.duration === '' ||
            dataActivity.depth === '' ||
            dataActivity.difficulty === '' ||
            dataActivity.type === '' ||
            dataActivity.startPoint === ''
        ) {
            alert('You must complete all required inputs of the form');
            return false;
        } else {
            alert("You're activity has been created!");
            createActivity(dataActivity);
        }

        history.push('/auth/profile');
    };

    return (
        <FormActivity
            dataActivity={dataActivity}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}
export default FormCreateActivity;
