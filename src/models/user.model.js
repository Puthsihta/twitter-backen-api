const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, require: false },
  password: { type: String, required: true },
  followers: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  followings: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  tweets: [{ type: mongoose.Types.ObjectId, ref: "tweets" }],
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel, userSchema };
