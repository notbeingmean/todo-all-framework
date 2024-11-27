import React, { useEffect, useRef, useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { cn } from "../lib/utils";
import { Pencil } from "lucide-react";

function Todos() {
  const { todos, fetchTodos, toggleTodo, updateTodo } = useTodos();
  const [input, setInput] = useState("");
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="space-y-2">
      <AddTodos />
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h1 className="font-bold text-lg">Todos</h1>
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between">
              <p className={cn(todo.completed && "line-through")}>
                {todo.title}
              </p>
              <div className="flex space-x-2">
                <Pencil
                  size={14}
                  className="cursor-pointer"
                  onClick={() =>
                    (
                      document.getElementById(
                        `my_modal_${todo.id}`
                      ) as HTMLDialogElement
                    ).showModal()
                  }
                />
                <dialog id={`my_modal_${todo.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Todo</h3>
                    <input
                      type="text"
                      placeholder="Edit Todo"
                      className="input input-bordered mt-4 mb-2 w-full"
                      onChange={(e) => setInput(e.currentTarget.value)}
                    />

                    <div className="modal-action">
                      <form method="dialog" className="space-x-2">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            updateTodo(todo.id, input, todo.completed);
                          }}
                        >
                          Save
                        </button>
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddTodos() {
  const { addTodo } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <input
          type="text"
          placeholder="Add Todos"
          className="input input-bordered"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
          ref={inputRef}
        />
        <div className="card-actions ">
          <button
            className="btn btn-primary w-full"
            onClick={() => {
              if (!inputRef.current) return;

              addTodo(inputRef.current.value);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todos;
