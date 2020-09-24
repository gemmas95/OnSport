const mongoose = require('mongoose');

const { Schema } = mongoose;

const activityModel = new Schema({
    name: { type: String },
    description: { type: String },
    // Dates in string or date?
    dates: { type: String },
    id: { type: Number },
    price: { type: Number },
    requisits: { type: String },
    /*     ageRange: { type: String },
    aptToPhisicalDisability: { type: Boolean }, 
    ubication: { type: String }, */
    duration: { type: Number },
    images_collection: [String],
    depth: { type: Number },
    difficulty: { type: String },
    type: { type: String },
    startPoint: { type: String },
    speciesInArea: { type: String },
    usersSubscribed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
});

module.exports = mongoose.model('activities', activityModel);
