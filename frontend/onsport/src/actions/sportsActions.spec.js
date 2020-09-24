import dispatcher from '../dispatcher';
import axios from 'axios';
import { loadSports } from './sportsActions';

jest.dontMock('./authActions');
jest.mock('axios');
jest.mock('../dispatcher');

describe('Testing sportsActions', () => {
    afterEach(() => {
        dispatcher.dispatch.mockClear();
    });
    beforeEach(() => {
        loadSports = require('./sportsActions').loadSports;
    });
    it('should call GET with loadSports', async () => {
        axios.get.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        await loadSports();
        expect(axios.get.mock.calls[0][0]).toEqual('/api/sports');
    });
});
