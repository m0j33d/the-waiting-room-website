var passport = require("passport");

const UserModel = require("../model").users;

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");

var config = require("../../config/config");

exports.getToken = function (user) {
  return jwt.sign(user, config.jwtSecret, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, async (jwt_payload, next) => {
    user = await UserModel.findOne({ where: { id: jwt_payload.id } });

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

