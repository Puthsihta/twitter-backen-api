const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const { SECRET } = require("../secret");
const { userModel } = require("../models/user.model");

const verifyToken = asyncHandler(async (req, res, next) => {
  //Check token
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access Denied!" });
  }
  token = token.replace("Bearer ", "");
  const decoded = jwt.verify(token, SECRET);
  req.user = decoded;
  next();
});

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
opts.issuer = "api.tfdevs.com";
opts.audience = "wwww.tfdevs.com";
const jwtStrategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  const user = await userModel.findById(jwt_payload.id);
  if (!user) {
    done(null, false);
  }
  done(null, user);
});

const googleStrategy = new GoogleStrategy(
  {
    clientID: "lsjflkksjf",
    clientSecret: SECRET,
    callbackURL: "http://localhost:3000/api/auth/google",
  },
  async function (accessToken, refreshToken, profile, cb) {
    const user = await userModel.findOne({ email: profile.emails[0].value });
    if (!user) {
      //Create new user
      const username = profile.displayName.replace(" ", "");
      const newUser = new userModel({
        username: username,
        email: profile.emails[0].value,
        password: SECRET,
      });
      await newUser.save();
    }
    cb(null, user);
  }
);

module.exports = { verifyToken, jwtStrategy, googleStrategy };
