
import { todoApi } from "@/src/lib/api";
import TodoList from "@/src/components/TodoList";

export default async function HomePage() {
  const todos = await todoApi.getAll();

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List Manager</h1>
      <TodoList initialTodos={todos} />
    </main>
  );
}