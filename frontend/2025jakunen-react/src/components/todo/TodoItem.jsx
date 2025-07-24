import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import { Button } from '../ui/FormElements';
import { ConfirmDialog } from '../ui/Modal';

// 単一のToDoアイテムコンポーネント
export const TodoItem = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onSelect, 
  isSelected = false,
  showSelection = false,
  loading = false
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = () => {
    if (!loading) {
      onToggle(todo.id, !todo.completed);
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(todo.id, !isSelected);
    }
  };

  return (
    <>
      <div className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all hover:shadow-md ${
        todo.completed ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* 選択チェックボックス */}
            {showSelection && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleSelect}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"
              />
            )}

            {/* 完了チェックボックス */}
            <button
              onClick={handleToggle}
              disabled={loading}
              className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin text-xs" />
              ) : todo.completed ? (
                <i className="fas fa-check text-xs" />
              ) : null}
            </button>

            {/* ToDoコンテンツ */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-medium transition-colors ${
                todo.completed 
                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {todo.title}
              </h3>
              
              {todo.description && (
                <p className={`mt-1 text-sm transition-colors ${
                  todo.completed 
                    ? 'text-gray-400 dark:text-gray-500 line-through' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {todo.description}
                </p>
              )}
              
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span>
                  <i className="fas fa-clock mr-1" />
                  作成: {formatDate(todo.created_at)}
                </span>
                {todo.updated_at !== todo.created_at && (
                  <span>
                    <i className="fas fa-edit mr-1" />
                    更新: {formatDate(todo.updated_at)}
                  </span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  todo.completed 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {todo.completed ? '完了' : '未完了'}
                </span>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center space-x-2 ml-4">
            <Link
              to={`/edit/${todo.id}`}
              className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="編集"
            >
              <i className="fas fa-edit" />
            </Link>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="削除"
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>

      {/* 削除確認ダイアログ */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="ToDoを削除"
        message={`「${todo.title}」を削除してもよろしいですか？この操作は取り消せません。`}
        confirmText="削除"
        variant="danger"
      />
    </>
  );
};

// ToDoリストコンポーネント
export const TodoList = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onSelect,
  selectedIds = [],
  showSelection = false,
  loading = false
}) => {
  if (!todos.length) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-clipboard-list text-6xl text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          ToDoがありません
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          新しいToDoを追加して始めましょう
        </p>
        <Link
          to="/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2" />
          ToDoを追加
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onSelect={onSelect}
          isSelected={selectedIds.includes(todo.id)}
          showSelection={showSelection}
          loading={loading}
        />
      ))}
    </div>
  );
};

// フィルター・検索・ソートコンポーネント
export const TodoFilters = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  totalCount,
  filteredCount,
  selectedCount = 0,
  showSelection = false,
  onToggleSelection,
  onExportJson,
  onExportCsv,
  onBulkComplete,
  onBulkDelete,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="space-y-4">
      {/* 検索バー */}
      <div className="relative">
        <input
          type="text"
          placeholder="タイトルや説明で検索..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* フィルター・ソート・アクション */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* フィルター */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">フィルター:</span>
            <select
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">すべて</option>
              <option value="incomplete">未完了</option>
              <option value="completed">完了</option>
            </select>
          </div>

          {/* ソート */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">並び替え:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="created_at">作成日時</option>
              <option value="updated_at">更新日時</option>
              <option value="title">タイトル</option>
              <option value="completed">完了状態</option>
            </select>
            <button
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              title={sortOrder === 'asc' ? '降順にする' : '昇順にする'}
            >
              <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`} />
            </button>
          </div>

          {/* 件数表示 */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCount} / {totalCount} 件
            {selectedCount > 0 && (
              <span className="ml-2 text-blue-600 dark:text-blue-400">
                ({selectedCount} 件選択中)
              </span>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex items-center space-x-2">
          {/* 一括選択切り替え */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleSelection}
            className="text-xs"
          >
            <i className={`fas ${showSelection ? 'fa-times' : 'fa-check-square'} mr-1`} />
            {showSelection ? '選択終了' : '一括選択'}
          </Button>

          {/* 一括操作（選択モード時のみ表示） */}
          {showSelection && selectedCount > 0 && (
            <>
              <Button
                variant="success"
                size="sm"
                onClick={onBulkComplete}
                className="text-xs"
              >
                <i className="fas fa-check mr-1" />
                一括完了
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={onBulkDelete}
                className="text-xs"
              >
                <i className="fas fa-trash mr-1" />
                一括削除
              </Button>
            </>
          )}

          {/* エクスポート */}
          <div className="relative" ref={exportMenuRef}>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <i className="fas fa-download mr-1" />
              エクスポート
              <i className={`fas fa-chevron-${showExportMenu ? 'up' : 'down'} ml-1`} />
            </Button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 min-w-[140px]">
                <button
                  onClick={() => {
                    onExportJson();
                    setShowExportMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-md"
                >
                  <i className="fas fa-file-code mr-2" />
                  JSON形式
                </button>
                <button
                  onClick={() => {
                    onExportCsv();
                    setShowExportMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-md"
                >
                  <i className="fas fa-file-csv mr-2" />
                  CSV形式
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
