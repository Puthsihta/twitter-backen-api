const express = require("express");
const passport = require("passport");
const userRouter = require("./user.route");
const tweetRouter = require("./tweet.route");
const authRouter = require("./auth.route");
const { verifyToken, jwtStrategy } = require("../middlewares/auth.middleware");
const rootRouter = express.Router();
passport.use(jwtStrategy);

rootRouter.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
rootRouter.use(
  "/tweet",
  passport.authenticate("jwt", { session: false }),
  tweetRouter
);
rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
