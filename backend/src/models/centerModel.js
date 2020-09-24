const mongoose = require('mongoose');

const { Schema } = mongoose;

const centerModel = new Schema({
    name: { type: String, required: true },
    logo: { type: String },
    sport: { type: String },
    id: { type: Number },
    email: { type: String },
    phone: { type: Number },
    city: { type: String, required: true },
    street: { type: String },
    postal_code: { type: String },
    sub: { type: String },
    description: { type: String, required: true },
    opiniones: [String],
    // A ref hem de ficar el nom de la colecció a la qual haurà de buscar els ObjectId
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'activities' }]
});

module.exports = mongoose.model('centers', centerModel);
