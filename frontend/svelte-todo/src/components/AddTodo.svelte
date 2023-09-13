<script lang="ts">
  import todoStore from "../store/todoStore";

  const { addTodo } = todoStore();
  let newTodo: string = "";
</script>

<div class="flex items-center my-2">
  <input
    type="text"
    placeholder="Add todo"
    bind:value={newTodo}
    class="input input-sm input-bordered bg-white w-full"
  />
  <button
    class="btn btn-sm btn-primary ml-2"
    on:click={() => addTodo(newTodo).then(() => window.location.reload())}
    >Add</button
  >
</div>
