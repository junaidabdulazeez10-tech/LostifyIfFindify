import express from "express";
import cors from "cors";

import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(signupRouter);
app.use(loginRouter);
app.use(postRouter);
app.use(commentRouter);

app.get("/", (req, res) => {
  res.send("API is running for Render");
});

export default app;