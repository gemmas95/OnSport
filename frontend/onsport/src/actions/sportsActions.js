import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export async function loadSports() {
    return axios.get('/api/sports').then((sports) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_SPORTS,
            data: sports.data
        });
    });
}
