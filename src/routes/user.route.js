const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
} = require("../controllers/user.controller");
const { userMiddleWare } = require("../middlewares/user.middleware");
const {
  creatUserValidation,
  updateUserValidation,
} = require("../validations/user.validation");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", creatUserValidation, userMiddleWare, createUser);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", updateUserById);

module.exports = userRouter;
