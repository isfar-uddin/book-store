import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, text, index } from "drizzle-orm/pg-core";

export const authorsTable = pgTable("authors", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 55 }).notNull(),
  lastName: varchar({ length: 55 }),
  email: varchar({ length: 255 }).notNull().unique(),
}, (table) => [
  index('author_search_index').using('gin', sql`to_tsvector('english', ${table.firstName} || ' ' || COALESCE(${table.lastName}, ''))`),
]);
