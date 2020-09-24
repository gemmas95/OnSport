const mongoose = require('mongoose');

const { Schema } = mongoose;

const sportModel = new Schema({
    id: { type: Number },
    type: { type: String },
    name: { type: String },
    nickname: { type: String },
    image: { type: String },
    centers: [String]
});

module.exports = mongoose.model('sports', sportModel);
