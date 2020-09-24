const express = require('express');

const usersRouteController = require('../controllers/usersRouteController');
const userRouteController = require('../controllers/userRouteController');

const userRouter = express.Router();

function routes(User, Activity) {
    userRouter
        .route('/')
        .post(usersRouteController(User).post)
        .get(usersRouteController(User).get);

    userRouter.use('/:userId', (req, res, next) => {
        User.findById(req.params.userId, (error, user) => {
            if (error) {
                res.send(error);
                res.status(404);
            } else {
                res.status(201);
                req.user = user;
                next();
            }
        });
    });
    userRouter.use('/:userId', (req, res, next) => {
        Activity.findById(req.body.activityId, (error, activity) => {
            if (error) {
                res.send(error);
                res.status(404);
            } else {
                res.status(201);
                req.activity = activity;
                next();
            }
        });
    });

    userRouter.route('/:userId').put(userRouteController.put);

    return userRouter;
}

module.exports = routes;
