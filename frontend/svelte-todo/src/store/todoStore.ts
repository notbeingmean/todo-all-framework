import { writable } from "svelte/store";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createAt: string;
  updateAt: string;
};

export default function () {
  const loading = writable(false);
  const todos = writable<Todo[]>([]);
  const error = writable<null | unknown>();

  async function fetchTodos() {
    loading.set(true);
    error.set(null);
    try {
      const res = await fetch("http://localhost:3001/api/todos");
      const data = await res.json();
      todos.set(data);
    } catch (err) {
      error.set(err);
    }
    loading.set(false);
  }

  async function addTodo(newTodo: string) {
    try {
      const res = await fetch("http://localhost:3001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo,
        }),
      });
      const data = await res.json();
      todos.update((prev) => [...prev, data]);
    } catch (err) {
      error.set(err);
    }
  }

  async function updateTodo(id: number, newTodo: string) {
    try {
      const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo,
        }),
      });
      const data = await res.json();
      todos.update((prev) =>
        prev.map((todo) => (todo.id === id ? data : todo))
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(id: number) {
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "DELETE",
      });
      todos.update((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  fetchTodos();

  return {
    loading,
    todos,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
