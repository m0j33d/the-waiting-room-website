import express from "express"
const router = express.Router();

import  { createUser, loginUser } from "../controllers/user.controller.js"
import { validateSignUp, validateLogin, validate } from "../middleware/auth.validation.js"

router
  .route('/signup')
  .post(validateSignUp(), validate, createUser)

router 
  .route('/login')
  .post(validateLogin(), validate, loginUser)


export { router };
