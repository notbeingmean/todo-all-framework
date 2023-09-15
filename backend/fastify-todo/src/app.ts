import Fastify from "fastify";
import { env } from "./configs/env";
import todosRoute from "./routes/todos";
import healthcheckRoute from "./routes/healthcheck";

function build(opts = {}) {
  const app = Fastify(opts);

  // Register plugins
  app.register(import("@fastify/cors"), {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
  app.register(import("./plugins/prisma"));

  // Register routes
  app.register(todosRoute, { prefix: "/api/todos" });
  app.register(healthcheckRoute, { prefix: "/api/healthcheck" });
  return app;
}

function main() {
  const app = build({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  app.listen({ port: Number(env.PORT) }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
  });
}

export default main;
