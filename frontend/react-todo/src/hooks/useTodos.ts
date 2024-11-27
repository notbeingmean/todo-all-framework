import { create } from "zustand";
import { instance } from "../lib/fetch";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type State = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (id: number, title: string, completed: boolean) => void;
  toggleTodo: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  fetchTodos: () => void;
};

export const useTodos = create<State>((set, get) => ({
  todos: [],
  addTodo: async (title) => {
    const response = await instance.post("/todos", { title, completed: false });

    if (response.status !== 200) return;

    const todo = get().todos;

    set({ todos: [...todo, { id: todo.length + 1, title, completed: false }] });
  },
  updateTodo: async (id, title, completed) => {
    const response = await instance.patch(`/todos/${id}`, { title, completed });

    if (response.status !== 200) return;

    const todo = get().todos;
    const index = todo.findIndex((todo) => todo.id === id);

    set({
      todos: [
        ...todo.slice(0, index),
        { id, title, completed },
        ...todo.slice(index + 1),
      ],
    });
  },
  toggleTodo: async (id, completed) => {
    const response = await instance.patch(`/todos/${id}`, {
      completed: !completed,
    });

    if (response.status !== 200) return;

    const todo = get().todos;
    const index = todo.findIndex((todo) => todo.id === id);

    set({
      todos: [
        ...todo.slice(0, index),
        { ...todo[index], completed: !completed },
        ...todo.slice(index + 1),
      ],
    });
  },
  deleteTodo: async (id) => {
    const response = await instance.delete(`/todos/${id}`);

    if (response.status !== 200) return;

    const todo = get().todos;
    const index = todo.findIndex((todo) => todo.id === id);

    set({
      todos: [...todo.slice(0, index), ...todo.slice(index + 1)],
    });
  },

  fetchTodos: async () => {
    const response = await instance.get("/todos");

    if (response.status !== 200) return;

    set({ todos: response.data });
  },
}));
