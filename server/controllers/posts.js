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
  const newPost = new PostMessage(post)

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

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("No post with that ID")

  try {
    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
      )
    res.json(updatedPost)
  } catch (error) {
    console.log(error)
  }
}
