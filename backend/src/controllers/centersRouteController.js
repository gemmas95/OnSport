function centersController(Center) {
    const get = (req, res) => {
        const query = {};
        if (req && req.query && req.query.id) {
            // id in json and model it's defined as a number, but the query is a string, so me force it to be a number here
            query.id = +req.query.id;
        }
        Center.find(query)
            // Li hem de indicar al populate la propietat de la colecció a popular com a 1r argument
            // El 2n argument seria quines propietats de la colecció que portarás t'interesa que et porti
            .populate({
                path: 'activities',
                populate: {
                    path: 'usersSubscribed',
                    model: 'users'
                }
            })
            .exec((error, centers) => {
                if (error) {
                    res.status(400);
                    res.send(error);
                } else {
                    res.status(200);
                    res.json(centers);
                }
            });
    };
    const post = (req, res) => {
        Center.findOne(req.body, (error, center) => {
            if (error) {
                res.status(400);
                res.send(error);
            } else if (center) {
                res.status(200);
                res.json(center);
            } else {
                const newCenter = new Center(req.body);
                newCenter.save();
                res.status(201);
                res.json(newCenter);
            }
        });
    };

    return { get, post };
}

module.exports = centersController;
