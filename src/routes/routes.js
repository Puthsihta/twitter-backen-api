const express = require("express");
const userRouter = require("./user.route");
const tweetRouter = require("./tweet.route");
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/tweet", tweetRouter);

module.exports = rootRouter;
