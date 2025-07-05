import { serve } from "@hono/node-server";
import app from "./index";

serve({
  fetch: app.fetch,
  port: app.port,
});

console.log(`🚀 ToDo API Server is running on http://localhost:${app.port}`);
