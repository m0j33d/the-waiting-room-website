const CommentModel = require("../model").comments;
const { getComment } = require("../services/comment.service")


const createComment = async (req, res) => {
  const data = req.body;
  data.user_id = req.user.id;
  try {
    const coment = await CommentModel.create(data);

    return res.status(201).json({
      type: "success",
      message: "Comment created successfully!",
      coment: coment,
    });
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: error.message,
    });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await getComment(req.params.id);
    if(!comment) {
      return res.status(404).json({
        type: "error",
        message: "Comment not found!",
      });
    }

    return res.status(200).json({
      type: "success",
      message: "Request successful",
      comment: comment,
    });

  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

const editCommentById = async (req, res) => {
  const update = req.body;
  try {
    const coment = await getComment(req.params.id);

    if (coment) {
      coment.update(update);
      return res.status(200).json({
        type: "success",
        message: "Comment updated successfully",
        coment: coment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const id = req.params.id;

    await CommentModel.destroy({
      where: {
        id: id,
      },
      force: true,
    });

    return res.status(204).json({
      type: "success",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getCommentById,
  editCommentById,
  deleteCommentById,
};
