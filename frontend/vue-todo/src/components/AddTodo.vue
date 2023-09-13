<script setup lang="ts">
import { ref } from "vue";

async function AddTodo(title: string) {
  fetch("http://localhost:3001/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
}
function getTitle(e: any) {
  title.value = e.target.value;
}

const title = ref("");
</script>

<template>
  <div class="flex items-center my-2">
    <input
      type="text"
      placeholder="Add new todo"
      class="input input-sm w-full input-bordered bg-white mr-2"
      @change="getTitle"
    />
    <button class="btn btn-sm btn-primary" @click="AddTodo(title)">Add</button>
  </div>
</template>

<style scoped></style>
