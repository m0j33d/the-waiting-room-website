const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const {
  createArticle,
  getAllArticles,
  getArticleById,
  editArticleById,
  deleteArticleById,
} = require("../controllers/article.controller")
const { validateArticle, validate } = require("../middleware/article.validation")


router
  .route('/')
  .post(authenticate.verifyUser, validateArticle(), validate, createArticle)
  .get(getAllArticles)

router 
  .route('/:id')
  .get(getArticleById)
  .put(authenticate.verifyUser, authorize.isArticleCreator, editArticleById)
  .delete(authenticate.verifyUser, authorize.isArticleCreator, deleteArticleById)
  

module.exports = router;
