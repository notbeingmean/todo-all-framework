import React, { useRef } from "react";
import { addTodo } from "../libs/getdata";

function AddTodo() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="text"
        className="input input-sm w-full bg-white border border-gray-400"
        placeholder="Add new todo"
        ref={inputRef}
      />
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => {
          addTodo(inputRef.current?.value!).then(() =>
            window.location.reload()
          );
        }}
      >
        Add
      </button>
    </div>
  );
}

export default AddTodo;
