import dispatcher from '../dispatcher';
import actionTypes from './actionTypes';
import axios from 'axios';

export async function loadCenters() {
    return axios.get('/api/centers').then((centers) => {
        dispatcher.dispatch({
            type: actionTypes.LOAD_CENTERS,
            data: centers.data
        });
    });
}

export function createCenter(dataRegister) {
    return axios.post('/api/centers', dataRegister).then((center) => {
        dispatcher.dispatch({
            type: actionTypes.CREATE_CENTER,
            data: center.data
        });
    });
}
/* 
SIN CONECTARSE A API
export function loadCenters() {
  return new Promise((resolve) => {
    resolve(centersData);
  }).then((centers) => {
    dispatcher.dispatch({
      type: actionTypes.LOAD_CENTERS,
      data: centers,
    });
  });
} */

/* export function saveCenter(center) {
  return new Promise((resolve) => {
    resolve(center);
  }).then((savedCenter) => {
    dispatcher.dispatch({
      type: actionTypes.CREATE_CENTER,
      data: savedCenter,
    });
  });
} */

/* export function updateCenter(center) {
  return axios.put(`/centers/${center._id}`, center).then((updatedCenter) => {
    dispatcher.dispatch({
      type: actionTypes.UPDATE_CENTER,
      data: updatedCenter,
    });
  });
}

export function deleteCenter(id) {
  return axios.delete(`/centers/${id}`).then(() => {
    dispatcher.dispatch({
      type: actionTypes.DELETE_CENTER,
      data: { id },
    });
  });
}
 */
