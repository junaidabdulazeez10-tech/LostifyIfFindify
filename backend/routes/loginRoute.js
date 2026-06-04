import { Router } from 'express'
import User from '../models/user.js'
import { checkSchema, validationResult } from 'express-validator'
import loginValidationSchema from '../validationsFolder/loginValidationSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = Router()

router.post("/login", checkSchema(loginValidationSchema), async (req, res) => {
  try {
    const results = validationResult(req)
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() })
    }

    const user = await User.findOne({
      email: req.body.email,
    })
    if (!user) return res.status(400).json({ message: "Invalid Credentials :/" })

    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) return res.status(400).json({ message: "Invalid Credentials :/" })
    
    const token = jwt.sign({userId: user._id}, process.env.SECRET)
    return res.status(200).json({ message: `Welcome Back! ${user.username} ;)`, username: user.username, token, profilePicture: user.profilePicture })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong with the Process :(" })
  }
})



export default router