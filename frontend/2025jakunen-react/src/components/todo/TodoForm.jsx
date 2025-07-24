import { useState } from 'react';
import { Input, Textarea, Button, Checkbox } from '../ui/FormElements';
import { Card } from '../layout/Layout';

// ToDoフォームコンポーネント
export const TodoForm = ({ 
  todo = null, 
  onSubmit, 
  onCancel, 
  loading = false,
  submitText = 'ToDoを作成',
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    completed: todo?.completed || false,
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'タイトルは100文字以内で入力してください';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = '説明は500文字以内で入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
    };
    
    // 編集モードの場合は完了状態も含める
    if (mode === 'edit') {
      submitData.completed = formData.completed;
    }
    
    onSubmit(submitData);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* タイトル */}
        <Input
          label="タイトル"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          required
          placeholder="ToDoのタイトルを入力してください"
          maxLength={100}
        />

        {/* 説明 */}
        <Textarea
          label="説明"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
          placeholder="ToDoの詳細説明を入力してください（省略可）"
          rows={4}
          maxLength={500}
        />

        {/* 完了状態（編集モードのみ） */}
        {mode === 'edit' && (
          <Checkbox
            label="完了済み"
            checked={formData.completed}
            onChange={(e) => handleChange('completed', e.target.checked)}
          />
        )}

        {/* 文字数カウンター */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>タイトル: {formData.title.length}/100文字</span>
          <span>説明: {formData.description.length}/500文字</span>
        </div>

        {/* ボタン */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            <i className="fas fa-times mr-2" />
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!formData.title.trim()}
          >
            <i className={`fas ${mode === 'edit' ? 'fa-save' : 'fa-plus'} mr-2`} />
            {submitText}
          </Button>
        </div>
      </form>
    </Card>
  );
};

// フォームプリビューコンポーネント（入力内容をプレビュー）
export const TodoPreview = ({ formData }) => {
  if (!formData.title.trim()) {
    return null;
  }

  return (
    <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
        <i className="fas fa-eye mr-2" />
        プレビュー
      </h3>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded mt-1"></div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {formData.title}
            </h4>
            {formData.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {formData.description}
              </p>
            )}
            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>
                <i className="fas fa-clock mr-1" />
                作成: たった今
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                未完了
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
