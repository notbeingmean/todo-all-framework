import { Elysia } from "elysia";
import todoRoutes from "./routes/todos";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(todoRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
