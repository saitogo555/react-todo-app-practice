import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

// ヘッダーコンポーネント
export const Header = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ・タイトル */}
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-tasks text-2xl text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Todo App
            </h1>
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-list mr-2" />
              一覧
            </Link>
            <Link
              to="/add"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/add') 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-plus mr-2" />
              追加
            </Link>

            {/* ダークモード切り替えボタン */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md transition-all duration-200 ${
                isDark 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              title={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} transition-transform duration-200 ${isDark ? 'rotate-45' : ''}`} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// フッターコンポーネント
export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 Todo App. Built with React & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

// メインレイアウトコンポーネント
export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// ページタイトルコンポーネント
export const PageTitle = ({ title, subtitle, icon, children }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            {icon && (
              <i className={`${icon} text-2xl text-blue-600 dark:text-blue-400`} />
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center space-x-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

// カードコンポーネント
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// エラー表示コンポーネント
export const ErrorMessage = ({ error, onRetry, className = '' }) => {
  return (
    <Card className={`p-6 text-center ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <i className="fas fa-exclamation-circle text-4xl text-red-500" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          エラーが発生しました
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {error?.message || 'データの取得に失敗しました'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-redo mr-2" />
            再試行
          </button>
        )}
      </div>
    </Card>
  );
};

// 空の状態表示コンポーネント
export const EmptyState = ({ 
  icon = 'fas fa-inbox',
  title = 'データがありません',
  description,
  action,
  className = ''
}) => {
  return (
    <Card className={`p-8 text-center ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <i className={`${icon} text-6xl text-gray-400 dark:text-gray-600`} />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 max-w-sm">
            {description}
          </p>
        )}
        {action}
      </div>
    </Card>
  );
};
