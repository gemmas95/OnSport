import dispatcher from '../dispatcher';
import axios from 'axios';
import { createUser, loadUsers, addActitvityOfCart } from './authActions';
/* import actionTypes from './actionTypes';
 */
// Tenemos que decirle que no mockee todo el archivo
jest.dontMock('./authActions');
jest.mock('axios');
jest.mock('../dispatcher');

describe('Auth actions', () => {
    afterEach(() => {
        // para limpiar el dispatcher
        dispatcher.dispatch.mockClear();
    });

    it('should call dispatch with data', async () => {
        axios.get.mockReturnValue(
            new Promise((resolve) => resolve({ data: { id: '2345' } }))
        );
        await loadUsers();
        expect(dispatcher.dispatch.mock.calls[0][0]).toEqual({
            // Type not necessary but i prefere to put it :)
            type: 'LOAD_USER',
            data: { id: '2345' }
        });
    });

    it('should call POST', async () => {
        axios.post.mockReturnValue(
            new Promise((resolve) => resolve({ name: 'Bombasto' }))
        );
        await createUser({ name: 'Bombasto' });
        expect(axios.post.mock.calls[0][0]).toEqual('/api/auth');
    });

    it('should call GET with with undefined query', async () => {
        axios.get.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        await loadUsers();
        expect(axios.get.mock.calls[0][0]).toEqual('/api/auth/?sub=undefined');
    });

    it('should call PUT with an existing user and dispatch to type ADD TO CARD of Auth Store', async () => {
        axios.put.mockReturnValue(
            new Promise((resolve) => resolve({ data: { user: '2345' } }))
        );
        const userSub = { name: 'Bomba' };
        await addActitvityOfCart(userSub);
        expect(axios.put.mock.calls[0][0]).toEqual({
            // Type not necessary but i prefere to put it :)
            type: 'ADD_TO_CART',
            data: { user: '2345' }
        });
    });
});
