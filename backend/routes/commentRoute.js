import {Router} from 'express'
import Post from '../models/post.js'
import commentValidationSchema from '../validationsFolder/commentValidationSchema.js'
import { validationResult, checkSchema } from 'express-validator';
import authenticator from '../middleware/auth.js';

const router = Router()

router.post("/post/:id/comment", authenticator, checkSchema(commentValidationSchema), async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }
    const id = req.params.id;
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found :(' })
    }
    const commentSection = post.comments
    const comment = {
      user: req.body.user,
      text: req.body.text,
      profilePicture: req.body.profilePicture
    }
    commentSection.push(comment)
    await post.save()
    console.log(req.body)
    res.status(201).json({ message: 'Comment Created :)' })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with the Process :('" })
  }
})

router.patch("/post/:id/comment/:commentId", authenticator, checkSchema(commentValidationSchema), async (req, res) => {
  try {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) return res.status(404).json({ message: "Post not found :(" })
    const getCommentId = post.comments.id(req.params.commentId)
    if (!getCommentId) return res.status(404).json({ message: "Comment not found :(" })
    getCommentId.user = req.body.user || getCommentId.user // if (req.body.user) getCommentId.user = req.body.user
    getCommentId.text = req.body.text || getCommentId.text // if (req.body.text) getCommentId.text = req.body.text
    await post.save()
    res.status(200).json({ message: "Updated :)" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with the Process :('" })
    console.log(error)
  }
})


export default router