import sportStore from './sportStore';
import actionTypes from '../actions/actionTypes';
import dispatcher from '../dispatcher';

function reduceAction(sportStore, state) {
    return {
        type: sportStore,
        data: state
    };
}

describe('SportStore', () => {
    let action;
    let myCallbackMockFunction;
    beforeEach(() => {
        myCallbackMockFunction = jest.fn();
        sportStore.addChangeListener(myCallbackMockFunction);

        action = reduceAction(actionTypes.LOAD_SPORTS, [
            { _id: 1, name: 'CNS' }
        ]);
        dispatcher.dispatch(action);
    });
    afterEach(() => {
        sportStore.removeChangeListener(myCallbackMockFunction);
    });
    it('should call the callback function', () => {
        expect(myCallbackMockFunction).toHaveBeenCalled();
        expect(myCallbackMockFunction).toHaveBeenCalledTimes(1);
    });
    it('should exist Store', () => {
        expect(sportStore).toBeDefined();
    });
    it('should return a sport', () => {
        expect(sportStore.getSports()).toEqual(action.data);
    });
    it('should return a sport by id', () => {
        expect(sportStore.getSportById()).toEqual(action.data._id);
    });
    it("should break if there isn't the actual actionType and return default", () => {
        action = reduceAction(actionTypes.TEST_CENTERS, null);
        dispatcher.dispatch(action);
        // expect(centerStore.getCenters()).toBeUndefined();
    });
});
