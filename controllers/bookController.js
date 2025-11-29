import { eq, sql } from "drizzle-orm";
import { booksTable } from "../models/bookModel.js";
import { db } from "../db/index.js";
import { authorsTable } from "../models/authorModel.js";

export const getAllBooks = async (req, res) => {
  const { search } = req.query;

  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
      );

    return res.status(200).json(books);
  }

  const books = await db.select().from(booksTable);
  return res.status(200).json(books);
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
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
