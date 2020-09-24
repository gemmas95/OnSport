import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _activities = [];
let _activity = null;

class ActivityStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getActivities() {
        return _activities;
    }

    getActivityById(id) {
        // This will find our activity id, now find my id, not the _id
        return _activities.find((activity) => activity._id === id);
    }

    getActivity() {
        return _activity;
    }
}

const activityStore = new ActivityStore();
dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.LOAD_ACTIVITIES:
            _activities = action.data;
            activityStore.emitChange();
            break;
        case actionTypes.LOAD_ACTIVITY:
            _activity = action.data;
            activityStore.emitChange();
            break;
        case actionTypes.CREATE_ACTIVITY:
            _activities = [..._activities, { ...action.data }];
            activityStore.emitChange();
            break;
        case actionTypes.DELETE_ACTIVITY:
            _activities = _activities.filter(
                (activity) => activity.id !== action.data.activityId
            );
            activityStore.emitChange();
            break;
        case actionTypes.UPDATE_ACTIVITY:
            _activities = _activities.map((activity) => {
                if (activity._id === action.data._id) {
                    activity = action.data;
                }
            });
            activityStore.emitChange();
            break;
        default:
            break;
    }
});

export default activityStore;
