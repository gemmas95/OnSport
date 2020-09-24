function usersContoller(User) {
    const get = (req, res) => {
        const query = {};

        if (req && req.query && req.query.sub) {
            query.sub = req.query.sub;
        }
        /*   if (req.query.name) {
            query.name = req.query.name;
        } */

        User.findOne(query)
            .populate('cart')
            .exec((error, user) => {
                if (error) {
                    res.status(400);
                    res.send(error);
                } else {
                    res.status(200);
                    res.json(user);
                }
            });
    };

    const post = (req, res) => {
        User.findOne(req.body, (error, user) => {
            if (error) {
                res.status(400);
                res.send(error);
            } else if (user) {
                res.status(200);
                res.json(user);
            } else {
                const newUser = new User(req.body);
                newUser.save();
                res.status(201);
                res.json(newUser);
            }
        });
    };

    return { get, post };
}

module.exports = usersContoller;
