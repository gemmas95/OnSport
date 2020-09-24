const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// Configuration of bodyParser middleware to add in req.body data

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/onsport');

// Configuration models

const Sport = require('./src/models/sportModel');
const Center = require('./src/models/centerModel');
const Activity = require('./src/models/activityModel');
const User = require('./src/models/userModel');

// Routes configuration passing an argument of the related model
const sportRouter = require('./src/routes/sportRouter')(Sport);

app.use('/api/sports', sportRouter);

const centerRouter = require('./src/routes/centerRouter')(Center);

app.use('/api/centers', centerRouter);

// Le pasamos como parametro el modelo en el cual trabajaremos o modificaremos, aqui trabajamos con activity y al crear una actividad nos interesa el centro que lo crea
const activityRouter = require('./src/routes/activityRouter')(Activity, Center);

app.use('/api/activities', activityRouter);

const authRoutes = require('./src/routes/userRouter')(User, Activity);

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    debug(`Server listening on port ${chalk.magenta(port)}`);
});
