import { reactive } from "vue";
import { instance } from "../libs/fetch";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Store = {
  todos: Todo[];
  addTodo: (title: string) => void;
  editTodo: (id: number, title: string) => void;
  toggleTodo: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  fetchTodos: () => void;
};

export const store = reactive<Store>({
  todos: [],
  addTodo: async (title) => {
    const response = await instance.post("/todos", { title });

    if (response.status !== 200) return;

    store.todos.push({
      id: store.todos.length + 1,
      title,
      completed: false,
    });
  },
  editTodo: async (id, title) => {
    const response = await instance.patch(`/todos/${id}`, { title });

    if (response.status !== 200) return;
    const todo = store.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = title;
    }
  },
  toggleTodo: async (id, completed) => {
    const response = await instance.patch(`/todos/${id}`, {
      completed: !completed,
    });

    if (response.status !== 200) return;
    const todo = store.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  deleteTodo: async (id) => {
    const response = await instance.delete(`/todos/${id}`);
    if (response.status !== 200) return;
    store.todos = store.todos.filter((todo) => todo.id !== id);
  },
  fetchTodos: async () => {
    const res = await instance.get("/todos");

    store.todos = res.data;
  },
});
