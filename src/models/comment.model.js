const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userPostId: mongoose.Schema.Types.ObjectId,
    userCommentorId: mongoose.Schema.Types.ObjectId,
    comment: String,
    replies: {
      type: [
        {
          userCommentorId: mongoose.Schema.Types.ObjectId,
          comment: String,
          reply: String
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
