/* eslint-disable no-debugger */
function activitiesController(Activity, Center) {
    const get = (req, res) => {
        const query = {};
        if (req && req.query && req.query.id) {
            // id in json and model it's defined as a number, but the query is a string, so me force it to be a number here
            query.id = +req.query.id;
        }
        Activity.find(query)
            .populate('usersSubscribed')
            .exec((error, activities) => {
                if (error) {
                    res.status(400);
                    res.send(error);
                } else {
                    res.status(200);
                    res.json(activities);
                }
            });
    };
    // Como usamos el populate, hacemoso una async function para poder hacer el push del ObjectId, pasa esperar el Id de la nueva tienda
    async function post(req, res) {
        const newActivity = new Activity(req.body);

        const savedActivity = await newActivity.save();

        // Encontramos el centro por la variable única que le hemos pasado como parametro en el req.body
        Center.findById(req.body.centerId, (err, center) => {
            if (err) {
                res.status(404);
                res.send(err);
            }
            if (center) {
                // Hacemos un push del Id de la nueva actividad al centro encontrado en la propiedad activities

                // eslint-disable-next-line no-underscore-dangle
                center.activities.push(savedActivity._id);

                res.json(center);
                center.save();
            }
        });
    }

    return { get, post };
}

module.exports = activitiesController;
