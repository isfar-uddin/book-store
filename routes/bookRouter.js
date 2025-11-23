import express from "express";
import { BOOKS } from "../db/books.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(BOOKS);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ error: "Id is required" });

  const book = BOOKS.find((book) => book.id == id);

  if (!book) {
    return res
      .status(404)
      .json({ error: "The requested book is not found." });
  }

  return res.status(200).json(book);
});

router.post("/", (req, res) => {
  const { title, author } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title of the book is required." });
  }
  if (!author) {
    return res
      .status(400)
      .json({ error: "The author name of the book is required." });
  }

  const maxId = Math.max(...BOOKS.map((book) => book.id));

  const books = { id: maxId + 1, title, author };
  BOOKS.push(books);

  return res.status(201).json({ message: "Book is created." });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID is required" });
  }

  const index = BOOKS.findIndex((book) => book.id == id);

  if (index === -1)
    return res.status(404).json({ message: "Book is not found." });

  BOOKS.splice(index, 1);

  return res.status(200).json({ message: "Book is deleted successfully" });
});

export default router;
