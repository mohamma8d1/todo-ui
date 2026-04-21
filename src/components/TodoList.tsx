// components/TodoList.tsx
"use client";

import { useState } from "react";
import { Todo } from "@/src/types/todo";
import TodoItem from "./TodoItem";
import ConfirmModal from "./ConfirmModal";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  onRetry: () => void;
}

export default function TodoList({
  todos,
  loading,
  error,
  onToggle,
  onDelete,
  onRetry,
}: TodoListProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const handleDeleteClick = (todo: Todo) => {
    setTodoToDelete(todo);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    await onDelete(todoToDelete.id);
    setDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" />
        </div>
        <p className="text-gray-400 mt-4">Loading your tasks from the cosmos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">💔</div>
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold 
                     hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 neon-glow-cyan"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🌠</div>
        <p className="text-gray-400 text-lg mb-2">No tasks yet!</p>
        <p className="text-gray-500">Add your first task to start exploring the galaxy</p>
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${todoToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
    </>
  );
}