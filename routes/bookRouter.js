import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.delete("/:id", deleteBookById);

export default router;
