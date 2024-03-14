const { userModel } = require("../models/user.model");
const { SECRET } = require("../secret");

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

module.exports = { jwtStrategy };
