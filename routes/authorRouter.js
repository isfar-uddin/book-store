import express from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  getBooksByAuthorId,
} from "../controllers/authorController.js";

const router = express.Router();

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.get("/:id/books", getBooksByAuthorId);

router.post("/", createAuthor);

export default router;
