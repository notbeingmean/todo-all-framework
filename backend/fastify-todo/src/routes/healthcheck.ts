import { FastifyInstance } from "fastify";

export default async function healthcheckRoute(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    reply.status(200).send("OK");
  });
}
