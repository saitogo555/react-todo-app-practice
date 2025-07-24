// 日付フォーマット関数
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return 'たった今';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  } else if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  } else if (diffInDays < 7) {
    return `${diffInDays}日前`;
  } else {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

// JSON形式でデータをエクスポート
export const exportToJson = (data, filename = 'todos.json') => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// CSV形式でデータをエクスポート
export const exportToCsv = (data, filename = 'todos.csv') => {
  const headers = ['ID', 'タイトル', '説明', '完了状態', '作成日時', '更新日時'];
  const csvContent = [
    headers.join(','),
    ...data.map(todo => [
      todo.id,
      `"${todo.title.replace(/"/g, '""')}"`,
      `"${(todo.description || '').replace(/"/g, '""')}"`,
      todo.completed ? '完了' : '未完了',
      new Date(todo.created_at).toLocaleString('ja-JP'),
      new Date(todo.updated_at).toLocaleString('ja-JP'),
    ].join(','))
  ].join('\n');

  const BOM = '\uFEFF'; // UTF-8 BOM for Excel compatibility
  const dataBlob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ToDoをフィルタリング
export const filterTodos = (todos, filter, searchQuery) => {
  let filtered = todos;

  // ステータスでフィルタリング
  if (filter === 'completed') {
    filtered = filtered.filter(todo => todo.completed);
  } else if (filter === 'incomplete') {
    filtered = filtered.filter(todo => !todo.completed);
  }

  // 検索クエリでフィルタリング
  if (searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(query) ||
      (todo.description && todo.description.toLowerCase().includes(query))
    );
  }

  return filtered;
};

// ToDoをソート
export const sortTodos = (todos, sortBy, sortOrder = 'asc') => {
  const sorted = [...todos].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'created_at':
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
        break;
      case 'updated_at':
        aValue = new Date(a.updated_at);
        bValue = new Date(b.updated_at);
        break;
      case 'completed':
        aValue = a.completed ? 1 : 0;
        bValue = b.completed ? 1 : 0;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return sorted;
};

// ローカルストレージ関連のユーティリティ
export const localStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage書き込みエラーを無視
    }
  },
  
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // localStorage削除エラーを無視
    }
  }
};
