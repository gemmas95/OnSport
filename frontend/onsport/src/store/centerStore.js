import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _centers = [];
class CenterStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getCenters() {
        return _centers;
    }

    getCenterBySub(centerSub) {
        return _centers.find((center) => center.sub === centerSub);
    }

    getCenterById(id) {
        return _centers.find((center) => center._id === id);
    }
}

const centerStore = new CenterStore();
dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.LOAD_CENTERS:
            _centers = action.data;
            centerStore.emitChange();
            break;
        case actionTypes.CREATE_CENTER:
            _centers = action.data;
            centerStore.emitChange();
            break;
        default:
            break;
    }
});

export default centerStore;
