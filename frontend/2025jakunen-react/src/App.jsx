import { Routes, Route } from 'react-router-dom';
import { useToast } from './hooks/useToast';
import { ToastContainer } from './components/ui/Toast';
import { TodoListPage } from './pages/TodoListPage';
import { AddTodoPage } from './pages/AddTodoPage';
import { EditTodoPage } from './pages/EditTodoPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/add" element={<AddTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      {/* トースト通知 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
