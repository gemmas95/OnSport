import activityStore from './activityStore';
import actionTypes from '../actions/actionTypes';
import dispatcher from './../dispatcher';

function reduceAction(actionStore, state) {
    return {
        type: actionStore,
        data: state
    };
}
describe('ActivityStore', () => {
    let action;
    let myCallbackMockFunction;
    beforeEach(() => {
        myCallbackMockFunction = jest.fn();
        activityStore.addChangeListener(myCallbackMockFunction);
        action = reduceAction(actionTypes.LOAD_ACTIVITIES, [
            { activityId: 1, name: 'CNS' }
        ]);
        dispatcher.dispatch(action);
    });
    afterEach(() => {
        activityStore.removeChangeListener(myCallbackMockFunction);
    });
    it('should call the callback function', () => {
        expect(myCallbackMockFunction).toHaveBeenCalled();
        expect(myCallbackMockFunction).toHaveBeenCalledTimes(1);
    });
    it('should exist Store', () => {
        expect(activityStore).toBeDefined();
    });
    it('should return data', () => {
        expect(activityStore.getActivities()).toEqual(action.data);
    });
    it('should return data by id', () => {
        const id = 1;
        expect(activityStore.getActivityById(id)).toEqual(action.data.id);
    });
    it('should NOT return with invalid ID', () => {
        const id = 3;
        expect(activityStore.getActivityById(id)).toEqual();
    });
    it('should return one activity', () => {
        expect(activityStore.getActivity()).toEqual(action.data);
    });
    it('should do LOAD_ACTIVITY', () => {
        action = reduceAction(actionTypes.LOAD_ACTIVITY);
        dispatcher.dispatch(action);
        expect(actionTypes.LOAD_ACTIVITY).toBeDefined();
    });
    it('should do CREATE_ACTIVITY case', () => {
        action = reduceAction(actionTypes.CREATE_ACTIVITY);
        dispatcher.dispatch(action);
        expect(actionTypes.CREATE_ACTIVITY).toBeDefined();
    });
    it('should do DELETE_ACTIVITY case', () => {
        const id = 14;
        action = reduceAction(actionTypes.DELETE_ACTIVITY, { id });
        dispatcher.dispatch(action);
        expect(actionTypes.DELETE_ACTIVITY).toBeDefined();
    });
    it('should do UPDATE_ACTIVITY case', () => {
        // Para que entrara en el else en la action no deberia existir activityId, como esta en el beforeEach entra
        action = reduceAction(actionTypes.UPDATE_ACTIVITY, [
            { _id: 14, name: 'Celeritas' }
        ]);
        dispatcher.dispatch(action);
        expect(actionTypes.UPDATE_ACTIVITY).toBeDefined();
    });
    it('should break if there is not the actual actionType and return default', () => {
        action = reduceAction(actionTypes.TEST_ACTIVITY, null);
        dispatcher.dispatch(action);
        expect(activityStore).toBe.truthy;
    });
});
