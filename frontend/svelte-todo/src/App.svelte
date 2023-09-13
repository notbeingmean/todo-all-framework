<script lang="ts">
  import AddTodo from "./components/AddTodo.svelte";
  import Counter from "./components/Counter.svelte";
  import Todo from "./components/Todo.svelte";
</script>

<main>
  <div class="container mx-auto">
    <div class="flex items-center justify-center w-full h-full min-h-screen">
      <div class="card w-[500px] bg-white p-6">
        <h1 class="text-black text-3xl font-bold">Todo App</h1>
        <AddTodo />
        <Todo />
      </div>
    </div>
  </div>
</main>

<style>
</style>
