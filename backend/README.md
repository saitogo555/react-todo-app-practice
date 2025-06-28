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

詳細なAPI仕様は `../docs/api-docs.apib` または `../docs/api-docs.html` を参照してください。

### エンドポイント

- `GET /api/todos` - ToDo一覧取得
- `POST /api/todos` - 新しいToDo作成
- `PUT /api/todos/:id` - ToDo更新（タイトル、説明、完了状態の変更）
- `DELETE /api/todos/:id` - ToDo削除
- `PUT /api/todos/:id/complete` - 指定したToDoを完了状態にする
- `PUT /api/todos/:id/uncomplete` - 指定したToDoを未完了状態にする

## セットアップ

### ローカル開発

#### 1. 依存関係のインストール

```bash
npm install
```

#### 2. データベースの初期化

```bash
# Prismaクライアント生成
npm run db:generate

# データベーススキーマの適用
npm run db:push
```

#### 3. 開発サーバーの起動

```bash
npm run dev
```

サーバーは `http://localhost:3001` で起動します。

### Docker環境

#### 1. Docker Composeで起動

```bash
# バックグラウンドで起動
npm run docker:up

# または直接コマンド実行
docker compose up -d
```

#### 2. ログの確認

```bash
# アプリケーションログを確認
npm run docker:logs

# または直接コマンド実行
docker compose logs -f todo-backend
```

#### 3. Prisma Studioの起動（オプション）

```bash
# Prisma Studioを起動
npm run docker:studio

# ブラウザで http://localhost:5555 にアクセス
```

#### 4. 停止

```bash
# コンテナを停止・削除
npm run docker:down

# または直接コマンド実行
docker compose down
```

#### Docker単体での実行

```bash
# イメージをビルド
npm run docker:build

# コンテナを実行
npm run docker:run
```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバー起動（ファイル変更を監視）
- `npm run build` - プロダクション用ビルド
- `npm start` - プロダクションサーバー起動
- `npm run db:generate` - Prismaクライアント生成
- `npm run db:push` - データベーススキーマ適用
- `npm run db:migrate` - マイグレーション実行
- `npm run db:studio` - Prisma Studio起動

## データベース

SQLiteを使用しており、データベースファイルは `prisma/dev.db` に作成されます。

### スキーマ

```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt

  @@map("todos")
}
```

## 環境変数

`.env` ファイルで以下の変数を設定できます：

```env
PORT=3001
DATABASE_URL="file:./dev.db"
NODE_ENV=development
```

## CORS設定

フロントエンドアプリケーション（React等）からのアクセスを許可するため、以下のオリジンでCORSが設定されています：

- `http://localhost:3000`
- `http://localhost:5173`

## エラーハンドリング

APIは適切なHTTPステータスコードとエラーメッセージを返します：

- `400 Bad Request` - リクエストデータが無効
- `404 Not Found` - リソースが見つからない
- `500 Internal Server Error` - サーバー内部エラー

## ログ

サーバーエラーはコンソールに出力されます。本番環境では適切なログ管理システムを使用することを推奨します。

## Docker環境について

### 特徴

- **マルチステージビルド**: 最適化されたイメージサイズ
- **非rootユーザー**: セキュリティを考慮した実行環境
- **ヘルスチェック**: コンテナの健全性監視
- **永続化ボリューム**: データベースファイルの永続化
- **ネットワーク分離**: 専用ネットワークによる分離

### 環境変数

Docker環境では `.env.docker` ファイルを参考に環境変数を設定できます：

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=file:./dev.db
LOG_LEVEL=info
```

### データの永続化

SQLiteデータベースファイルは名前付きボリューム `todo_db_data` に保存され、コンテナを削除しても保持されます。

### ポート構成

- **3001**: Todo API サーバー
- **5555**: Prisma Studio（`--profile studio`使用時）

### トラブルシューティング

#### コンテナが起動しない場合

```bash
# ログを確認
docker compose logs todo-backend

# コンテナの状態を確認
docker compose ps
```

#### データベースをリセットしたい場合

```bash
# ボリュームも含めて削除
docker compose down -v

# 再起動
docker compose up -d
```
