"use client";

import { TodoItemDto } from "@/src/types/todo";

interface Props {
  todo: TodoItemDto;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={onToggle}
        className="h-5 w-5 accent-blue-600 cursor-pointer"
      />
      <div className="flex-1">
        <h3 className={`text-lg font-medium ${todo.isComplete ? "line-through text-gray-400" : "text-gray-800"}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
        )}
      </div>
      <button
        onClick={onEdit}
        className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  );
}