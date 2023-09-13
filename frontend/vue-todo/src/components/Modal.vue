<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  id: Number,
  title: String,
  show: Boolean,
  close: Function,
});

const newTodo = ref("");

const onEdit = (e: any) => {
  e.preventDefault();
  newTodo.value = e.target.value;
};
const onSave = async () => {
  props.close;
  fetch(`http://localhost:3001/api/todos/${props.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTodo.value,
    }),
  });
};
</script>

<template>
  <div
    :class="{
      hidden: !props.show,
      'fixed top-0 left-0 bg-[rgba(0,0,0,.1)] w-full h-full': props.show,
    }"
  >
    <div class="flex items-center h-full justify-center">
      <div class="card bg-white w-[400px] p-6 flex">
        <input
          type="text"
          placeholder="Edit todo"
          class="input input-md input-bordered bg-white mb-4"
          @change="onEdit"
        />
        <button class="btn btn-sm btn-primary mb-2" @click="onSave">
          Save
        </button>
        <button class="btn btn-sm btn-secondary" @click="props.close">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
