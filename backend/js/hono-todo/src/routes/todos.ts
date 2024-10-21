import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { db } from "../db/db";
import { todoTable } from "../db/schema";
import { eq } from "drizzle-orm";

const todosRoute = new Hono();

todosRoute.get("/", async (c) => {
  try {
    const todos = await db.query.todoTable.findMany();
    return c.json(todos);
  } catch (error) {
    console.log(error);
    throw new HTTPException(500, { message: "Internal Server Error" });
  }
});

todosRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const todo = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, parseInt(id)));

    if (todo.length === 0) {
      throw new HTTPException(404, { message: "Not Found" });
    }

    return c.json(todo[0]);
  } catch (error) {
    console.log(error);
    throw new HTTPException(500, { message: "Internal Server Error" });
  }
});

todosRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.title) {
      throw new HTTPException(400, { message: "Title is required" });
    }

    await db.insert(todoTable).values({ title: body.title });

    return c.text("Created todo");
  } catch (error) {
    console.log(error);

    throw new HTTPException(500, { message: "Internal Server Error" });
  }
});

todosRoute.patch("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const body = await c.req.json();
    if (!body.title || !body.completed) {
      throw new HTTPException(400, {
        message: "Title and completed are required",
      });
    }

    const todo = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, parseInt(id)));

    if (todo.length === 0) {
      throw new HTTPException(404, { message: "Not Found" });
    }

    await db
      .update(todoTable)
      .set({ title: body.title })
      .where(eq(todoTable.id, todo[0].id))
      .execute();

    return c.text("Updated todo");
  } catch (error) {
    console.log(error);
    throw new HTTPException(500, { message: "Internal Server Error" });
  }
});

todosRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const todo = await db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, parseInt(id)));

    if (todo.length === 0) {
      throw new HTTPException(404, { message: "Not Found" });
    }

    await db.delete(todoTable).where(eq(todoTable.id, todo[0].id)).execute();

    return c.text("Deleted todo");
  } catch (error) {
    console.log(error);
    throw new HTTPException(500, { message: "Internal Server Error" });
  }
});

export default todosRoute;
