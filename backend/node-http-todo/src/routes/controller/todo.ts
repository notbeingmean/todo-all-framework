import { db } from "../../configs/db/db";
import { todo } from "../../configs/db/schema/schema";
import {
  handleDeleteTodo,
  handleTodoById,
  handleUpdateTodo,
} from "../service/todo";
import http from "http";

async function GetIdRoute() {
  const todos = await db.select().from(todo);
  const todoById = todos.map((data) => ({
    path: `/todos/${data.id}`,
    method: "GET",
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      await handleTodoById(req, res, data.id);
    },
  }));

  return todoById;
}

async function EditTodoRoute() {
  const todos = await db.select().from(todo);
  const todoById = todos.map((data) => ({
    path: `/todos/${data.id}`,
    method: "PATCH",
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      await handleUpdateTodo(req, res, data.id);
    },
  }));
  return todoById;
}

async function DeleteTodoRoute() {
  const todos = await db.select().from(todo);
  const todoById = todos.map((data) => ({
    path: `/todos/${data.id}`,
    method: "DELETE",
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      await handleDeleteTodo(req, res, data.id);
    },
  }));
  return todoById;
}

export { GetIdRoute, EditTodoRoute, DeleteTodoRoute };
