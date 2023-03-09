const CommentModel = require("../model").comments;
const UserModel = require("../model").users;
const ArticleModel = require("../model").articles;

exports.isArticleCreator = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);

    if (!article) {
      return res.status(422).json({
        type: "error",
        message: "Article does not exist",
      });
    }

    if (article.owner_id == req.user.id) {
      next();
    } else {
      return res.status(403).json({
        type: "error",
        message: "Only creator of this article can perform this action",
      });
    }
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: error.message,
    });
  }
};

exports.isCommentCreator = async (req, res, next) => {
  try {
    const comment = await CommentModel.findByPk(req.params.id);

    if (!comment) {
      return res.status(422).json({
        type: "error",
        message: "Comment does not exist",
      });
    }

    if (comment.user_id == req.user.id) {
      next();
    } else {
      return res.status(403).json({
        type: "error",
        message: "Only creator of comment can perform this action",
      });
    }
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: error.message,
    });
  }
};
