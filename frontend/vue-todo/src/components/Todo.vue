<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";
import Modal from "./Modal.vue";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

const todos = ref<Todo[]>([]);
const edit = ref(false);

const getTodos = async () => {
  const res = await fetch("http://localhost:3001/api/todos");
  const data = await res.json();
  todos.value = data;
};

function onClose() {
  edit.value = false;
}

onMounted(() => {
  getTodos();
});

onUpdated(() => {
  getTodos();
});

const deleteTodo = (id: number) => {
  fetch(`http://localhost:3001/api/todos/${id}`, {
    method: "DELETE",
  });
};

const toggleTodo = (id: number) => {
  const check = todos.value.find((todo) => todo.id === id)?.completed;
  fetch(`http://localhost:3001/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !check,
    }),
  });
};
</script>

<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <Modal :id="todo.id" :show="edit" :close="onClose" />
        <div class="flex items-center justify-between my-2">
          <div class="flex items-center space-x-1">
            <input
              type="checkbox"
              :checked="todo.completed"
              class="checkbox-primary checkbox-sm checkbox"
              @click="toggleTodo(todo.id)"
            />
            <span :class="{ 'line-through': todo.completed }">{{
              todo.title
            }}</span>
          </div>
          <div class="space-x-2">
            <button class="" @click="edit = true">
              <i class="bx bx-edit"></i>
            </button>
            <button @click="deleteTodo(todo.id)">
              <i class="bx bx-x"></i>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
