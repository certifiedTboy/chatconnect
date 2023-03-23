const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    text: String,
    username: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    reactions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        name: String,
        reaction: String,
      },
    ],
  },
  { timestamps: true }
);

let Post = mongoose.model("Post", postSchema);

module.exports = Post;
