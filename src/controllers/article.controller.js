const ArticleModel = require("../model").articles;
const UserModel = require("../model").users;

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
  const { pageSize, page, order_by } = req.query;
  pageSize ?? 20;
  page ?? 0;

  const articles = await ArticleModel.findAll({});

  return res.status(200).json({
    type: "success",
    message: "Request successful",
    articles: articles,
  });
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
    const article = await ArticleModel.update(id);

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

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  editArticleById,
  deleteArticleById,
};
