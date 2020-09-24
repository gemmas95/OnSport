import dispatcher from '../dispatcher';
import axios from 'axios';
import { createCenter, loadCenters } from './centerActions';

jest.dontMock('./authActions');
jest.mock('axios');
jest.mock('../dispatcher');

describe('Testing centerActions', () => {
    afterEach(() => {
        dispatcher.dispatch.mockClear();
    });

    it('should call GET with loadCenters', async () => {
        axios.get.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        await loadCenters();
        expect(axios.get.mock.calls[0][0]).toEqual('/api/centers');
    });
    it('should call POST with createCenter', async () => {
        axios.post.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        let dataRegister = '11';
        await createCenter(dataRegister);
        expect(axios.post.mock.calls[0][0]).toEqual(
            '/api/centers',
            dataRegister
        );
    });
});
