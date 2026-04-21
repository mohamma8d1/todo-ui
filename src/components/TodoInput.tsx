// components/TodoInput.tsx
"use client";

import { useState } from "react";

interface TodoInputProps {
  onAdd: (title: string, description: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative group">
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
        
        {/* Input container */}
        <div className="relative glass-effect rounded-2xl p-1 neon-border-cyan">
          <div className="space-y-3 p-4">
            {/* Title Input */}
            <div className="flex items-center gap-3">
              <div className="pl-2">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder="Task title..."
                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
                required
              />
            </div>

            {/* Description Input (Expandable) */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex items-start gap-3 pl-7">
                <svg
                  className="w-5 h-5 text-purple-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add description (optional)..."
                  rows={2}
                  className="flex-1 bg-slate-800/50 rounded-lg p-2 text-white text-sm placeholder-gray-500 outline-none border border-transparent focus:border-purple-500/50 resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isExpanded ? "Hide description" : "Add description"}
              </button>

              <button
                type="submit"
                disabled={!title.trim()}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold 
                           hover:from-cyan-400 hover:to-purple-400 transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           neon-glow-cyan hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}