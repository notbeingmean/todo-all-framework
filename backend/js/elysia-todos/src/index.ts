import { Elysia } from "elysia";
import todoRoutes from "./routes/todos";

const app = new Elysia()
  .use(todoRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
