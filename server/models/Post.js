const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    postPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema)

module.exports = Post
