const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/posts.js");
const { verifyToken } = require("../middleware/auth.js");


const router = express.Router()

/* READ */
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)

/* UPDATE */
router.patch("/:postId/like", verifyToken, likePost)

module.exports = router