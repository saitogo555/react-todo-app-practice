const API_BASE_URL = 'http://localhost:3001/api';

// APIエラーハンドリング用のクラス
export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// レスポンスハンドラー
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'ネットワークエラーが発生しました';
    let errorCode = response.status;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
      errorCode = errorData.code || errorCode;
    } catch {
      // JSONパースエラーの場合はデフォルトメッセージを使用
    }
    
    throw new ApiError(errorMessage, response.status, errorCode);
  }
  
  // 204 No Contentの場合はボディなし
  if (response.status === 204) {
    return null;
  }
  
  return await response.json();
};

// ToDoリストを取得
export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  return handleResponse(response);
};

// 新しいToDoを作成
export const createTodo = async (todoData) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  return handleResponse(response);
};

// 特定のToDoを取得
export const fetchTodoById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  return handleResponse(response);
};

// ToDoを更新
export const updateTodo = async (id, updateData) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  return handleResponse(response);
};

// ToDoを削除
export const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ToDoを完了状態にする
export const completeTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/complete`, {
    method: 'PUT',
  });
  return handleResponse(response);
};

// ToDoを未完了状態にする
export const uncompleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/uncomplete`, {
    method: 'PUT',
  });
  return handleResponse(response);
};
