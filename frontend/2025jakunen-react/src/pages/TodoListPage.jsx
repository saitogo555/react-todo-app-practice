import { useState, useEffect } from 'react';
import { fetchTodos, completeTodo, uncompleteTodo, deleteTodo } from '../api/todoApi';
import { filterTodos, sortTodos, exportToJson, exportToCsv } from '../utils/helpers';
import { useToast } from '../hooks/useToast';
import { Layout, PageTitle, ErrorMessage } from '../components/layout/Layout';
import { TodoList, TodoFilters } from '../components/todo/TodoItem';
import { TodoSkeleton, PageLoading } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/Modal';

export const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // フィルター・検索・ソート状態（直接localStorage使用）
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem('todoFilter') || 'all';
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('todoSearch') || '';
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem('todoSortBy') || 'created_at';
  });
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem('todoSortOrder') || 'desc';
  });
  
  // 一括操作状態
  const [showSelection, setShowSelection] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  
  const { showSuccess, showError } = useToast();

  // フィルター値が変更されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('todoFilter', filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem('todoSearch', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('todoSortBy', sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem('todoSortOrder', sortOrder);
  }, [sortOrder]);

  // ToDoリストを取得
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos();
      setTodos(data || []);
    } catch (err) {
      setError(err);
      showError(err.message || 'ToDoリストの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 初回読み込み
  useEffect(() => {
    const loadInitialTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTodos();
        setTodos(data || []);
      } catch (err) {
        setError(err);
        showError(err.message || 'ToDoリストの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 初回のみ実行

  // 完了状態切り替え
  const handleToggle = async (id, completed) => {
    try {
      setActionLoading(true);
      const updatedTodo = completed 
        ? await completeTodo(id) 
        : await uncompleteTodo(id);
      
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      
      showSuccess(`ToDoを${completed ? '完了' : '未完了'}にしました`);
    } catch (err) {
      showError(err.message || '状態の更新に失敗しました');
    } finally {
      setActionLoading(false);
    }
  };

  // 削除
  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      showSuccess('ToDoを削除しました');
    } catch (err) {
      showError(err.message || '削除に失敗しました');
    } finally {
      setActionLoading(false);
    }
  };

  // 一括選択
  const handleSelect = (id, selected) => {
    setSelectedIds(prev => 
      selected 
        ? [...prev, id]
        : prev.filter(todoId => todoId !== id)
    );
  };

  // 一括完了
  const handleBulkComplete = async () => {
    try {
      setActionLoading(true);
      const completionPromises = selectedIds.map(id => completeTodo(id));
      const updatedTodos = await Promise.all(completionPromises);
      
      setTodos(prev => prev.map(todo => {
        const updated = updatedTodos.find(updated => updated.id === todo.id);
        return updated || todo;
      }));
      
      setSelectedIds([]);
      showSuccess(`${selectedIds.length}件のToDoを完了にしました`);
    } catch (err) {
      showError(err.message || '一括完了に失敗しました');
    } finally {
      setActionLoading(false);
    }
  };

  // 一括削除
  const handleBulkDelete = async () => {
    try {
      setActionLoading(true);
      const deletePromises = selectedIds.map(id => deleteTodo(id));
      await Promise.all(deletePromises);
      
      setTodos(prev => prev.filter(todo => !selectedIds.includes(todo.id)));
      setSelectedIds([]);
      setShowBulkDeleteConfirm(false);
      showSuccess(`${selectedIds.length}件のToDoを削除しました`);
    } catch (err) {
      showError(err.message || '一括削除に失敗しました');
    } finally {
      setActionLoading(false);
    }
  };

  // エクスポート
  const handleExportJson = () => {
    exportToJson(filteredAndSortedTodos, 'todos.json');
    showSuccess('JSONファイルをダウンロードしました');
  };

  const handleExportCsv = () => {
    exportToCsv(filteredAndSortedTodos, 'todos.csv');
    showSuccess('CSVファイルをダウンロードしました');
  };

  // フィルタリング・ソート処理
  const filteredAndSortedTodos = sortTodos(
    filterTodos(todos, filter, searchQuery),
    sortBy,
    sortOrder
  );

  // ローディング中
  if (loading) {
    return (
      <Layout>
        <PageTitle 
          title="ToDoリスト" 
          icon="fas fa-list"
          subtitle="あなたのタスクを管理しましょう" 
        />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <TodoSkeleton key={i} />
          ))}
        </div>
      </Layout>
    );
  }

  // エラー時
  if (error) {
    return (
      <Layout>
        <PageTitle 
          title="ToDoリスト" 
          icon="fas fa-list"
          subtitle="あなたのタスクを管理しましょう" 
        />
        <ErrorMessage error={error} onRetry={loadTodos} />
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTitle 
        title="ToDoリスト" 
        icon="fas fa-list"
        subtitle="あなたのタスクを管理しましょう"
      />

      {/* フィルター・検索・ソート */}
      <div className="mb-6">
        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          totalCount={todos.length}
          filteredCount={filteredAndSortedTodos.length}
          selectedCount={selectedIds.length}
          showSelection={showSelection}
          onToggleSelection={() => {
            setShowSelection(!showSelection);
            setSelectedIds([]);
          }}
          onExportJson={handleExportJson}
          onExportCsv={handleExportCsv}
          onBulkComplete={handleBulkComplete}
          onBulkDelete={() => setShowBulkDeleteConfirm(true)}
        />
      </div>

      {/* ToDoリスト */}
      <TodoList
        todos={filteredAndSortedTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onSelect={handleSelect}
        selectedIds={selectedIds}
        showSelection={showSelection}
        loading={actionLoading}
      />

      {/* 一括削除確認ダイアログ */}
      <ConfirmDialog
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={handleBulkDelete}
        title="一括削除の確認"
        message={`選択した${selectedIds.length}件のToDoを削除してもよろしいですか？この操作は取り消せません。`}
        confirmText="削除"
        variant="danger"
      />
    </Layout>
  );
};
