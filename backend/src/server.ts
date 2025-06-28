import { serve } from '@hono/node-server';
import app from './index';

const port = parseInt(process.env.PORT ?? '3001');

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 ToDo API Server is running on http://localhost:${port}`);
