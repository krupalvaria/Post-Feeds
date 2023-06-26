const httpStatus = require("http-status");
const { handleError } = require("../../middlewares/error");
const Messages = require("../../utils/messages");
const createResponse = require("../../utils/response");
const postService = require("./postService");

const addPost = async (req, res) => {
  try {
    const post = await postService.addPost(req.admin._id, req.body);
    createResponse(res, httpStatus.OK, Messages.ADD_POST, post);
  } catch (error) {
    handleError(error, res);
  }
};

const getPostList = async (req, res) => {
  try {
    const users = await postService.getPostList();
    createResponse(res, httpStatus.OK, Messages.GET_POST_LISTS, users);
  } catch (error) {
    handleError(error, res);
  }
};

const addComments = async (req, res) => {
  try {
    const users = await postService.addComments(
      req.admin._id,
      req.query,
      req.body
    );
    createResponse(res, httpStatus.OK, Messages.ADD_COMMENTS, users);
  } catch (error) {
    handleError(error, res);
  }
};

const allCommentsList = async (req, res) => {
  try {
    const users = await postService.allCommentsList();
    createResponse(res, httpStatus.OK, Messages.ALLCOMMENTSLIST, users);
  } catch (error) {
    handleError(error, res);
  }
};

const updateComments = async (req, res) => {
  try {
    const users = await postService.updateComments(req.admin._id, req.query, req.body);
    createResponse(res, httpStatus.OK, Messages.ALLCOMMENTSLIST, users);
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  addPost,
  getPostList,
  addComments,
  allCommentsList,
  updateComments
};
