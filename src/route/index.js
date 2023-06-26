const express = require("express");
const authRoute = require("../api/auth/authRoute");
const postRoute = require("../api/post/postRoute");

const Router = express.Router();

Router.use("/auth", authRoute);

Router.use("/post", postRoute);

module.exports = Router;
