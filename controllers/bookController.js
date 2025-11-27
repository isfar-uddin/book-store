import { eq } from "drizzle-orm";
import { booksTable } from "../models/bookModel.js";
import { db } from "../db/index.js";

export const getAllBooks = async (_, res) => {
  const books = await db.select().from(booksTable);
  console.log(books);
  return res.status(200).json(books);
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (!book) {
    return res.status(404).json({ error: "The requested book is not found." });
  }

  return res.status(200).json(book);
};

export const createBook = async (req, res) => {
  const { title, description, authorId } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title of the book is required." });
  }

  const [result] = await db
    .insert(booksTable)
    .values({ title, description, authorId })
    .returning({ id: booksTable.id });

  return res
    .status(201)
    .json({ id: result.id, message: "Book is created successfully." });
};

export const deleteBookById = async (req, res) => {
  const { id } = req.params;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: "Book is deleted successfully." });
};
