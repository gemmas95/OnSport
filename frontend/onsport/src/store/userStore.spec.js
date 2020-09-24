import userStore from './userStore';
import actionTypes from '../actions/actionTypes';
import dispatcher from '../dispatcher';

function reduceAction(userStore, state) {
    return {
        type: userStore,
        data: state
    };
}

describe('UserStore', () => {
    let action;
    let myCallbackMockFunction;
    beforeEach(() => {
        myCallbackMockFunction = jest.fn();
        userStore.addChangeListener(myCallbackMockFunction);

        action = reduceAction(actionTypes.LOAD_USER, [
            { _user: 1, name: 'CNS' }
        ]);
        dispatcher.dispatch(action);
    });
    afterEach(() => {
        userStore.removeChangeListener(myCallbackMockFunction);
    });
    it('should call the callback function', () => {
        expect(myCallbackMockFunction).toHaveBeenCalled();
        expect(myCallbackMockFunction).toHaveBeenCalledTimes(1);
    });
    it('should exist Store', () => {
        expect(userStore).toBeDefined();
    });
    it('should return a user', () => {
        expect(userStore.getUser()).toEqual(action.data);
    });

    it('should return a user cart with true or false', () => {
        const activityId = 1;
        action.data = [
            {
                cart: {
                    some: (element) => {
                        return 1;
                    }
                }
            }
        ];
        expect(userStore.isSubscribed(activityId)).toBeDefined();
    });

    it('should return a user by id', () => {
        expect(userStore.getUserById()).toEqual(action.data._id);
    });
    it('should do action to add to cart action', () => {
        action = reduceAction(actionTypes.ADD_TO_CART, [
            { _id: 1, name: 'CNS' }
        ]);
        dispatcher.dispatch(action);
    });
    it('should do action to register a user', () => {
        action = reduceAction(actionTypes.REGISTER_USER, [
            { _id: 1, name: 'CNS' }
        ]);
        dispatcher.dispatch(action);
    });
    it('should break if there is not the actual actionType and return default', () => {
        action = reduceAction(actionTypes.TEST_USERS, null);
        dispatcher.dispatch(action);
    });
});
