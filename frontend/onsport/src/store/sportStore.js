import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _sports = [];
class SportStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getSports() {
        return _sports;
    }
    getSportById(id) {
        return _sports.find((sport) => sport._id === id);
    }

    /*     getUsers() {
        return _users;
    }

    getUserById(id) {
        return _users.find((user) => user.id === id);
    } */
}

const sportStore = new SportStore();
dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.LOAD_SPORTS:
            _sports = action.data;
            sportStore.emitChange();
            break;
        default:
            break;
    }
});

export default sportStore;
