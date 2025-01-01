"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Pencil, Trash } from "lucide-react";

function Todos() {
  const { todos, fetchTodos, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState("");
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="space-y-2">
      <AddTodos />
      <div className="shadow-xl card bg-base-100 w-96">
        <div className="card-body">
          <h1 className="text-lg font-bold">Todos</h1>
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between">
              <p className={todo.completed ? "line-through" : ""}>
                {todo.title}
              </p>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />

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
                <Trash
                  size={14}
                  className="cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                />
                <dialog id={`my_modal_${todo.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit Todo</h3>
                    <input
                      type="text"
                      placeholder="Edit Todo"
                      className="w-full mt-4 mb-2 input input-bordered"
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
    <div className="shadow-xl card bg-base-100 w-96">
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
            className="w-full btn btn-primary"
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
