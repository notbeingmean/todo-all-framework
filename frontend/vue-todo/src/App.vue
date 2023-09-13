<script setup lang="ts">
import Todo from "./components/Todo.vue";
import AddTodo from "./components/AddTodo.vue";

// const { load } = useTodoStore();
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-center w-full h-full min-h-screen">
      <div class="card w-[500px] p-6 bg-white">
        <h1 class="text-black font-bold text-3xl">Todo App</h1>
        <AddTodo />
        <Todo />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
