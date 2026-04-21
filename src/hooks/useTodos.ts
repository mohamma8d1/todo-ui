// hooks/useTodos.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Todo, TodoResponse } from "@/src/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/TodoItems";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TodoResponse = await response.json();
      setTodos(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = async (title: string, description: string) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo");
      console.error("Error adding todo:", err);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          isComplete: !todo.isComplete,
        }),
      });

      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
      console.error("Error updating todo:", err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
}