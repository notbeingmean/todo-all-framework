import { FastifyInstance, FastifyRequest } from "fastify";

export default async function todosRoute(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    try {
      const todos = await app.prisma.todo.findMany();
      reply.status(200).send(todos);
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  app.get(
    "/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const { id } = request.params;
        const todo = await app.prisma.todo.findUnique({
          where: { id: Number(id) },
        });
        reply.status(200).send(todo);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.post(
    "/",
    async (request: FastifyRequest<{ Body: { title: string } }>, reply) => {
      try {
        const { title } = request.body;
        const todo = await app.prisma.todo.create({
          data: { title },
        });
        reply.status(201).send(todo);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.patch(
    "/:id",
    async (
      request: FastifyRequest<{
        Body: { title: string; completed: boolean };
        Params: { id: string };
      }>,
      reply
    ) => {
      const { id } = request.params;
      const { title, completed } = request.body;
      try {
        const todo = await app.prisma.todo.update({
          where: { id: Number(id) },
          data: { title, completed },
        });
        reply.status(200).send(todo);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.delete(
    "/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const { id } = request.params;
        const todo = await app.prisma.todo.delete({
          where: { id: Number(id) },
        });
        reply.status(200).send("deleted");
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );
}
