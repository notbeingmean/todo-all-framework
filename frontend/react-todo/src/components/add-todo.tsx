import React from "react";

function AddTodo() {
  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="text"
        className="input input-sm w-full bg-white border border-gray-400"
        placeholder="Add new todo"
      />
      <button className="btn btn-secondary btn-sm">Add</button>
    </div>
  );
}

export default AddTodo;
