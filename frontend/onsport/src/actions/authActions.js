import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export function createUser(dataUser) {
    // le retornamos un objeto peorqu etiene que pemetse en el body como objeto, sino no llega
    return axios.post('/api/auth', dataUser).then((user) => {
        dispatcher.dispatch({
            type: actionTypes.REGISTER_USER,
            data: user.data
        });
    });
}

export function loadUsers(userSub) {
    return axios.get(`/api/auth/?sub=${userSub}`).then((userData) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_USER,
            data: userData.data
        });
    });
}
// Con vane
export function addActitvityOfCart(userMongo, activityId) {
    const obj = { activityId: activityId };
    return axios.put(`/api/auth/${userMongo}`, obj).then((response) => {
        dispatcher.dispatch({
            type: actionTypes.ADD_TO_CART,
            data: response.data.user
        });
        dispatcher.dispatch({
            type: actionTypes.UPDATE_ACTIVITY,
            data: response.data.activity
        });
    });
}
