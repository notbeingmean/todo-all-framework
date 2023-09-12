import Todo from "./components/todo";
import AddTodo from "./components/add-todo";

function App() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center w-full h-full min-h-screen">
        <div className="card bg-white w-[500px] p-6">
          <h1 className="text-2xl font-bold text-black mb-4">Todo App</h1>
          <AddTodo />
          <Todo />
        </div>
      </div>
    </div>
  );
}

export default App;
