import { Router } from 'express'
import Post from '../models/post.js'
import postValidationSchema from '../validationsFolder/postValidationSchema.js';
import { validationResult, checkSchema } from 'express-validator';
import authenticator from '../middleware/auth.js';
import multer from 'multer'

const upload = multer({ dest: "uploads/" });
const router = Router()

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ posts })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while loading the posts :(" })
    console.log(error)
  }
})

router.post("/post", authenticator, upload.single("image"), checkSchema(postValidationSchema), async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }
    if (!req.file) {
      return res.status(400).json({
        errors: [{ msg: "Image is required", path: "image" }]
      });
    }
    const createPost = new Post()
    createPost.username = req.body.username;
    createPost.profilePicture = req.body.profilePicture;
    createPost.condition = req.body.condition;
    createPost.title = req.body.title;
    createPost.category = req.body.category;
    createPost.location = req.body.location;
    createPost.date = new Date(req.body.date);
    createPost.description = req.body.description;
    createPost.image =  `http://localhost:5000/uploads/${req.file.filename}`;
    await createPost.save()
    res.status(201).json({ message: 'Post Created :)' })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while creating the post :(" })
    console.log(error)
  }
})

router.delete("/post/:id", authenticator, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found :(' })
    }
    res.status(200).json({ message: 'Post deleted successfully :)' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong with the delete process :(' })
  }
})


router.patch("/post/:id", authenticator, upload.single("image"), checkSchema(postValidationSchema), async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }
    if (!req.file) {
      return res.status(400).json({
        errors: [{ msg: "Image is required", path: "image" }]
      });
    }
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found :(' })
    }
    post.username = req.body.username || post.username
    post.condition = req.body.condition || post.condition
    post.title = req.body.title || post.title
    post.category = req.body.category || post.category
    post.location = req.body.location || post.location
    post.date = req.body.date ? new Date(req.body.date) : post.date;
    post.description = req.body.description || post.description
    post.image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : post.image;
    await post.save()
    res.status(200).json({ message: "Post Updated ;)" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with the Process :('" })
  }
})

export default router