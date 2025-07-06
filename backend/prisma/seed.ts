import { PrismaClient } from "@prisma/client";
import { fakerJA } from "@faker-js/faker";

const DATA_COUNT = 10; // 挿入するダミーデータの件数
const prisma = new PrismaClient();

async function main() {
  // 既存のデータを削除
  await prisma.todo.deleteMany();

  // ダミーデータを作成
  for (let i = 0; i < DATA_COUNT; i++) {
    await prisma.todo.create({
      data:{
        title: fakerJA.lorem.sentence({ min: 3, max: 5 }),
        description: fakerJA.datatype.boolean() ? fakerJA.lorem.paragraph() : null,
        completed: fakerJA.datatype.boolean(0.3), // 30%の確率でtrue
      }
    });
  }

  // データベースにダミーデータを挿入
  console.log(`✅ ${DATA_COUNT}件のダミーデータを挿入しました`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
