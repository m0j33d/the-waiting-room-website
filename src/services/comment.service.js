const CommentModel = require("../model").comments;


const getAllCommentsForArticle = async (article_id, pageSize = 15 , page = 0 ) => {
  try {
    const limit = parseInt(pageSize)
    const offset = parseInt(page * pageSize)

    const comments = await CommentModel.findAll({
      where: { article_id : article_id },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    return comments
  } catch (error) {
    return error.message
  }
};

const getComment = async (comment_id) => {
  try {
    const comment = await CommentModel.findOne({ where: { id: comment_id } });
    if (!comment) {
      return res.status(404).json({
        type: "error",
        message: "Comment not found!",
      });
    }
    return comment

  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: error.message,
    });
  }
};



module.exports = {
  getAllCommentsForArticle,
  getComment,
};
