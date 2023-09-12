import { create } from "zustand";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodoStore = {
  todos: Todo[];
  newTodo: string;
  setNewTodo: (text: string) => void;
  load: () => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  removeTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  newTodo: "",
  setNewTodo: (text) => set({ newTodo: text }),
  load: async () => {
    const response = await fetch("http://localhost:3001/api/todos");
    const todos = await response.json();
    set({ todos });
  },
  addTodo: async (text) => {
    const response = await fetch("http://localhost:3001/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const todo = await response.json();
    set((state) => ({ todos: [...state.todos, todo] }));
  },
  toggleTodo: async (id) => {
    const reqtodo = await fetch(`http://localhost:3001/api/todos/${id}`);
    const findtodo = await reqtodo.json();

    const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !findtodo.completed }),
    });
    const todo = await response.json();
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    }));
  },
  editTodo: async (id, text) => {
    const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const todo = await response.json();
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: text };
        }
        return todo;
      }),
    }));
  },
  removeTodo: async (id) => {
    await fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "DELETE",
    });
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
}));
