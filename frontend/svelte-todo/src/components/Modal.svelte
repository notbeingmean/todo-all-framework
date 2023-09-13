<script lang="ts">
  import todoStore from "../store/todoStore";

  export let id: number;
  export let isEditing: boolean = false;
  export let toggleEditing: () => void;
  let newTodo: string;

  const { updateTodo } = todoStore();
</script>

<div>
  {#if isEditing}
    <div class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)]">
      <div class="flex items-center justify-center w-full h-full">
        <div class="card bg-white p-6">
          <input
            type="text"
            bind:value={newTodo}
            placeholder="Edit todo"
            class="input input-sm input-bordered bg-white"
          />
          <button
            on:click={() =>
              updateTodo(id, newTodo).then(() => window.location.reload())}
            class="btn btn-sm btn-primary mt-2">Update</button
          >
          <button
            class="btn btn-sm btn-secondary mt-2"
            on:click={() => toggleEditing()}>CLOSE</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>
