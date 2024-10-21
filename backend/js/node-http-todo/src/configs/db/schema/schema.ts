import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  title: text("title"),
  completed: boolean("completed").default(false),
});
