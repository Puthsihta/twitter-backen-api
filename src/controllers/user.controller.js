const model = require("../models/user.model");

const getAllUsers = async (req, res) => {
  const users = await model.userModel.find({}).exec();
  res.json({ data: users });
};

module.exports = getAllUsers;
