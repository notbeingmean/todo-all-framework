import express from "express";
import prisma from "@/configs/prisma";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    orderBy: { id: "asc" },
  });
  res.status(200).json(todos);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });
  res.status(200).json(todo);
});

router.post("/", async (req, res) => {
  const { title, completed } = req.body;
  const todo = await prisma.todo.create({
    data: { title: title, completed: completed },
  });
  res.status(201).json(todo);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title: title, completed: completed },
  });
  res.status(200).json(todo);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(todo);
});

export { router as todoRouter };
