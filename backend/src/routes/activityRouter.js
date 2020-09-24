const express = require('express');

const activitiesRouteController = require('../controllers/activitiesRouteController');
const activityRouteController = require('../controllers/activityRouteController');

const activityRouter = express.Router();

function routes(Activity, Center) {
    const controllerActivitiesList = activitiesRouteController(
        Activity,
        Center
    );
    activityRouter
        .route('/')
        .get(controllerActivitiesList.get)
        .post(controllerActivitiesList.post);

    activityRouter.use('/:activityId', (req, res, next) => {
        Activity.findById(req.params.activityId, (error, activity) => {
            if (error) {
                res.send(error);
            }
            if (activity) {
                // Aqui es user??
                req.activity = activity;
                next();
            }
        });
    });
    activityRouter
        .route('/:activityId')
        .get(activityRouteController.get)
        .delete(activityRouteController.deleter)
        .put(activityRouteController.put);
    return activityRouter;
}

module.exports = routes;
