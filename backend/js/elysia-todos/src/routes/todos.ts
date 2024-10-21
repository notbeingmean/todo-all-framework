import Elysia, { NotFoundError, t } from "elysia";
import { db } from "../db/db";
import { todoTable } from "../db/schema";
import { eq } from "drizzle-orm";

const todoRoutes = new Elysia({ prefix: "/todos" })
  .get("/", async () => {
    const todos = await db.query.todoTable.findMany();
    return todos;
  })
  .get(
    "/:id",
    async ({ params: { id } }) => {
      try {
        const todo = await db
          .select()
          .from(todoTable)
          .where(eq(todoTable.id, parseInt(id)));
        if (!todo.length) {
          throw new NotFoundError("Todo not found");
        }
        return todo[0];
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new Error("Failed to fetch todo");
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/",
    async ({ body }) => {
      try {
        await db.insert(todoTable).values(body);
        return "Todo created successfully";
      } catch (error) {
        throw new Error("Failed to create todo");
      }
    },
    {
      body: t.Object({
        title: t.String(),
      }),
    }
  )
  .patch(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      try {
        const todo = await db
          .select()
          .from(todoTable)
          .where(eq(todoTable.id, parseInt(id)));
        if (!todo.length) {
          throw new NotFoundError("Todo not found");
        }
        await db
          .update(todoTable)
          .set({ completed: body.completed, title: body.title })
          .where(eq(todoTable.id, todo[0].id));
        return "Todo updated successfully";
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new Error("Failed to update todo");
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        title: t.Optional(t.String()),
        completed: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        const todo = await db
          .select()
          .from(todoTable)
          .where(eq(todoTable.id, parseInt(id)));
        if (!todo.length) {
          throw new NotFoundError("Todo not found");
        }
        await db.delete(todoTable).where(eq(todoTable.id, todo[0].id));
        return "Todo deleted successfully";
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new Error("Failed to delete todo");
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );

export default todoRoutes;
