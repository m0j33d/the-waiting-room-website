import {db} from "../model/index.js"

const CommentModel = db.comments;


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
      return {
        type: "error",
        message: "Comment not found!",
      }
    }
    return comment

  } catch (error) {
    return {
      type: "error",
      message: error.message,
    };
  }
};



export {
  getAllCommentsForArticle,
  getComment,
};
