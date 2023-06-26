const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userPostId: mongoose.Schema.Types.ObjectId,
    postTitle: String,
    postDescription: String,
    comments: [{
      text: String,
      createdBy: mongoose.Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", PostSchema);
