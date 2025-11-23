import express from "express";
import bookRouter from "./routes/bookRouter.js";
import authorRouter from "./routes/authorRouter.js";
import { loggerMiddleware } from "./middlewares/logger.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("This is a book store apps");
});

app.use("/books", bookRouter);

app.use("/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
