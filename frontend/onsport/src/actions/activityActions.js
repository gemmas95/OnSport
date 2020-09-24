import actionTypes from './actionTypes';
import dispatcher from '../dispatcher';
import axios from 'axios';

// import activitiesData from '../mocks/activitiesData';

export function loadActivities() {
    return axios.get('/api/activities').then((activities) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_ACTIVITIES,
            data: activities.data
        });
    });
}

export function getActivityById(activityId) {
    return axios.get(`/api/activities/${activityId}`).then((activity) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_ACTIVITY,
            data: activity.data
        });
    });
}

// Este dataNewActivity tiene el sub del usuario (o id), y la información de la nueva actividad
export function createActivity(dataNewActivity) {
    return axios.post('/api/activities', dataNewActivity).then((activity) => {
        dispatcher.dispatch({
            type: actionTypes.CREATE_ACTIVITY,
            data: activity.data
        });
    });
}

export function updateActivity(dataNewActivity, activityId) {
    return axios
        .put(`/api/activities/${activityId}`, dataNewActivity)
        .then((activity) => {
            dispatcher.dispatch({
                type: actionTypes.UPDATE_ACTIVITY,
                data: activity.data
            });
        });
}

export function deleteActivity(activityId) {
    return axios.delete(`/api/activities/${activityId}`).then(() => {
        dispatcher.dispatch({
            type: actionTypes.DELETE_ACTIVITY,
            data: activityId
        });
    });
}
