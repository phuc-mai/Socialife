import User from "../models/User.js"
import Post from "../models/Post.js"

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, postPicturePath } = req.body
    const user = await User.findById(userId)
    const newPost = new Post({
      userId,
      userPicturePath: user.userPicturePath,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      postPicturePath,
      likes: {},
      comments: []
    })

    await newPost.save()

    const posts = await Post.find()
    res.status(201).json(posts)
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(202).json(posts)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params 
    const userPosts = await Post.find({ userId })
    res.status(202).json(userPosts)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params // The id of the post to be liked/unliked to be passed in the URL parameters 
    const { userId } = req.body // The id of the user performing the action to be passed in the request body

    /* Find the post in the database using the id */
    const post = await Post.findById(id)

    /* Check if the user with userId has already liked the post */
    const isLiked = post.likes.get(userId)

    /* If the user has already liked the post, remove the like (unlike) */
    /* Otherwise, add the like (like) */
    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    /* Save the updated post in the database */
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes},
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}