import { PrismaClient } from '@prisma/client';
import * as seed from './seed-data';

const prisma = new PrismaClient();

async function main() {
  // Create the task sets
  const set1 = await prisma.taskSet.create({ data: { active: true, ...seed.set1Content } });
  const set2 = await prisma.taskSet.create({ data: { active: false, ...seed.set2Content } });

  // Set 1 tasks
  await prisma.task.create({ data: { taskSetId: set1.id, ...seed.task1_1 } });
  await prisma.task.create({ data: { taskSetId: set1.id, ...seed.task1_2 } });
  await prisma.task.create({ data: { taskSetId: set1.id, ...seed.task1_3 } });

  // Set 2 tasks
  await prisma.task.create({ data: { taskSetId: set2.id, ...seed.task2_1 } });
  await prisma.task.create({ data: { taskSetId: set2.id, ...seed.task2_2 } });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
