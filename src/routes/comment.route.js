import express from 'express';
import * as authenticate from '../middleware/authenticate.js'
import * as authorize from '../middleware/authorize.js'


const router = express.Router();
import {
  createComment,
  getCommentById,
  editCommentById,
  deleteCommentById,
} from "../controllers/comment.controller.js"
import { validateComment, validate } from "../middleware/comment.validation.js"


router
  .route('/')
  .post(authenticate.verifyUser, validateComment(), validate, createComment)

router 
  .route('/:id')
  .get(getCommentById)
  .put(authenticate.verifyUser, authorize.isCommentCreator, editCommentById)
  .delete(authenticate.verifyUser, authorize.isCommentCreator, deleteCommentById)
  

export{ router };
