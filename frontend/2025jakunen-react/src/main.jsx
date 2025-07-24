import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// ダークモードの初期化
const initializeDarkMode = () => {
  try {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedDarkMode !== null ? savedDarkMode : prefersDark;
    
    // 初期状態でクラスを設定
    document.documentElement.classList.remove('dark');
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    
    // bodyの背景色も即座に適用
    document.body.className = isDark 
      ? 'bg-gray-900 transition-colors duration-200' 
      : 'bg-gray-50 transition-colors duration-200';
  } catch {
    // エラーが発生した場合はシステム設定に従う
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.remove('dark');
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
    document.body.className = prefersDark 
      ? 'bg-gray-900 transition-colors duration-200' 
      : 'bg-gray-50 transition-colors duration-200';
  }
};

// アプリケーション起動前にダークモードを初期化
initializeDarkMode();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);