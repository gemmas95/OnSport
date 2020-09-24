/* eslint-disable lines-between-class-members */
/* eslint-disable no-shadow */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { expect } = require('chai');
// eslint-disable-next-line no-unused-vars
const { describe, afterEach } = require('mocha');
const centersRouteController = require('../controllers/centersRouteController');

describe('Centers Controller', () => {
    afterEach(() => {
        sinon.restore();
    });
    let centers;
    describe('GET', () => {
        it('should respond wihout an error with status 200', () => {
            // FORMA ANNA ENTRAR DINS POPULATE
            const error = false;
            const Center = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, centers);
                })
            };
            const res = {
                status: () => {},
                send: () => {},
                json: () => {}
            };
            const req = {
                query: {
                    id: 1
                }
            };
            const statusSpy = sinon.spy(res, 'status');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });

        it('should respond with status 200 when there is no error', () => {
            const error = false;
            const Center = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, centers);
                })
            };
            const res = {
                status: () => {},
                send: () => {},
                json: () => {}
            };
            const req = {
                query: {
                    id: 1
                }
            };

            const jsonSpy = sinon.spy(res, 'json');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(jsonSpy.calledWith(centers)).to.be.true;
        });
        it('should respond with status 400 when there is an error', () => {
            const error = true;
            const Center = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, centers);
                })
            };
            const res = {
                status: () => {},
                send: () => {},
                json: () => {}
            };
            const req = {
                query: {
                    id: 1
                }
            };

            const statusSpy = sinon.spy(res, 'status');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(statusSpy.calledWith(400)).to.be.true;
        });
        it('should respond with status 400 when there is an error', () => {
            const error = true;
            const Center = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, centers);
                })
            };
            const res = {
                status: () => {},
                send: () => {},
                json: () => {}
            };
            const req = {
                query: {
                    id: 1
                }
            };

            const sendSpy = sinon.spy(res, 'send');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(sendSpy.calledWith(error)).to.be.true;
        });

        /* xit('should respond wihout an error with status 200', () => {
            const Center = {
                find: () => {}
            };
            const res = {
                status: () => {},
                send: () => {},
                json: () => {}
            };
            const req = {
                query: {
                    id: 1
                }
            };

            const centers = [{ name: 'Center' }];

            const findFake = sinon.fake.yields(false, (false, centers));

            sinon.replace(Center, 'find', findFake);

            const statusSpy = sinon.spy(res, 'status');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });
        xit('should call json with centers without an error', () => {
            const res = {
                json: () => {},
                status: () => {},
                send: () => {}
            };
            const req = {
                query: {
                    id: 1
                }
            };
            const centers = [{ name: 'pepe' }];
            const Center = {
                find: (query, callback) => {
                    callback(false, centers);
                }
            };
            const jsonSpy = sinon.spy(res, 'json');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(jsonSpy.callCount).to.equal(1);
        });
        xit('should respond with an error status 400', () => {
            const res = {
                status: () => {},
                send: () => {}
            };
            const req = {};
            const Center = {
                find: (query, callback) => {
                    const error = 'errror';
                    callback(error);
                }
            };
            const statusSpy = sinon.spy(res, 'status');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(statusSpy.calledWith(400)).to.be.true;
        });
        xit('should send error with an error', () => {
            const res = {
                status: () => {},
                send: () => {}
            };
            const req = {};
            const Center = {
                find: (query, callback) => {
                    const error = 'errror';
                    callback(error);
                }
            };
            const sendSpy = sinon.spy(res, 'send');

            const controller = centersRouteController(Center);
            controller.get(req, res);
            expect(sendSpy.calledWith('errror')).to.be.true;
        }); */
    });

    describe('POST', () => {
        let req;
        let res;
        let Center;
        let error;
        let center;

        afterEach(() => {
            sinon.restore();
        });
        beforeEach(() => {
            req = {};
            res = {
                json: () => {},
                send: () => {},
                status: () => {}
            };
            error = false;
            center = true;
            Center = {
                findOne: (query, callback) => {
                    callback(error, center);
                }
            };
        });

        it('should respond with status 200 when theere is no error', () => {
            const jsonSpy = sinon.spy(res, 'json');
            const controller = centersRouteController(Center);
            controller.post(req, res);
            expect(jsonSpy.calledWith(center)).to.be.true;
        });

        it('should status 200 when there is no error', () => {
            const statusSpy = sinon.spy(res, 'status');
            const controller = centersRouteController(Center);
            controller.post(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });

        it('should respond with status 400 with an error', () => {
            error = true;
            center = false;
            const statusSpy = sinon.spy(res, 'status');
            const controller = centersRouteController(Center);
            controller.post(req, res);
            expect(statusSpy.calledWith(400)).to.be.true;
        });
        it('should send an error with an error', () => {
            error = true;
            center = false;
            const sendSpy = sinon.spy(res, 'send');
            const controller = centersRouteController(Center);
            controller.post(req, res);
            expect(sendSpy.calledWith(error)).to.be.true;
        });
        it('should send status 201 when it is all ok', () => {
            // FORMA ANNA DE ENTRAR DINS MODEL
            error = false;
            center = false;

            class Model {
                constructor() {}
                // eslint-disable-next-line lines-between-class-members
                static findOne(query, callback) {
                    callback(error, center);
                }
                // eslint-disable-next-line class-methods-use-this
                save() {}
            }

            const statusSpy = sinon.spy(res, 'status');
            const controller = centersRouteController(Model);
            controller.post(req, res);
            expect(statusSpy.calledWith(201)).to.be.true;
        });
    });
});
