const express = require('express');
const router = express.Router();

const { createUser, loginUser } = require("../controllers/user.controller.js")
const { validateSignUp, validateLogin, validate } = require("../middleware/auth.validation")

router
  .route('/signup')
  .post(validateSignUp(), validate, createUser)

router 
  .route('/login')
  .post(validateLogin(), validate, loginUser)


module.exports = router;
