import { Hono } from "hono";
import { prisma } from "../lib/db";
import { TodoInput, TodoUpdate } from "../types/todo";

const todos = new Hono();

// GET /api/todos - ToDo一覧を取得
todos.get("/", async (c) => {
  try {
    const allTodos = await prisma.todo.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return c.json(allTodos);
  } catch (error) {
    console.error("ToDo一覧取得エラー:", error);
    return c.json(
      {
        error: "サーバーエラーが発生しました",
        code: 500,
      },
      500
    );
  }
});

// GET /api/todos/:id - 個別のToDoを取得
todos.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    if (!id || id.trim() === "") {
      return c.json(
        {
          error: "無効なIDです",
          code: 400,
        },
        400
      );
    }

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return c.json(
        {
          error: "指定されたToDoが見つかりません",
          code: 404,
        },
        404
      );
    }

    return c.json(todo);
  } catch (error) {
    console.error("ToDo取得エラー:", error);
    return c.json(
      {
        error: "ToDoの取得に失敗しました",
        code: 500,
      },
      500
    );
  }
});

// POST /api/todos - 新しいToDoを作成
todos.post("/", async (c) => {
  try {
    const body = await c.req.json<TodoInput>();

    // バリデーション
    if (!body.title || body.title.trim() === "") {
      return c.json(
        {
          error: "タイトルは必須です",
          code: 400,
        },
        400
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        title: body.title.trim(),
        description: body.description?.trim() || null,
      },
    });

    return c.json(newTodo, 201);
  } catch (error) {
    console.error("ToDo作成エラー:", error);
    return c.json(
      {
        error: "ToDoの作成に失敗しました",
        code: 500,
      },
      500
    );
  }
});

// PUT /api/todos/:id - ToDoを更新
todos.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    if (!id || id.trim() === "") {
      return c.json(
        {
          error: "無効なIDです",
          code: 400,
        },
        400
      );
    }

    const body = await c.req.json<TodoUpdate>();

    // 既存のToDoが存在するかチェック
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return c.json(
        {
          error: "指定されたToDoが見つかりません",
          code: 404,
        },
        404
      );
    }

    // 更新データの準備
    const updateData: any = {};
    if (body.title !== undefined) {
      if (body.title.trim() === "") {
        return c.json(
          {
            error: "タイトルは空にできません",
            code: 400,
          },
          400
        );
      }
      updateData.title = body.title.trim();
    }
    if (body.description !== undefined) {
      updateData.description = body.description?.trim() || null;
    }
    if (body.completed !== undefined) {
      updateData.completed = body.completed;
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });

    return c.json(updatedTodo);
  } catch (error) {
    console.error("ToDo更新エラー:", error);
    return c.json(
      {
        error: "ToDoの更新に失敗しました",
        code: 500,
      },
      500
    );
  }
});

// DELETE /api/todos/:id - ToDoを削除
todos.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    if (!id || id.trim() === "") {
      return c.json(
        {
          error: "無効なIDです",
          code: 400,
        },
        400
      );
    }

    // 既存のToDoが存在するかチェック
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return c.json(
        {
          error: "指定されたToDoが見つかりません",
          code: 404,
        },
        404
      );
    }

    await prisma.todo.delete({
      where: { id },
    });

    return c.body(null, 204);
  } catch (error) {
    console.error("ToDo削除エラー:", error);
    return c.json(
      {
        error: "ToDoの削除に失敗しました",
        code: 500,
      },
      500
    );
  }
});

// PUT /api/todos/:id/complete - ToDoを完了状態にする
todos.put("/:id/complete", async (c) => {
  try {
    const id = c.req.param("id");

    if (!id || id.trim() === "") {
      return c.json(
        {
          error: "無効なIDです",
          code: 400,
        },
        400
      );
    }

    // 既存のToDoが存在するかチェック
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return c.json(
        {
          error: "指定されたToDoが見つかりません",
          code: 404,
        },
        404
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed: true },
    });

    return c.json(updatedTodo);
  } catch (error) {
    console.error("ToDo完了処理エラー:", error);
    return c.json(
      {
        error: "ToDoの完了処理に失敗しました",
        code: 500,
      },
      500
    );
  }
});

// PUT /api/todos/:id/uncomplete - ToDoを未完了状態にする
todos.put("/:id/uncomplete", async (c) => {
  try {
    const id = c.req.param("id");

    if (!id || id.trim() === "") {
      return c.json(
        {
          error: "無効なIDです",
          code: 400,
        },
        400
      );
    }

    // 既存のToDoが存在するかチェック
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return c.json(
        {
          error: "指定されたToDoが見つかりません",
          code: 404,
        },
        404
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed: false },
    });

    return c.json(updatedTodo);
  } catch (error) {
    console.error("ToDo未完了処理エラー:", error);
    return c.json(
      {
        error: "ToDoの未完了処理に失敗しました",
        code: 500,
      },
      500
    );
  }
});

export { todos };
