import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { todos } from './routes/todos';

const app = new Hono();

// CORS設定
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // フロントエンド用
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type'],
}));

// ヘルスチェック
app.get('/', (c) => {
  return c.json({
    message: 'ToDo API Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.route('/api/todos', todos);

// 404ハンドラー
app.notFound((c) => {
  return c.json({
    error: 'エンドポイントが見つかりません',
    code: 404
  }, 404);
});

// エラーハンドラー
app.onError((err, c) => {
  console.error('サーバーエラー:', err);
  return c.json({
    error: 'サーバー内部エラーが発生しました',
    code: 500
  }, 500);
});

const port = parseInt(process.env.PORT ?? '3001');

console.log(`🔄 ToDo API Server is starting on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
