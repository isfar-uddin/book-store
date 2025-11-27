import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { authorsTable } from "./authorModel.js";

export const booksTable = pgTable("books", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 100 }).notNull(),
  description: text(),
  authorId: uuid()
    .references(() => authorsTable.id)
    .notNull(),
});
