import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRouter from './routes/postRoute.js'
import commentRouter from './routes/commentRoute.js'
import signupRouter from './routes/signupRoute.js'
import loginRouter from './routes/loginRoute.js'



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(signupRouter)
app.use(loginRouter)
app.use(postRouter)
app.use(commentRouter)


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(':) connected to the DB')
}).catch((error) => {
  console.log(':( failed to connect to the DB')
  console.log(error)
})

app.get('/', (req, res) => {
  res.send('API is running for Render');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});