"use client";

import { useState } from "react";
import { Todo } from "@/src/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDeleteClick: (todo: Todo) => void; 
}

export default function TodoItem({ todo, onToggle, onDeleteClick }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="relative group mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur transition-opacity duration-300 ${
          isHovered ? "opacity-40" : "opacity-0"
        }`}
      />

      {/* Card */}
      <div
        className={`relative glass-effect rounded-xl transition-all duration-300 overflow-hidden ${
          isHovered ? "neon-border-cyan" : "border border-white/5"
        }`}
      >
        <div className="p-4">
          <div className="flex items-start gap-4">
            {/* Checkbox */}
            <button
              onClick={() => onToggle(todo.id)}
              className={`relative w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center flex-shrink-0 mt-0.5
                ${
                  todo.isComplete
                    ? "bg-linear-to-r from-green-400 to-emerald-500 border-green-400"
                    : "border-cyan-400/50 hover:border-cyan-400"
                }`}
            >
              {todo.isComplete && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-medium transition-all duration-300 ${
                      todo.isComplete ? "text-gray-500 line-through" : "text-white"
                    }`}
                  >
                    {todo.title}
                  </h3>
                  
                  {/* Description */}
                  {todo.description && (
                    <div className="mt-2">
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {isExpanded ? "Hide details" : "Show details"}
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-400 text-sm leading-relaxed pl-5 border-l-2 border-purple-500/30">
                          {todo.description}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Created: {formatDate(todo.createdAt)}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onDeleteClick(todo)}
                  className={`p-2 rounded-lg transition-all duration-300 hover:bg-red-500/20 shrink-0
                    ${isHovered ? "opacity-100" : "opacity-0"}`}
                >
                  <svg
                    className="w-5 h-5 text-red-400 hover:text-red-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}