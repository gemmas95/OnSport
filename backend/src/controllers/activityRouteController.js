const deleter = (req, res) => {
    const { activity } = req;
    if (activity) {
        activity.remove((error) => {
            if (error) {
                res.send(error);
            }
            res.json(activity);
        });
        res.status(200);
    } else {
        res.send('This activity does not exist');
        res.status(404);
    }
};

const put = (req, res) => {
    const { activity } = req;
    if (activity) {
        activity.name = req.body.name;
        activity.description = req.body.description;
        activity.dates = req.body.dates;
        activity.price = req.body.price;
        activity.save((error) => {
            if (error) {
                res.send(error);
            }
            res.json(activity);
        });
        res.status(200);
    } else {
        res.status(404);
    }
};

const get = (req, res) => {
    res.json(req.activity);
};

module.exports = { deleter, put, get };
