const mongoose = require("mongoose");
const { Schema } = mongoose;

const sportModel = new Schema({
  id: { type: Number },
  type: { type: String },
  name: { type: String },
  nickname: { type: String },
  image: { type: String },
  centers: [
    {
      logo: { type: String },
      name: { type: String },
      email: { type: String },
      phone: { type: Number },
      description: { type: String },
      activities: [
        {
          description: { type: String },
          dates: [String],
          price: { type: Number },
          requisits: { type: String },
          ageRange: { type: String },
          aptToPhisicalDisability: { type: Boolean },
          ubication: { type: String },
          duration: { type: Number },
          image: { type: String },
          depth: { type: Number },
          difficulty: { type: String },
          type: { type: String },
          startPoint: { type: String },
          speciesInArea: [String],
          usersSubscribed: [String],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("sports", sportModel);
