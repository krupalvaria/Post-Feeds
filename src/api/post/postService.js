const httpStatus = require("http-status");
const { Post } = require("../../models/index");
const ErrorHandler = require("../../utils/ErrorHandler");
const Messages = require("../../utils/messages");
const CommentModel = require("../../models/comment.model");

const addPost = async (id, body) => {
  const { postTitle, postDescription } = body;
  const findPost = await Post.findOne({ postTitle });
  if (findPost) {
    throw new ErrorHandler(httpStatus.UNPROCESSABLE_ENTITY, Messages.ALREDY_EXIST_POST);
  } else {
    const create = {
      userPostId: id,
      postTitle,
      postDescription
    };
    return await Post.create(create);
  }
};

const getPostList = async () => await Post.aggregate([
  { $sort: { _id: -1 } }
]);

const addComments = async (id, query, body) => { 
  return await CommentModel.create({
  userPostId: query._id,
  userCommentorId: id,
  comment: body.comment
})
}

const allCommentsList = async () => await CommentModel.aggregate([
  { $sort: { createdAt: -1 } }
]);

const updateComments = async (id, query, body) => {
  const post = await CommentModel.findByIdAndUpdate(query._id, { replies: { $push: { userCommentorId: id, comment: body.comment } } }, { new: true });
  return post;
};

module.exports = {
  addPost,
  getPostList,
  addComments,
  allCommentsList,
  updateComments
};
