import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _user = null;
class UserStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getUser() {
        return _user;
    }
    getUserById() {
        return _user._id;
    }

    isSubscribed(activityId) {
        return _user?.cart?.some(
            (element) => element === activityId || element._id === activityId
        );
    }
}

const userStore = new UserStore();
dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.LOAD_USER:
            _user = action.data;
            userStore.emitChange();
            break;
        case actionTypes.REGISTER_USER:
            _user = action.data;
            userStore.emitChange();
            break;
        case actionTypes.ADD_TO_CART:
            _user = action.data;
            userStore.emitChange();
            break;
        default:
            break;
    }
});

export default userStore;
