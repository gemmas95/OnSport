const { filterArray } = require('./helper');
// lo usamos para dd activity to cart
const put = (req, res) => {
    const { user } = req;

    // sacamos la propiedad que le pasamos al req.body desdel front
    const { activityId } = req.body;
    const { activity } = req;

    let error = null;
    const responseValue = {
        activity: null,
        user: null
    };
    if (user && activity) {
        const userPromise = new Promise((resolve, reject) => {
            user.cart = filterArray(user.cart, activityId);

            user.save((errorUserSave) => {
                if (errorUserSave) {
                    error = errorUserSave;
                    reject(errorUserSave);
                } else {
                    responseValue.user = user;
                    resolve(responseValue.user);
                }
            });
        });
        const activityPromise = new Promise((resolve, reject) => {
            // eslint-disable-next-line no-underscore-dangle
            activity.usersSubscribed = filterArray(
                activity.usersSubscribed,
                // eslint-disable-next-line no-underscore-dangle
                user._id
            );
            activity.save((errorActivitySave) => {
                if (errorActivitySave) {
                    error = errorActivitySave;
                    reject(errorActivitySave);
                } else {
                    responseValue.activity = activity;
                    resolve(responseValue.activity);
                }
            });
        });

        Promise.all([userPromise, activityPromise])
            .then(() => {
                res.status(200);
                res.json(responseValue);
            })
            .catch(() => {
                res.status(404);
                res.send(error);
            });
    } else {
        res.status(404);
        res.send('This user does not exist');
    }
};

module.exports = { put };
