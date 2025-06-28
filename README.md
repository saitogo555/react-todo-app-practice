# React学習者向けのToDoアプリケーション制作課題

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## プロジェクト概要

このプロジェクトは、React学習者のための実践的なToDoアプリケーション制作課題です。

- **フロントエンド**: 若年者ものづくり競技大会ウェブデザイン職種と同様の環境（CDN・ZIP配布形式）
- **バックエンド**: HonoとPrismaを使用したモダンなAPIサーバー
- **データベース**: SQLiteを使用した軽量なデータ永続化

## アーキテクチャ

```text
react-todo-test/
├── frontend/           # フロントエンド（CDN・ZIP配布）
│   ├── lib/            # Bootstrap, Tailwind, FontAwesome
│   ├── fonts/          # 日本語フォント（BIZ UDPGothic, Noto Sans JP等）
│   └── react.zip       # React関連ライブラリ
├── backend/            # APIサーバー（Hono + Prisma）
│   ├── src/            # TypeScriptソースコード
│   ├── prisma/         # データベーススキーマ・マイグレーション
│   └── scripts/        # 初期化スクリプト
└── docs/               # API仕様書（API Blueprint）
```

## セットアップ

### 1. 必要な環境

- **Node.js** 18.0.0 以上
- **npm** または **bun**
- **Git**
- **Docker**（Docker環境を使用する場合）

### 2. プロジェクトのクローン

```bash
git clone https://github.com/saitogo555/react-todo-app-practice
cd react-todo-app-practice
```

### 3. バックエンドのセットアップ

#### npm/bunを使用する場合

```bash
cd backend

# 依存関係のインストール
npm install

# APIサーバーの起動（http://localhost:3001）
npm run start
```

#### Dockerを使用する場合

```bash
cd backend

# Docker環境の起動
npm run docker:up
```

## フロントエンド

**開発環境の特徴:**

- **CDN配布**: 外部ライブラリはCDNまたはZIP形式で提供
- **競技準拠**: 第20回若年者ものづくり競技大会ウェブデザイン職種のインフラに準拠
- **学習重視**: Reactの基本概念に集中できる環境と課題内容
- **Windows対応**: Live Serverを使用した簡単な開発環境

**提供ライブラリ:**

- React & ReactDOM（ZIP形式）
- Bootstrap 5.3 (CDN形式)
- Tailwind CSS (CDN形式)
- FontAwesome (CDN形式)
- 日本語Webフォント (CDN形式)

自分の開発環境に応じてパッケージの選定をください。

## API仕様書

API仕様は **API Blueprint** 形式で文書化されています。

- **ソース**: [`docs/api.apib`](./docs/api.apib)
- **HTML版**: [`docs/api.html`](./docs/api.html)

### ライブプレビューサーバーの起動

API仕様書をライブプレビュー環境で確認できます：

```bash
cd docs

# 依存関係をインストール
npm install

# ライブプレビューサーバーを起動
npm run serve
```

[http://localhost:5000](http://localhost:5000)でAPI仕様書を閲覧できます。

詳細は [`docs/README.md`](./docs/README.md) を参照
