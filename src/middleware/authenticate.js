import passport from 'passport';
import {db} from "../model/index.js"
import { Strategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

import * as config from '../../config/config.js'

const UserModel = db.users;


const getToken =  (user) => {
  return jwt.sign(user, config.jwtSecret, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;

const jwtPassport = passport.use(
  new Strategy(opts, async (jwt_payload, next) => {
    const user = await UserModel.findOne({ where: { id: jwt_payload.id } });

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  })
);

const verifyUser = passport.authenticate("jwt", { session: false });

export {
  getToken,
  jwtPassport,
  verifyUser
}
