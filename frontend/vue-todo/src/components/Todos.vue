<script setup lang="ts">
import { onMounted, ref } from "vue";
import { store } from "../store/todoStore";
import { Pencil, Trash } from "lucide-vue-next";
const input = ref("");
const dialogRefs = ref<Record<number, HTMLDialogElement | null>>({});

onMounted(() => {
  store.fetchTodos();
});
</script>

<template>
  <div class="card card-compact bg-base-100 w-96 shadow-xl">
    <div class="card-body">
      <h1 class="text-lg font-bold">Todos</h1>
      <div class="divide-y divide-gray-200">
        <div class="py-2">
          <ul>
            <li v-for="todo in store.todos" :key="todo.id">
              <div class="flex justify-between">
                <div>
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-primary-600"
                    :checked="todo.completed"
                    @change="store.toggleTodo(todo.id, todo.completed)"
                  />
                  <span
                    :class="{ 'line-through': todo.completed }"
                    class="ml-2"
                  >
                    {{ todo.title }}
                  </span>
                </div>
                <div class="flex space-x-2">
                  <Pencil
                    @click="dialogRefs[todo.id]?.showModal()"
                    :size="14"
                    class="cursor-pointer"
                  />
                  <Trash
                    @click="store.deleteTodo(todo.id)"
                    :size="14"
                    class="cursor-pointer"
                  />
                </div>

                <dialog
                  :id="`my_modal_${todo.id}`"
                  class="modal"
                  :ref="el => dialogRefs[todo.id] = el as HTMLDialogElement"
                >
                  <div class="modal-box">
                    <h3 class="text-lg font-bold">Edit Todo</h3>
                    <input
                      type="text"
                      placeholder="Edit Todo"
                      class="w-full mt-4 mb-2 input input-bordered"
                      v-model="input"
                    />
                    <div class="modal-action">
                      <form method="dialog" class="space-x-2">
                        <button
                          class="btn btn-primary"
                          @click="store.editTodo(todo.id, input)"
                        >
                          Save
                        </button>
                        <button class="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
