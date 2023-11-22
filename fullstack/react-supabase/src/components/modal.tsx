import React, { useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { editTodo } from "../libs/getdata";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: number;
  value?: string;
};

function Modal({ onClose, item, isOpen, value }: ModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={
        isOpen
          ? "fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,.1)] flex items-center justify-center"
          : "hidden"
      }
    >
      <div className="bg-white w-[400px] card ">
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-400">
          <h1 className="text-xl font-bold text-black">Edit</h1>
          <button
            className="text-red-500 hover:text-blue-500 transition-colors duration-300"
            onClick={onClose}
          >
            <BiX />
          </button>
        </div>
        <div className="p-4 flex space-x-1">
          <input
            type="text"
            className="input input-sm w-full bg-white border border-gray-400"
            placeholder={value}
            ref={inputRef}
          />
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              onClose();
              editTodo(item, inputRef.current?.value!).then(() =>
                window.location.reload()
              );
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
