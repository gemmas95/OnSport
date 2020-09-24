import dispatcher from '../dispatcher';
import axios from 'axios';
import {
    createActivity,
    deleteActivity,
    getActivityById,
    loadActivities,
    updateActivity
} from './activityActions';

jest.dontMock('./authActions');
jest.mock('axios');
jest.mock('../dispatcher');

describe('Activity actions', () => {
    afterEach(() => {
        dispatcher.dispatch.mockClear();
    });
    it('should call GET of loadActivities', async () => {
        axios.get.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        await loadActivities();
        expect(axios.get.mock.calls[0][0]).toEqual('/api/activities');
    });
    it('should call GET of getActivityById', async () => {
        axios.get.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        const activityId = '1';
        await getActivityById(activityId);
        expect(axios.get.mock.calls[1][0]).toEqual(
            `/api/activities/${activityId}`
        );
    });
    it('should call POST', async () => {
        axios.post.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        const dataNewActivity = { id: 12 };
        await createActivity(dataNewActivity);
        expect(axios.post.mock.calls[0][0]).toEqual(
            '/api/activities',
            dataNewActivity
        );
    });
    it('should call PUT', async () => {
        axios.put.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        const activityId = 1;
        const dataNewActivity = { id: 12 };
        await updateActivity(dataNewActivity, activityId);
        expect(axios.put.mock.calls[0][0]).toEqual(
            `/api/activities/${activityId}`,
            dataNewActivity
        );
    });
    it('should call DELETE', async () => {
        axios.delete.mockReturnValue(
            new Promise((resolve) => resolve({ data: {} }))
        );
        const activityId = 12;
        await deleteActivity(activityId);
        expect(
            axios.delete.mock.calls[0][0]
        ).toEqual(`/api/activities/${activityId}`, { activityId });
    });
});
