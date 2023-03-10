import express from 'express';
import * as authenticate from '../middleware/authenticate.js'
import * as authorize from '../middleware/authorize.js'

const router = express.Router();


import {
  createArticle,
  getAllArticles,
  getArticleById,
  editArticleById,
  deleteArticleById,
} from "../controllers/article.controller.js"

import { validateArticle, validateEditArticle, validate } from "../middleware/article.validation.js"


router
  .route('/')
  .post(authenticate.verifyUser, validateArticle(), validate, createArticle)
  .get(getAllArticles)

router 
  .route('/:id')
  .get(getArticleById)
  .put(authenticate.verifyUser, authorize.isArticleCreator, validateEditArticle(), validate, editArticleById)
  .delete(authenticate.verifyUser, authorize.isArticleCreator, deleteArticleById)
  

export { router };
