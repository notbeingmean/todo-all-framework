<script lang="ts" setup>
import { store } from "../store/todoStore";
import { ref } from "vue";

const title = ref("");
</script>

<template>
  <div className="card card-compact bg-base-100 w-96 shadow-xl">
    <div className="card-body">
      <input
        type="text"
        placeholder="Add a new todo"
        className="input input-bordered"
        v-model="title"
      />
      <div className="card-actions  ">
        <button
          className="btn btn-primary w-full"
          @click="store.addTodo(title)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
