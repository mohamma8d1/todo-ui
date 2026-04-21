import { TodoItemDto, CreateTodoCommand, UpdateTodoItemDto } from "@/src/types/todo";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PageinatedResponse {
  items: TodoItemDto[]
  totalCount: number,
  page: number,
  pageSize: number,
  totalPages: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}



export const todoApi = {
  getAll: async (): Promise<TodoItemDto[]> => {
    const res = await fetch(`${API_BASE}/TodoItems`);
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data: PageinatedResponse = await res.json();
    return data.items;
  },

  getById: async (id: string): Promise<TodoItemDto> => {
    const res = await fetch(`${API_BASE}/TodoItems/${id}`);
    if (!res.ok) throw new Error("Todo not found");
    return res.json();
  },

  create: async (data: CreateTodoCommand): Promise<{ id: string }> => {
    const res = await fetch(`${API_BASE}/TodoItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create todo");
    return res.json();
  },

  update: async (id: string, data: UpdateTodoItemDto): Promise<TodoItemDto> => {
    const res = await fetch(`${API_BASE}/TodoItems/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
  },

  updatePartial: async (id: string, data: Partial<UpdateTodoItemDto>): Promise<TodoItemDto> => {
    const res = await fetch(`${API_BASE}/TodoItems/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/TodoItems/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete todo");
  },
};