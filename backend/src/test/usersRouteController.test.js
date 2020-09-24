/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const usersRouteController = require('../controllers/usersRouteController');
const User = require('../models/userModel');
describe('USERS Controller', () => {
    let res;
    let req;
    let user;
    let UserDos;
    let error;

    describe('GET', () => {
        afterEach(() => {
            sinon.restore();
        });

        beforeEach(() => {
            error = false;
            res = {
                status: () => {},
                send: () => {},
                json: () => {}
            };
            req = {
                query: {
                    sub: {}
                },
                body: {}
            };
            UserDos = {
                findOne: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakeFn(callback) {
                    callback(error, user);
                })
            };
        });

        it('should respond with status 200', () => {
            const statusSpy = sinon.spy(res, 'status');
            const controller = usersRouteController(UserDos);
            controller.get(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });

        it('should respond with a json with status 200', () => {
            const jsonSpy = sinon.spy(res, 'json');
            const controller = usersRouteController(UserDos);
            controller.get(req, res);
            expect(jsonSpy.callCount).to.equal(1);
        });

        it('should respond with a status 400 with an error', () => {
            error = true;

            const statusSpy = sinon.spy(res, 'status');
            const controller = usersRouteController(UserDos);
            controller.get(req, res);
            expect(statusSpy.calledWith(400)).to.be.true;
        });
    });

    describe('POST', () => {
        afterEach(() => {
            sinon.restore();
        });

        beforeEach(() => {
            error = false;
            user = 'gfds';
            res = {
                status: () => {},
                json: () => {},
                send: () => {}
            };
            req = {
                body: {}
            };
            UserDos = {
                findOne: (query, callback) => {
                    callback(error, user);
                }
            };
        });

        it('should respond status 200 with an existing user', () => {
            const statusSpy = sinon.spy(res, 'status');
            const controller = usersRouteController(UserDos);
            controller.post(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });

        it('should respond with a json with status 200', () => {
            const jsonSpy = sinon.spy(res, 'json');
            const controller = usersRouteController(UserDos);
            controller.post(req, res);
            expect(jsonSpy.callCount).to.equal(1);
        });

        it('should respond with status 400 with an error', () => {
            error = true;
            const statusSpy = sinon.spy(res, 'status');
            const controller = usersRouteController(UserDos);
            controller.post(req, res);
            expect(statusSpy.calledWith(400)).to.be.true;
        });

        it('should call once error with send if there is an error', () => {
            error = true;
            const sendSpy = sinon.spy(res, 'send');
            const controller = usersRouteController(UserDos);
            controller.post(req, res);
            expect(sendSpy.callCount).to.equal(1);
        });

        it('should send error with when there is an error', () => {
            error = true;
            const sendSpy = sinon.spy(res, 'send');
            const controller = usersRouteController(UserDos);
            controller.post(req, res);
            expect(sendSpy.calledWith(error)).to.be.true;
        });

        it('should save newUser', () => {
            user = false;
            error = false;

            const fakeFindOne = sinon.fake.yields(error, user);
            sinon.replace(User, 'findOne', fakeFindOne);
            const statusSpy = sinon.spy(res, 'status');
            const controller = usersRouteController(User);
            controller.post(req, res);
            expect(statusSpy.calledWith(201)).to.be.true;
        });
    });
});
