export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface TodoInput {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: TodoInput }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; title: string } };
