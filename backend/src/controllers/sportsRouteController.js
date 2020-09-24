function sportsController(Sport) {
    const get = (req, res) => {
        const query = {};
        if (req && req.query && req.query.name) {
            query.name = req.query.name;
        }
        Sport.find(query, (error, sports) => {
            if (error) {
                res.status(400);
                res.send(error);
            } else if (sports.length === 0) {
                res.status(404);
                res.send(
                    `Name introduced not valid. It doesn't match with any sport`
                );
            } else {
                res.status(200);
                res.json(sports);
            }
        });
    };

    return { get };
}

module.exports = sportsController;
