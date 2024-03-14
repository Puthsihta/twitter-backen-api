const asyncHandler = require("express-async-handler");
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../secret");

const getAllUsers = async (req, res) => {
  const users = await userModel.find({}).exec();
  res.json({ message: true, data: { data: users } });
};
const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id).exec();
  res.json({ message: true, data: { data: user } });
};
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    username: username,
    email: email,
    password: hashedPassword,
  });
  const result = await newUser.save();
  result.password = "";
  res.json({ message: true, data: { data: result } });
});
const deleteUserById = async (req, res) => {
  const result = await userModel.deleteOne({ _id: req.params.id });
  res.json({
    message: true,
    data: {
      data: "User deleted successfully",
    },
  });
};
const updateUserById = asyncHandler(async (req, res) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json({
    message: true,
    data: {
      data: updatedUser,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });
  //Compare password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Password or email incorrect!" });
  }
  //Return JWT to client
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    SECRET,
    {
      issuer: "api.tfdevs.com",
      audience: "wwww.tfdevs.com",
    }
  );
  return res.status(200).json({ token });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  loginUser,
};
