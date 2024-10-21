import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const todos = await prisma.todo.createMany({
    data: [
      { title: "Learn Prisma", completed: false },
      { title: "Learn React", completed: false },
      { title: "Learn Next.js", completed: false },
      { title: "Learn GraphQL", completed: false },
      { title: "Learn TypeScript", completed: false },
      { title: "Learn JavaScript", completed: false },
      { title: "Learn Node.js", completed: false },
      { title: "Learn Express.js", completed: false },
      { title: "Learn MongoDB", completed: false },
      { title: "Learn MySQL", completed: false },
      { title: "Learn PostgreSQL", completed: false },
      { title: "Learn HTML", completed: false },
      { title: "Learn CSS", completed: false },
    ],
  });
  console.log("Seeded Todos: ", todos);
  console.log("Seeding Completed");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
