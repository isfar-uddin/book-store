import "dotenv/config";
import express from "express";
import authRouter from "./routes/authRouter.js";
import sessionAuthRouter from "./playground/sessionAuth/authRouter.js";
import userRouter from "./routes/userRouter.js";
import bookRouter from "./routes/bookRouter.js";
import authorRouter from "./routes/authorRouter.js";
import adminRouter from "./routes/adminRouter.js";
import { loggerMiddleware } from "./middlewares/logger.js";
import { authenticationMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8000;

/* Middleswares */
app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("This is a book store apps");
});

/* Public routes */
app.use("/auth", authRouter);
app.use("/session/auth", sessionAuthRouter);

/* Auth Middleware */
app.use(authenticationMiddleware);

/* Private routes */
app.use("/users", userRouter);

app.use("/books", bookRouter);

app.use("/authors", authorRouter);

app.use("/admin", adminRouter);

/* Running the application */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
