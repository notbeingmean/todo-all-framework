import http from "http";
import { Route } from "../types/routes";
import {
  handleAllTodos,
  handleCreateTodo,
  handleTodoById,
} from "./service/todo";
import { DeleteTodoRoute, EditTodoRoute, GetIdRoute } from "./controller/todo";

function handleRoot(req: http.IncomingMessage, res: http.ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Hello, World!" }));
}

function handleHealthCheck(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Server is running" }));
}

async function registerRoute() {
  const routes: Route[] = [
    { path: "/", method: "GET", handler: handleRoot },
    { path: "/healthcheck", method: "GET", handler: handleHealthCheck },
    {
      path: "/todos",
      method: "GET",
      handler: handleAllTodos,
    },
    { path: "/todos", method: "POST", handler: handleCreateTodo },
  ];

  const todoById = await GetIdRoute();
  const editTodo = await EditTodoRoute();
  const deleteTodo = await DeleteTodoRoute();

  routes.push(...todoById, ...editTodo, ...deleteTodo);

  return routes;
}

export { registerRoute };
