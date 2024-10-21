import { Hono } from "hono";
import todosRoute from "./routes/todos";

const app = new Hono();

app.get("/", (c) => c.text("Hello, World!"));

app.route("/todos", todosRoute);

export default app;
