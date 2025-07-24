import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTodos, updateTodo } from '../api/todoApi';
import { useToast } from '../hooks/useToast';
import { Layout, PageTitle, ErrorMessage } from '../components/layout/Layout';
import { TodoForm } from '../components/todo/TodoForm';
import { PageLoading } from '../components/ui/Modal';

export const EditTodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useToast();

  // ToDoデータを取得
  useEffect(() => {
    const loadTodo = async () => {
      try {
        setLoading(true);
        setError(null);
        // 全ToDoを取得してIDで該当するものを探す
        const todos = await fetchTodos();
        const foundTodo = todos.find(todo => todo.id === parseInt(id));
        if (foundTodo) {
          setTodo(foundTodo);
        } else {
          throw new Error('ToDoが見つかりません');
        }
      } catch (err) {
        setError(err);
        showError(err.message || 'ToDoの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTodo();
    }
  }, [id, showError]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      await updateTodo(id, formData);
      showSuccess('ToDoを更新しました');
      navigate('/');
    } catch (err) {
      showError(err.message || 'ToDoの更新に失敗しました');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const retry = () => {
    setError(null);
    setLoading(true);
    // useEffectが再実行される
  };

  // ローディング中
  if (loading) {
    return (
      <Layout>
        <PageTitle 
          title="ToDoを編集" 
          icon="fas fa-edit"
          subtitle="タスクの内容を変更しましょう" 
        />
        <PageLoading message="ToDoを読み込み中..." />
      </Layout>
    );
  }

  // エラー時
  if (error) {
    return (
      <Layout>
        <PageTitle 
          title="ToDoを編集" 
          icon="fas fa-edit"
          subtitle="タスクの内容を変更しましょう" 
        />
        <div className="max-w-2xl mx-auto">
          <ErrorMessage error={error} onRetry={retry} />
        </div>
      </Layout>
    );
  }

  // ToDoが見つからない場合
  if (!todo) {
    return (
      <Layout>
        <PageTitle 
          title="ToDoを編集" 
          icon="fas fa-edit"
          subtitle="タスクの内容を変更しましょう" 
        />
        <div className="max-w-2xl mx-auto">
          <ErrorMessage 
            error={{ message: '指定されたToDoが見つかりません' }} 
            onRetry={() => navigate('/')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTitle 
        title="ToDoを編集" 
        icon="fas fa-edit"
        subtitle={`「${todo.title}」を編集しています`}
      />

      <div className="max-w-2xl mx-auto">
        <TodoForm
          todo={todo}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={submitLoading}
          submitText="ToDoを更新"
          mode="edit"
        />
      </div>
    </Layout>
  );
};
