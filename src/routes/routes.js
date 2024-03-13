const express = require("express");
const userRouter = require("./user.route");
const tweetRouter = require("./tweet.route");
const authRouter = require("./auth.route");
const { verifyToken } = require("../middlewares/auth.middleware");
const rootRouter = express.Router();

rootRouter.use("/user", verifyToken, userRouter);
rootRouter.use("/tweet", verifyToken, tweetRouter);
rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
