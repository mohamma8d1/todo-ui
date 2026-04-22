"use client";

import { useState } from "react";
import GalaxyBackground from "@/src/components/GalaxyBackground";
import Header from "@/src/components/header";
import TodoInput from "@/src/components/TodoInput";
import TodoList from "@/src/components/TodoList";
import { useTodos } from "@/src/hooks/useTodos";

type FilterType = "all" | "active" | "completed";

export default function Home() {
  const {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteTodoSilent,
    refetch,
  } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isComplete;
    if (filter === "completed") return todo.isComplete;
    return true;
  });

  const completedCount = todos.filter((t) => t.isComplete).length;

  return (
    <main className="min-h-screen relative">
      <GalaxyBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <Header todos={todos} />

        <TodoInput onAdd={addTodo} />

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {(["all", "active", "completed"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                filter === f
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white neon-glow-cyan"
                  : "glass-effect text-gray-400 hover:text-white hover:neon-border-cyan border border-transparent"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <TodoList
          todos={filteredTodos}
          loading={loading}
          error={error}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onRetry={refetch}
        />

        {/* Clear Completed */}
        {completedCount > 0 && (
          <button
            onClick={async () => {
              const completed = todos.filter((t) => t.isComplete);
              await Promise.all(
                completed.map((todo) => deleteTodoSilent(todo.id)),
              );
              await refetch();
            }}
            className="mt-8 mx-auto block px-6 py-2 glass-effect rounded-full text-red-400 
                       hover:text-red-300 hover:neon-border-cyan transition-all duration-300 border border-transparent"
          >
            Clear completed tasks 🗑️
          </button>
        )}
      </div>
    </main>
  );
}
