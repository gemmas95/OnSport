/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const userRouteController = require('../controllers/userRouteController');

describe('USER Controller', () => {
    afterEach(() => {
        sinon.restore();
    });
    describe('PUT', () => {
        it('should respond with status 404 error in user INISDE PROMISE', (done) => {
            const res = {
                status: () => {},
                json: () => {},
                send: () => {}
            };
            const req = {
                query: {
                    user: 'Bomba'
                },
                body: {
                    activityId: '1'
                },
                user: {
                    cart: [],
                    userAdmin: 'dffgd',
                    sub: 'fdg',
                    lastname: 'dfg',
                    username: 'fdg',
                    email: 'asdsa',
                    save: sinon.stub().callsFake(function fakefn(callback) {
                        callback(true);
                    })
                },
                activity: {}
            };
            sinon.stub(Promise, 'all').returns(
                new Promise((resolve, reject) => {
                    reject(userPromise);
                })
            );
            const statusSpy = sinon.spy(res, 'status');
            userRouteController.put(req, res);
            done();
            expect(statusSpy.calledWith(404)).to.be.true;
        });
        xit('should respond with status 404 when error in activity INISDE PROMISE', () => {
            const res = {
                status: () => {},
                json: () => {},
                send: () => {}
            };
            const req = {
                query: {
                    user: 'Bomba'
                },
                body: {
                    activityId: '1'
                },
                user: {
                    cart: [],
                    save: sinon.stub().callsFake(function fakefn(callback) {
                        callback(false);
                    })
                },
                activity: {
                    usersSubscribed: [],
                    save: sinon.stub().callsFake(function fakefn(callback) {
                        callback(true);
                    })
                }
            };
            const statusSpy = sinon.spy(res, 'status');
            userRouteController.put(req, res);
            expect(statusSpy.calledWith(404)).to.be.true;
        });
        xit('should respond with status 200 when no error in activity and user INISDE PROMISE', () => {
            const res = {
                status: () => {},
                json: () => {},
                send: () => {}
            };
            const resolve = true;
            const reject = false;
            const userPromise = (callback) => callback(resolve, reject);
            const req = {
                query: {
                    user: 'Bomba'
                },
                body: {
                    activityId: '1'
                },
                user: {
                    cart: [],
                    save: sinon.stub().callsFake(function fakefn(callback) {
                        callback(true);
                    })
                },
                activity: {
                    usersSubscribed: [],
                    save: sinon.stub().callsFake(function fakefn(callback) {
                        callback(true);
                    })
                }
            };
            const userPromiseSpy = sinon.spy(userPromise, 'callback');
            userPromiseSpy(true, false);
            const statusSpy = sinon.spy(res, 'status');
            userRouteController.put(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });
        it('should respond status 404 when no existing activity', () => {
            const res = {
                status: () => {},
                json: () => {},
                send: () => {}
            };
            const req = {
                query: {
                    user: 'Bomba'
                },
                body: {
                    activityId: '1'
                },
                user: {
                    cart: [],
                    save: (callback) => {
                        callback();
                    }
                }
            };
            const statusSpy = sinon.spy(res, 'status');
            userRouteController.put(req, res);
            expect(statusSpy.calledWith(404)).to.be.true;
        });
        it('should respons status 404 when no user found', () => {
            const res = {
                status: () => {},
                send: () => {}
            };
            const req = {
                query: {},
                body: {
                    activityId: {}
                }
            };
            const statusSpy = sinon.spy(res, 'status');
            userRouteController.put(req, res);
            expect(statusSpy.calledWith(404)).to.be.true;
        });
        it('should send a message whtn no user found', () => {
            const res = {
                status: () => {},
                send: () => {}
            };
            const req = {
                query: {},
                body: {
                    activityId: {}
                }
            };
            const sendSpy = sinon.spy(res, 'send');
            userRouteController.put(req, res);
            expect(sendSpy.callCount).to.equal(1);
        });
        it('should send a message whtn no user found', () => {
            const res = {
                status: () => {},
                send: () => {}
            };
            const req = {
                query: {},
                body: {
                    activityId: {}
                }
            };
            const sendSpy = sinon.spy(res, 'send');
            userRouteController.put(req, res);
            expect(sendSpy.calledWith('This user does not exist')).to.be.true;
        });
    });
});
