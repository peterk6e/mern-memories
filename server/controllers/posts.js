import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()

    return res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  })

  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID")

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, _id: id },
    {
      new: true,
    }
  )

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("No post with that ID")
  try {
    await PostMessage.findByIdAndRemove(id)
    return res.json("Post deleted successfully")
  } catch (error) {
    console.log(error)
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params

  // 'req.userId' is created in auth middleware and is used to determine
  // if the user has the rights to like the post
  if (!req.userId) return res.json({ message: "User unauthenticated" })

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("No post with that ID")

  try {
    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex(id => id === String(req.userId))

    if (index === -1) {
      post.likes.push(req.userId)
    } else {
      post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    })
    res.json(updatedPost)
  } catch (error) {
    console.log(error)
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query

  try {
    const title = new RegExp(searchQuery, "i") // for mongoose to search

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    })

    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}
