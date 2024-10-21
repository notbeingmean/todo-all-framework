import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  completed: boolean().notNull().default(false),
});
