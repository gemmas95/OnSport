/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const sportsRouteController = require('../controllers/sportsRouteController');

describe('SPORTS Controller', () => {
    describe('GET', () => {
        let req;
        let res;
        let error;
        let sports;
        let Sport;
        beforeEach(() => {
            error = false;
            sports = false;
            res = {
                send: () => {},
                status: () => {},
                json: () => {}
            };
            req = {
                activity: {
                    remove: (callback) => {
                        callback(true);
                    }
                },
                query: {
                    name: {}
                }
            };
            Sport = {
                find: (query, callback) => {
                    callback(error, sports);
                }
            };
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should send an error if there is not an sport', () => {
            error = true;

            const sendSpy = sinon.spy(res, 'send');
            const controller = sportsRouteController(Sport);
            controller.get(req, res);
            expect(sendSpy.calledWith(error)).to.be.true;
        });

        it('should status 400 if there is not an sport', () => {
            error = true;

            const statusSpy = sinon.spy(res, 'status');
            const controller = sportsRouteController(Sport);
            controller.get(req, res);
            expect(statusSpy.calledWith(400)).to.be.true;
        });

        it('should status 400 if there is not an sport', () => {
            error = false;
            sports = '';

            const statusSpy = sinon.spy(res, 'status');
            const controller = sportsRouteController(Sport);
            controller.get(req, res);
            expect(statusSpy.calledWith(404)).to.be.true;
        });

        it('should send message when sports length is 0', () => {
            error = false;
            sports = '';

            const sendSpy = sinon.spy(res, 'send');
            const controller = sportsRouteController(Sport);
            controller.get(req, res);
            expect(
                sendSpy.calledWith(
                    `Name introduced not valid. It doesn't match with any sport`
                )
            ).to.be.true;
        });

        it('should status 200 when everything is ok', () => {
            error = false;
            sports = false;

            const statusSpy = sinon.spy(res, 'status');
            const controller = sportsRouteController(Sport);
            controller.get(req, res);
            expect(statusSpy.calledWith(200)).to.be.true;
        });
        it('should respons json with sports', () => {
            error = false;
            sports = false;

            const jsonSpy = sinon.spy(res, 'json');
            const controller = sportsRouteController(Sport);
            controller.get(req, res);
            expect(jsonSpy.calledWith(sports)).to.be.true;
        });
    });
});
