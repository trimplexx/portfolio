import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const categories = [
    "Indywidualny Akademicki",
    "Grupowy Akademicki",
    "Indywidualny Komercyjny",
    "Grupowy Komercyjny",
    "Hobbystyczny",
    "Badawczy",
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
