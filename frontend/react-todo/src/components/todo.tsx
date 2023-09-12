import React, { useEffect, useState } from "react";
import { BiEditAlt, BiX } from "react-icons/bi";
import { useTodoStore } from "../store/todoStore";
import Modal from "./modal";

function Todo() {
  const [edit, setEdit] = useState(false);
  const { todos, toggleTodo, removeTodo, editTodo, load, newTodo } =
    useTodoStore();

  useEffect(() => {
    load();
  }, []);
  return (
    <React.Fragment>
      {todos.map((todo) => {
        return (
          <React.Fragment key={todo.id}>
            <Modal
              isOpen={edit}
              onClose={() => setEdit(false)}
              onSave={() => editTodo(todo.id, newTodo)}
              value={todo.title}
            />
            <div className="flex items-center justify-between py-2 px-2 border-b border-gray-500 text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="checkbox checkbox-secondary mr-2"
                  onChange={() => toggleTodo(todo.id)}
                />
                <h1
                  className={
                    todo.completed ? "line-through text-black" : "text-black"
                  }
                >
                  {todo.title}
                </h1>
              </div>
              <div className="space-x-2 flex items-center">
                <button
                  className="text-red-500 hover:text-blue-500 transition-colors duration-300"
                  onClick={() => setEdit((prev) => !prev)}
                >
                  <BiEditAlt />
                </button>
                <button
                  className="text-red-500 hover:text-blue-500 transition-colors duration-300"
                  onClick={() => removeTodo(todo.id)}
                >
                  <BiX />
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default Todo;
