import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

// Session based authentication system
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const usersSession = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
