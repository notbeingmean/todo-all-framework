import http from "http";
import { db } from "../../configs/db/db";
import { todo } from "../../configs/db/schema/schema";
import { eq } from "drizzle-orm";

async function handleAllTodos(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const todos = await db.select().from(todo);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(todos));

  if (!todos) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Todos not found" }));
  }
}

async function handleTodoById(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  todoId: number
) {
  const find = await db.select().from(todo).where(eq(todo.id, todoId));

  if (!find) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(find[0]));
}

async function handleCreateTodo(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const body = await new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(data);
    });
  });

  const parsedBody = JSON.parse(body as string);
  const create = await db.insert(todo).values(parsedBody);

  if (!create) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ message: "Failed to create todo" }));
  }

  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ message: "Todo created" }));
}

async function handleUpdateTodo(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  todoId: number
) {
  const body = await new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(data);
    });
  });

  const parsedBody = JSON.parse(body as string);
  const update = await db
    .update(todo)
    .set(parsedBody)
    .where(eq(todo.id, todoId));

  if (!update) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ message: "Failed to update todo" }));
  }

  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ message: "Todo updated" }));
}

async function handleDeleteTodo(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  todoId: number
) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  const deleteTodo = await db.delete(todo).where(eq(todo.id, todoId));
  if (!deleteTodo) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ message: "Failed to delete todo" }));
  }

  return res.end(JSON.stringify({ message: "Todo deleted" }));
}

export {
  handleAllTodos,
  handleTodoById,
  handleCreateTodo,
  handleUpdateTodo,
  handleDeleteTodo,
};
