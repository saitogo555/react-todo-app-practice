import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../api/todoApi';
import { useToast } from '../hooks/useToast';
import { Layout, PageTitle, ErrorMessage } from '../components/layout/Layout';
import { TodoForm } from '../components/todo/TodoForm';

export const AddTodoPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await createTodo(formData);
      showSuccess('ToDoを作成しました');
      navigate('/');
    } catch (err) {
      showError(err.message || 'ToDoの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Layout>
      <PageTitle 
        title="新しいToDoを追加" 
        icon="fas fa-plus"
        subtitle="新しいタスクを作成しましょう" 
      />

      <div className="max-w-2xl mx-auto">
        {/* ToDoフォーム */}
        <TodoForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          submitText="ToDoを作成"
          mode="create"
        />
      </div>
    </Layout>
  );
};
