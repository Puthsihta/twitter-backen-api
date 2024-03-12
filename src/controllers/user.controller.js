const asyncHandler = require("express-async-handler");
const { userModel } = require("../models/user.model");

const getAllUsers = async (req, res) => {
  const users = await userModel.find({}).exec();
  res.json({ message: true, data: { data: users } });
};
const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id).exec();
  res.json({ message: true, data: { data: user } });
};
const createUser = asyncHandler(async (req, res) => {
  const newUser = new userModel(req.body);
  const result = await newUser.save();
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
