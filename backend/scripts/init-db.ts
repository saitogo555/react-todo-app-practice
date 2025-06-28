import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESModules用の__dirnameの代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// データベースファイルのパス
const dbPath: string = path.join(__dirname, "..", "prisma", "dev.db");
const migrationsPath: string = path.join(
  __dirname,
  "..",
  "prisma",
  "migrations"
);

console.log("データベースの初期化を開始...");

const runCommand = (command: string): boolean => {
  try {
    execSync(command, { stdio: "inherit" });
    return true;
  } catch (error) {
    console.warn(`コマンド実行で警告: ${command}`);
    return false;
  }
};

try {
  // データベースファイルが存在するかチェック
  if (fs.existsSync(dbPath)) {
    console.log("既存のデータベースが見つかりました。");

    // マイグレーションフォルダが存在し、中身があるかチェック
    if (
      fs.existsSync(migrationsPath) &&
      fs.readdirSync(migrationsPath).length > 0
    ) {
      console.log("マイグレーションを実行中...");
      if (!runCommand("npx prisma migrate deploy")) {
        console.log("マイグレーションに失敗しました。スキーマを同期中...");
        runCommand("npx prisma db push");
      }
    } else {
      console.log("マイグレーションファイルがありません。スキーマを同期中...");
      runCommand("npx prisma db push");
    }
  } else {
    console.log("新しいデータベースを作成中...");

    // Prismaディレクトリを作成（念のため）
    const prismaDir: string = path.dirname(dbPath);
    if (!fs.existsSync(prismaDir)) {
      fs.mkdirSync(prismaDir, { recursive: true });
    }

    runCommand("npx prisma db push");
    console.log("データベース作成完了");
  }

  console.log("データベースの初期化が完了しました。");
} catch (error) {
  console.error("データベース初期化エラー:", (error as Error).message);
  process.exit(1);
}
