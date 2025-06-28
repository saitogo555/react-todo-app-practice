export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TodoInput {
  title: string;
  description?: string;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ApiError {
  error: string;
  code: number;
}
