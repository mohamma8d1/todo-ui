export interface Todo {
  id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  createdAt: string;
}

export interface TodoResponse {
  items: Todo[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateTodoCommand {
  title: string;
  description?: string;
}

export interface UpdateTodoItemDto {
  title: string;
  description?: string;
  isComplete: boolean;
}