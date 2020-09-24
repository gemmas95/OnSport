const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    lastname: { type: String, required: true },
    image: { type: String },
    /* description: { type: String },
     password: { type: String },
    birth: { type: String },
    healthProblems: { type: String }, */
    phone: { type: Number },
    usergender: { type: String },
    sub: { type: String, required: true },
    userAdmin: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'activities' }]
});

module.exports = mongoose.model('users', userModel);
