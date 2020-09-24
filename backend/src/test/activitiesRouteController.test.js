/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const activitiesRouteController = require('../controllers/activitiesRouteController');
const Activity = require('../models/activityModel');
const Center = require('../models/centerModel');

describe('ACTIVITIES Controller', () => {
    let res;
    let req;
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
                    id: {}
                },
                body: {}
            };
        });

        it('should respond with status 200', () => {
            let activities;
            const ActivityDos = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, activities);
                })
            };

            const statusSpy = sinon.spy(res, 'status');
            const controller = activitiesRouteController(ActivityDos, Center);
            controller.get(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });

        it('should respond with a json with status 200', () => {
            let activities;
            const ActivityDos = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, activities);
                })
            };

            const jsonSpy = sinon.spy(res, 'status');
            const controller = activitiesRouteController(ActivityDos, Center);
            controller.get(req, res);
            expect(jsonSpy.callCount).to.equal(1);
        });

        it('should respond with a status 400 with an error', () => {
            error = true;
            let activities;
            const ActivityDos = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, activities);
                })
            };

            const statusSpy = sinon.spy(res, 'status');
            const controller = activitiesRouteController(ActivityDos, Center);
            controller.get(req, res);
            expect(statusSpy.calledWith(400)).to.be.true;
        });

        it('should respons with send message of error with an error', () => {
            error = true;
            let activities;
            const ActivityDos = {
                find: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().callsFake(function fakefn(callback) {
                    callback(error, activities);
                })
            };
            const sendSpy = sinon.spy(res, 'send');
            const controller = activitiesRouteController(ActivityDos, Center);
            controller.get(req, res);
            expect(sendSpy.calledWith(error)).to.be.true;
        });
    });

    describe('POST', () => {
        afterEach(() => {
            sinon.restore();
        });

        beforeEach(() => {
            error = true;
            res = {
                status: () => {},
                send: () => {},
                json: () => {}
            };
            req = {
                query: {
                    id: {}
                },
                body: {}
            };
        });

        it('should return status 404 with an error', (done) => {
            // FORMA GERARD ENTRAR DINS PROTO AMB AWAIT DE UNA FN I CONTRUCTOR
            req.body = {
                something: '',
                save: () => {}
            };

            sinon.stub(Activity.prototype, 'save');
            const fakeFindById = sinon.fake.yields(true, false);
            sinon.replace(Center, 'findById', fakeFindById);

            const statusSpy = sinon.spy(res, 'status');

            const controller = activitiesRouteController(Activity, Center);
            controller.post(req, res);
            done();
            expect(statusSpy.calledWith(404)).to.be.true;
        });

        it('should return a json when all', (done) => {
            req.body = {};

            const centerDos = {
                activities: {
                    push: () => {}
                }
            };

            sinon
                .stub(Activity.prototype, 'save')
                .returns({ _id: 'asd54as65d' });
            const fakeFindById = sinon.fake.yields(false, centerDos);
            sinon.replace(Center, 'findById', fakeFindById);

            const jsonSpy = sinon.spy(res, 'json');

            const controller = activitiesRouteController(Activity, Center);
            controller.post(req, res);
            done();
            expect(jsonSpy.calledWith(centerDos)).to.be.true;
        });
    });
});
