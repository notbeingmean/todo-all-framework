<script lang="ts">
  import todoStore from "../store/todoStore";
  import Modal from "./Modal.svelte";

  const { todos, loading, error, deleteTodo } = todoStore();

  let isEditing: boolean = false;
  let id: number;

  function toggleEditing() {
    isEditing = !isEditing;
  }

  function toggleTodos(id: number) {
    const todo = $todos.find((todo) => todo.id === id);
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !todo?.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
</script>

<div>
  {#if $loading}
    <p>Loading...</p>
  {:else if $error}
    <p>{error}</p>
  {:else}
    {#each $todos as todo (todo.id)}
      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-1 w-full">
          <input
            type="checkbox"
            bind:checked={todo.completed}
            class="checkbox checkbox-primary"
            on:click={() => toggleTodos(todo.id)}
          />

          <p>{todo.title}</p>
        </div>
        <div class="flex space-x-2">
          <button
            on:click={() => {
              isEditing = true;
              id = todo.id;
            }}>EDIT</button
          >
          <button on:click={() => deleteTodo(todo.id)}>DELETE</button>
        </div>
      </div>
    {/each}
    <Modal {id} {isEditing} {toggleEditing} />
  {/if}
</div>
