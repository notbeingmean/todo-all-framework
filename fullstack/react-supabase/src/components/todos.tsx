import React, { useEffect, useState } from "react";
import { BiEditAlt, BiX } from "react-icons/bi";
import { Todo, fetchData, removeTodo, toggleTodo } from "../libs/getdata";
import Modal from "./modal";

function Todo() {
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState({
    id: 0,
    title: "",
  });

  useEffect(() => {
    fetchData().then((data) => setTodos(data!));
  }, []);

  return (
    <React.Fragment>
      <Modal
        isOpen={edit}
        onClose={() => setEdit((prev) => !prev)}
        item={editTodo.id}
        value={editTodo.title}
      />
      {todos.map((todo) => {
        return (
          <React.Fragment key={todo.id}>
            <div className="flex items-center justify-between py-2 px-2 border-b border-gray-500 text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="checkbox checkbox-secondary mr-2"
                  onChange={() =>
                    toggleTodo(todo.id, todo.completed).then(() =>
                      fetchData().then((data) => setTodos(data!))
                    )
                  }
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
                  onClick={() => {
                    setEdit((prev) => !prev);
                    setEditTodo({
                      id: todo.id,
                      title: todo.title,
                    });
                  }}
                >
                  <BiEditAlt />
                </button>
                <button
                  className="text-red-500 hover:text-blue-500 transition-colors duration-300"
                  onClick={() => removeTodo(todo.id).then(() => fetchData())}
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
