const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
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
  .put(authenticate.verifyUser, authenticate.isCreator, editArticleById)
  .delete(authenticate.verifyUser, authenticate.isCreator, deleteArticleById)
  

module.exports = router;
