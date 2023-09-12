import express from "express";
import { env } from "./configs/env";
import { log } from "./configs/logger";
import { mainRouter } from "./routes";
import cors from "cors";

function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
  app.use("/api", mainRouter);

  app.listen(env.PORT, () => {
    log.info(`Server is listening on port ${env.PORT}`);
  });

  return app;
}

export default bootstrap;
