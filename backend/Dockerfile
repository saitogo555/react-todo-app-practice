# Node.js 20のAlpine版を使用（軽量）
FROM node:24.3.0-alpine

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# Prisma schemaとソースコードをコピー
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

# Prismaクライアントを生成
RUN npx prisma generate

# 本番用の依存関係のみを再インストール（オプション: より小さなイメージを作成したい場合）
# RUN npm prune --production && npm cache clean --force

# 残りのファイルをコピー（必要に応じて）
COPY . .

# curlをインストール（ヘルスチェック用）
RUN apk add --no-cache curl

# 非rootユーザーを作成
RUN addgroup -g 1001 -S nodejs
RUN adduser -S todoapi -u 1001

# ファイルの所有権を変更
RUN chown -R todoapi:nodejs /app
USER todoapi

# ポート3001を公開
EXPOSE 3001

# アプリケーションを起動
CMD ["npm", "start"]
