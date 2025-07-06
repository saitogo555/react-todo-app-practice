# ToDo API Backend

TypeScript、Hono、SQLite、PrismaでToDoアプリケーション用のRESTful APIを実装したバックエンドです。

## 技術スタック

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Hono
- **Database**: SQLite
- **ORM**: Prisma
- **Dev Tools**: tsx (TypeScript Executor)

## API仕様

詳細なAPI仕様は`../docs/api.apib`または`../docs/api.html`を参照してください。

### エンドポイント

- `GET /api/todos` - ToDo一覧取得
- `POST /api/todos` - 新しいToDo作成
- `PUT /api/todos/:id` - ToDo更新（タイトル、説明、完了状態の変更）
- `DELETE /api/todos/:id` - ToDo削除
- `PUT /api/todos/:id/complete` - ToDoを完了状態にする
- `PUT /api/todos/:id/uncomplete` - ToDoを未完了状態にする

## セットアップ

APIを動作させるためのセットアップ手順になります。

### 手順

1. **依存関係のインストール**

   ```bash
   npm install
   ```

2. **サーバーの起動**

   ```bash
   npm start
   ```


サーバーは`http://localhost:3001`で起動し、APIエンドポイントが利用可能になります。

## 開発

開発環境では、ファイル変更の監視と自動再起動が有効になります。

### 手順

1. **依存関係のインストール**

   ```bash
   npm install
   ```

2. **データベース初期化**

   ```bash
   npm run db:init
   ```

3. **サーバーの起動**

   ```bash
   npm run dev
   ```

### 利用可能な開発用スクリプト

- `npm run dev` - 開発サーバー起動（ファイル変更を監視）
- `npm run build` - プロダクション用ビルド
- `npm run db:init` - データベースの初期化
- `npm run db:generate` - Prismaクライアント生成
- `npm run db:push` - データベーススキーマ適用
- `npm run db:migrate` - マイグレーション実行
- `npm run db:studio` - Prisma Studio起動（データベースGUI）
- `npm run db:seed` - ダミーデータの挿入

### ダミーデータの挿入

開発やテスト用にダミーデータを挿入できます。

```bash
npm run db:seed
```

このコマンドを実行すると：

- 既存のToDoデータがすべて削除されます
- Fakerライブラリを使用して10件のダミーToDoが挿入されます
- ランダムなタイトル、説明、完了状態、作成日時が生成されます

ダミーデータの件数は`prisma/seed.ts`ファイルの`DATA_COUNT`定数で変更可能です。

### データベース

SQLiteを使用しており、データベースファイルは `prisma/dev.db` に作成されます。

#### スキーマ

```prisma
model Todo {
  id          String   @id @default(uuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt

  @@map("todos")
}
```
