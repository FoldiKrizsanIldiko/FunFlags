const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Email = require("mongoose-type-email");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: Email,
  },
  address: {
    type: String,
  },
  points: Number,
});

const UserSchema = model("Users", userSchema);
module.exports = UserSchema;
