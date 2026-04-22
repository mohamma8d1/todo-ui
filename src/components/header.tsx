// components/Header.tsx
"use client";

import { Todo } from "@/src/types/todo";

interface HeaderProps {
  todos: Todo[];
}

export default function Header({ todos }: HeaderProps) {
  const activeCount = todos.filter((t) => !t.isComplete).length;
  const completedCount = todos.filter((t) => t.isComplete).length;

  return (
    <header className="text-center mb-12">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          ✨ Galaxy Tasks ✨
        </span>
      </h1>
      <p className="text-gray-400 text-lg mb-8">
        Manage your tasks like stars in the universe! 🌌
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-4 md:gap-8">
        <div className="glass-effect rounded-xl px-6 py-3 text-center neon-border-cyan">
          <p className="text-3xl font-bold text-cyan-400">{activeCount}</p>
          <p className="text-sm text-gray-400">Active</p>
        </div>
        <div className="glass-effect rounded-xl px-6 py-3 text-center neon-border-purple">
          <p className="text-3xl font-bold text-purple-400">{completedCount}</p>
          <p className="text-sm text-gray-400">Completed</p>
        </div>
        <div className="glass-effect rounded-xl px-6 py-3 text-center">
          <p className="text-3xl font-bold text-pink-400">{todos.length}</p>
          <p className="text-sm text-gray-400">Total</p>
        </div>
      </div>
    </header>
  );
}