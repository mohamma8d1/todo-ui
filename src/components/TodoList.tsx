"use client";

import { useState } from "react";
import { TodoItemDto } from "@/src/types/todo";
import { todoApi } from "@/src/lib/api";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import ConfirmModal from "./ConfirmModal";

interface Props {
  initialTodos: TodoItemDto[];
}

export default function TodoList({ initialTodos }: Props) {
  const [todos, setTodos] = useState<TodoItemDto[]>(initialTodos);
  const [editingTodo, setEditingTodo] = useState<TodoItemDto | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<TodoItemDto | null>(null);
  const handleCreate = async (data: {
    title: string;
    description?: string;
  }) => {
    try {
      const { id } = await todoApi.create(data);
      const newTodo = await todoApi.getById(id);
      setTodos([...todos, newTodo]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to create todo:", error);
      alert("Error creating todo. Check console for details.");
    }
  };

  const handleUpdate = async (
    id: string,
    data: { title: string; description?: string; isComplete: boolean },
  ) => {
    try {
      const updated = await todoApi.update(id, data);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
      setEditingTodo(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
      alert("Error updating todo.");
    }
  };

  const handleDeleteClick = (todo: TodoItemDto) => {
    setTodoToDelete(todo);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;

    try {
      await todoApi.delete(todoToDelete.id);
      setTodos(todos.filter((t) => t.id !== todoToDelete.id));
      setDeleteModalOpen(false);
      setTodoToDelete(null);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      alert("Error deleting todo.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  const handleToggleComplete = (todo: TodoItemDto) => {
    todoApi
      .updatePartial(todo.id, { isComplete: !todo.isComplete })
      .then((updated) => {
        setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
      });
  };

  return (
    <div>
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Todo"
        message={`Are you sure you want to delete "${todoToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingTodo(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          + Add New Todo
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <TodoForm
            initialData={editingTodo || undefined}
            onSubmit={(data) => {
              if (editingTodo) {
                handleUpdate(editingTodo.id, { ...editingTodo, ...data });
              } else {
                handleCreate(data);
              }
            }}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingTodo(null);
            }}
          />
        </div>
      )}

      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No todos yet. Click "Add New Todo" to get started!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggleComplete(todo)}
              onEdit={() => {
                setEditingTodo(todo);
                setIsFormOpen(true);
              }}
              onDelete={() => handleDeleteClick(todo)}
            />
          ))
        )}
      </div>
    </div>
  );
}
