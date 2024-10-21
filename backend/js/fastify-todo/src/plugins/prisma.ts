import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = async (fastify, opts) => {
  const prisma = new PrismaClient();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (fastifyInstance) => {
    fastifyInstance.prisma.$disconnect();
  });
};

export default fp(prismaPlugin);
