const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");
const {
  creatUserValidation,
  loginUserValidator,
} = require("../validations/user.validation");
const { userMiddleWare } = require("../middlewares/user.middleware");

const authRouter = express.Router();

authRouter.post("/register", creatUserValidation, userMiddleWare, createUser);
authRouter.post("/login", loginUserValidator, userMiddleWare, loginUser);

module.exports = authRouter;
