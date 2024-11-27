<script setup lang="ts">
import AddTodo from "./components/AddTodo.vue";
import Todos from "./components/Todos.vue";
</script>

<template>
  <div
    class="flex items-center justify-center h-screen bg-white flex-col space-y-2"
  >
    <AddTodo />
    <Todos />
  </div>
</template>
