# API仕様書

このプロジェクトのAPI仕様書は **API Blueprint** 形式で文書化されています。

## 概要

ToDoアプリケーション用のRESTful APIで、以下の機能を提供します：

- **ToDo一覧取得** (`GET /api/todos`)
- **ToDo作成** (`POST /api/todos`)
- **ToDo更新** (`PUT /api/todos/{id}`)
- **ToDo削除** (`DELETE /api/todos/{id}`)
- **ToDo完了状態設定** (`PUT /api/todos/{id}/complete`)
- **ToDo未完了状態設定** (`PUT /api/todos/{id}/uncomplete`)

## ファイル構成

- `api.apib` - API Blueprint形式の仕様書ソース
- `api.html` - 生成されたHTML仕様書
- `package.json` - aglio関連の設定とスクリプト

## 仕様書のビルドとプレビュー

### 事前準備

依存関係をインストールします：

```bash
npm install
```

### ビルド

API Blueprint（`api.apib`）からHTMLファイルを生成します：

```bash
npm run build
```

このコマンドは`api.apib`を読み込み、スタイル付きのHTML仕様書`api.html`を生成します。

### プレビュー

リアルタイムで仕様書をプレビューできます：

```bash
npm run serve
```

このコマンドは以下の機能を提供します：

- Webサーバーを起動
- `api.apib`の変更を監視して自動リロード
- ブラウザで`http://localhost:5000`にアクセスして確認

### 利用ツール

- **Aglio** - API BlueprintをHTML形式の美しいドキュメントに変換するツール
- サポートされる機能：

  - 構文ハイライト付きのコード例
  - レスポンシブデザイン
  - ナビゲーション機能
  - カスタムスタイル対応
