const express = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", updateUserById);

module.exports = userRouter;
