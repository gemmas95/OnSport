/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const activityRouteController = require('../controllers/activityRouteController');

describe('ACTIVITY Controller', () => {
    describe('DELETER', () => {
        let req;
        let res;
        let error;
        beforeEach(() => {
            res = {
                send: () => {},
                status: () => {},
                json: () => {}
            };
            error = false;
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should send an error if there is not an activity', () => {
            error = true;
            req = {
                activity: {
                    remove: (callback) => {
                        callback(true);
                    }
                }
            };
            const sendSpy = sinon.spy(res, 'send');
            activityRouteController.deleter(req, res);
            expect(sendSpy.calledWith(error)).to.be.true;
        });
        xit('should send activity if there is no error', () => {
            const activity = {};
            req = {
                activity: {
                    remove: (callback) => {
                        callback(false);
                    }
                },
                body: {}
            };
            const jsonSpy = sinon.spy(res, 'json');
            activityRouteController.deleter(req, res);
            expect(jsonSpy.calledWith(activity)).to.be.true;
        });
        xit('should send status 200 when there is ok', () => {
            req = {
                body: {}
            };
            const statusSpy = sinon.spy(res, 'status');
            activityRouteController.deleter(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });
        it('should send status 404 with no activity', () => {
            req = {
                body: {}
            };
            const statusSpy = sinon.spy(res, 'status');
            activityRouteController.deleter(req, res);
            expect(statusSpy.calledWith(404)).to.be.true;
        });
        it('should send a messahe when no acivity existed', () => {
            req = {
                body: {}
            };
            const sendSpy = sinon.spy(res, 'send');
            activityRouteController.deleter(req, res);
            expect(sendSpy.calledWith('This activity does not exist')).to.be
                .true;
        });
    });
    describe('PUT', () => {
        let req;
        let res;
        beforeEach(() => {
            res = {
                send: () => {},
                status: () => {},
                json: () => {}
            };
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should send json activity when everything ok', () => {
            req = {
                body: {},
                activity: {
                    name: {},
                    description: {},
                    dates: {},
                    price: {},
                    save: (error) => {
                        error(false);
                    }
                }
            };
            const statusSpy = sinon.spy(res, 'status');
            activityRouteController.put(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });
        it('should send json activity when everything ok', () => {
            req = {
                body: {}
            };
            const statusSpy = sinon.spy(res, 'status');
            activityRouteController.put(req, res);
            expect(statusSpy.calledWith(404)).to.be.true;
        });
    });
    describe('GET', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should send a json when everything is ok', () => {
            const req = {
                body: {},
                activity: {}
            };
            const res = {
                json: () => {}
            };

            const jsonSpy = sinon.spy(res, 'json');
            activityRouteController.get(req, res);
            expect(jsonSpy.calledWith(req.activity)).to.be.true;
        });
    });
});
