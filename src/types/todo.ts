export interface TodoItemDto{
    id: string,
    title: string,
    description?: string,
    isComplete: boolean
}

export interface CreateTodoCommand{
    title: string,
    description?: string,
}

export interface UpdateTodoItemDto{
    title: string,
    description?: string,
    isComplete: boolean
}
