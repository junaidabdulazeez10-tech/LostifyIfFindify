import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticator(req, res, next) {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Not Authorized! 1' })
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded;
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Not Authorized! 2' })
  }
}

export default authenticator