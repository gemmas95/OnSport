import centerStore from './centerStore';
import actionTypes from '../actions/actionTypes';
import dispatcher from '../dispatcher';

function reduceAction(actionStore, state) {
    return {
        type: actionStore,
        data: state
    };
}

describe('CenterStore', () => {
    let action;
    let myCallbackMockFunction;
    beforeEach(() => {
        myCallbackMockFunction = jest.fn();
        centerStore.addChangeListener(myCallbackMockFunction);

        action = reduceAction(actionTypes.LOAD_CENTERS, [
            { id: 1, name: 'CNS' }
        ]);
        dispatcher.dispatch(action);
    });
    afterEach(() => {
        centerStore.removeChangeListener(myCallbackMockFunction);
    });
    it('should call the callback function', () => {
        expect(myCallbackMockFunction).toHaveBeenCalled();
        expect(myCallbackMockFunction).toHaveBeenCalledTimes(1);
    });
    it('should exist Store', () => {
        expect(centerStore).toBeDefined();
    });
    it('should return data', () => {
        expect(centerStore.getCenters()).toEqual(action.data);
    });
    it('should return data by id', () => {
        const center = { _id: 1, name: 'CNS' };
        expect(centerStore.getCenterById(center._id)).toEqual(action.data.id);
    });
    it('should return data by sub', () => {
        const center = { sub: 1, name: 'CNS' };
        expect(centerStore.getCenterBySub(center.sub)).toEqual(action.data.sub);
    });
    it('should do action to create center', () => {
        action = reduceAction(actionTypes.CREATE_CENTER, [
            { _id: 1, name: 'CNS' }
        ]);
        dispatcher.dispatch(action);
    });
    it("should break if there isn't the actual actionType and return default", () => {
        action = reduceAction(actionTypes.TEST_CENTERS, null);
        dispatcher.dispatch(action);
        // expect(centerStore.getCenters()).toBeUndefined();
    });
});
