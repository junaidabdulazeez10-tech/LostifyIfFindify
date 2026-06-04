import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator';
import signupValidationSchema from '../validationsFolder/signupValidationSchema.js';
import User from '../models/user.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer'


dotenv.config();
const upload = multer({ dest: "uploads/" });
const router = Router()

router.post("/signup", upload.single("profilePicture"), checkSchema(signupValidationSchema), async (req, res) => {
  try {
    const results = validationResult(req)
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() })
    }
    if (!req.file) {
      return res.status(400).json({
        errors: [{ msg: "profile picture is required", path: "image" }]
      });
    }
    const user = new User()
    const existingUserName = await User.findOne({
      username: req.body.username
    })
    const existingEmail = await User.findOne({
      email: req.body.email
    })
    if (existingUserName) return res.status(400).json({ message: "Username is already taken :(" })
    if (existingEmail) return res.status(400).json({ message: "Email is already taken :(" })
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, 10);
    user.profilePicture =  `http://localhost:5000/uploads/${req.file.filename}`;
    await user.save()
    const token = jwt.sign({ userId: user._id }, process.env.SECRET)
    return res.status(201).json({ message: `Successfully signed up, Welcome ${req.body.username} :)`, username: req.body.username, profilePicture: `http://localhost:5000/uploads/${req.file.filename}`, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong with the Process :(" })
  }
})


export default router