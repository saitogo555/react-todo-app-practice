import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

// モーダルコンポーネント
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* バックドロップ */}
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" aria-hidden="true" />
      
      {/* モーダルコンテナ */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className={`w-full ${sizes[size]} bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
          {title && (
            <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white p-6 pb-0">
              {title}
            </DialogTitle>
          )}
          <div className="p-6">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

// 確認ダイアログコンポーネント
export const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '確認',
  message,
  confirmText = '確認',
  cancelText = 'キャンセル',
  variant = 'danger'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const buttonVariants = {
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${
          variant === 'danger' ? 'bg-red-100 dark:bg-red-900' :
          variant === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
          'bg-blue-100 dark:bg-blue-900'
        }`}>
          <i className={`text-xl ${
            variant === 'danger' ? 'fas fa-exclamation-triangle text-red-600 dark:text-red-400' :
            variant === 'warning' ? 'fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400' :
            'fas fa-question-circle text-blue-600 dark:text-blue-400'
          }`} />
        </div>
        
        <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {title}
        </DialogTitle>
        
        {message && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {message}
          </p>
        )}
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonVariants[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ローディングスピナーコンポーネント
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <i className={`fas fa-spinner fa-spin text-blue-600 dark:text-blue-400 ${sizes[size]}`} />
    </div>
  );
};

// ページローディングコンポーネント
export const PageLoading = ({ message = '読み込み中...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
};

// スケルトンローディングコンポーネント
export const SkeletonLoader = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full mb-2"></div>
      <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-1/2"></div>
    </div>
  );
};

// ToDoアイテム用スケルトン
export const TodoSkeleton = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 animate-pulse bg-white dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="flex items-center space-x-4">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-full w-12"></div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};
