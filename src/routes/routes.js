const express = require("express");
const userRouter = require("./user.route");
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);

module.exports = rootRouter;
