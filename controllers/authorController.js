import { eq, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { authorsTable } from "../models/authorModel.js";
import { booksTable } from "../models/bookModel.js";

export const getAllAuthors = async (req, res) => {
  const { search } = req.query;

  if (search) {
    const authors = await db
      .select()
      .from(authorsTable)
      .where(
        sql`to_tsvector('english', ${authorsTable.firstName} || ' ' || COALESCE(${authorsTable.lastName}, '')) @@ to_tsquery('english', ${search})`
      );

    return res.status(200).json(authors);
  }

  const authors = await db.select().from(authorsTable);
  return res.status(200).json(authors);
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;

  const [author] = await db
    .select()
    .from(authorsTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (!author) {
    return res.status(404).json({ error: "Author is not found" });
  }

  return res.status(200).json(author);
};

export const getBooksByAuthorId = async (req, res) => {
  const { id } = req.params;

  const books = await db.select().from(booksTable).where(eq(booksTable.authorId, id));

  return res.status(200).json(books);
};

export const createAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName) {
    return res.status(400).json({ error: "FirstName is required." });
  }

  if (!email) {
    return res.status(400).json({ error: "email is required." });
  }

  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({ id: authorsTable.id });

  return res
    .status(201)
    .json({ id: result.id, message: "Author has been created" });
};
