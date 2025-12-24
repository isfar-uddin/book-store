import "dotenv/config";
import express from "express";
import authRouter from "./routes/authRouter.js";
import sessionAuthRouter from "./playground/sessionAuth/authRouter.js";
import userRouter from "./routes/userRouter.js";
import bookRouter from "./routes/bookRouter.js";
import authorRouter from "./routes/authorRouter.js";
import { loggerMiddleware } from "./middlewares/logger.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("This is a book store apps");
});

app.use("/auth", authRouter);
app.use("/session/auth", sessionAuthRouter);

app.use("/users", userRouter);

app.use("/books", bookRouter);

app.use("/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
