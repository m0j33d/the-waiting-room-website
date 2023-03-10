import {db} from "../model/index.js"


const ArticleModel = db.articles;

import {getAllCommentsForArticle} from "../services/comment.service.js"


const createArticle = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user.id;
  try {
    const article = await ArticleModel.create(data);

    return res.status(201).json({
      type: "success",
      message: "Article created successfully!",
      article: article,
    });
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: error.message,
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    let { pageSize, page, order_by } = req.query;

    const limit = parseInt(pageSize) || 15;
    const offset = parseInt(page * pageSize) || 0;
    order_by = order_by || "createdAt";

    const articles = await ArticleModel.findAll({
      limit: limit,
      offset: offset,
      order: [[order_by, "DESC"]],
    });

    return res.status(200).json({
      type: "success",
      message: "Request successful",
      articles: articles,
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

const getArticleById = async (req, res) => {
  const articleID = req.params.id;
  try {
    const article = await ArticleModel.findOne({ where: { id: articleID } });
    if (!article) {
      return res.status(404).json({
        type: "error",
        message: "Article not found!",
      });
    }

    return res.status(200).json({
      type: "success",
      message: "Request successful",
      article: article,
      comments: await getAllCommentsForArticle(articleID)
    });
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: error.message,
    });
  }
};

const editArticleById = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    const article = await ArticleModel.findOne({where: {id : id}});

    if (article) {
      article.update(update);
      return res.status(200).json({
        type: "success",
        message: "Article updated successfully",
        article: article,
      });
    }
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    const id = req.params.id;

    await ArticleModel.destroy({
      where: {
        id: id,
      },
      force: true,
    });

    return res.status(204).json({
      type: "success",
      message: "Article deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

export {
  createArticle,
  getAllArticles,
  getArticleById,
  editArticleById,
  deleteArticleById,
};
