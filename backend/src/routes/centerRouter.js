const express = require('express');

const centersRouteController = require('../controllers/centersRouteController');

const centerRouter = express.Router();

function routes(Center) {
    const controllerCentersList = centersRouteController(Center);
    centerRouter
        .route('/')
        .get(controllerCentersList.get)
        .post(controllerCentersList.post);
    /*     Center.findOne({_id: req.params.id})
    .populate('activities') // <- use the populate() function
    .exec(function(err, person) {
        return 
    });
    ); 
    Faltaria treure el parentesis darerra el get
    */

    return centerRouter;
}

module.exports = routes;
