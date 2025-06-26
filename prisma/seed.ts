import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.category.upsert({
    where: { name: 'Indywidualne' },
    update: {},
    create: { name: 'Indywidualne' },
  });

  await prisma.category.upsert({
    where: { name: 'Grupowe' },
    update: {},
    create: { name: 'Grupowe' },
  });

  console.log(`Seeding finished.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });