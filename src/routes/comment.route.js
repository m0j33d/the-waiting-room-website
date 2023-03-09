const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const {
  createComment,
  getCommentById,
  editCommentById,
  deleteCommentById,
} = require("../controllers/comment.controller")
const { validateComment, validate } = require("../middleware/comment.validation")


router
  .route('/')
  .post(authenticate.verifyUser, validateComment(), validate, createComment)

router 
  .route('/:id')
  .get(getCommentById)
  .put(authenticate.verifyUser, authorize.isCommentCreator, editCommentById)
  .delete(authenticate.verifyUser, authorize.isCommentCreator, deleteCommentById)
  

module.exports = router;
