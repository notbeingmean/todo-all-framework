import { db } from "./db";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function fetchData() {
  const { data, error } = await db.from("todo").select("*").order("id");
  if (error) {
    console.log(error);
  }

  if (!data) {
    return;
  }
  return data;
}

async function getTodoById(id: number) {
  const { data, error } = await db.from("todo").select("*").match({ id });
  if (error) {
    console.log(error);
  }

  if (!data) {
    return;
  }
  return data;
}

async function addTodo(title: string) {
  const { data, error } = await db.from("todo").insert({
    title,
  });
  if (error) {
    return;
  }

  if (!data) {
    return;
  }
}

async function removeTodo(id: number) {
  const { data, error } = await db.from("todo").delete().match({ id });
  if (error) {
    return;
  }

  if (!data) {
    return;
  }
}

async function toggleTodo(id: number, completed: boolean) {
  const { data, error } = await db
    .from("todo")
    .update({ completed: !completed })
    .match({ id });
  if (error) {
    return;
  }

  if (!data) {
    return;
  }
}

async function editTodo(id: number, title: string) {
  const { data, error } = await db.from("todo").update({ title }).match({ id });
  if (error) {
    return;
  }

  if (!data) {
    return;
  }
}

export { fetchData, getTodoById, addTodo, removeTodo, toggleTodo, editTodo };
