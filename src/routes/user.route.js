const express = require("express");
const getAllUsers = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);

module.exports = userRouter;
