const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const postController = require("./postController");
const postValidation = require("./postValidation");

const Router = express.Router();

Router.post("/addPost", auth, validate(postValidation.addPost), postController.addPost);

Router.get("/getPostList", auth, postController.getPostList);

Router.post("/addComments", auth, validate(postValidation.addComments), postController.addComments);

Router.get("/allCommentsList", auth, postController.allCommentsList);

Router.post("/updateComments", auth, validate(postValidation.updateComments), postController.updateComments);

module.exports = Router;
