import { PrismaClient, Task, TaskSet } from '@prisma/client';
import * as seed from './seed-data';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { CreateTaskSetDto } from 'src/tasks/dto/create-taskset.dto';

const prisma = new PrismaClient();

const updateOrCreateSet = async (name: string, set: CreateTaskSetDto, active: boolean): Promise<TaskSet> => {
  const existing = await prisma.taskSet.findFirst({ where: { name }});

  // If already existing, update and return
  if (existing) {
    return await prisma.taskSet.update({ where: { id: existing.id }, data: set });
  }

  // Otherwise make a new one
  return await prisma.taskSet.create({ data: { active, ...set }});
};

const updateOrCreateTask = async (descriptor: string, task: Omit<CreateTaskDto, 'taskSetId'>, taskSetId: string): Promise<Task> => {
  const existing = await prisma.task.findFirst({ where: { descriptor }});

  // If already existing, update and return
  if (existing) {
    return await prisma.task.update({ where: { id: existing.id }, data: { taskSetId, ...task }});
  }

  // Otherwise make a new one
  return await prisma.task.create({ data: { taskSetId, ...task }});
};

async function main() {
  // Create the task sets
  const set1 = await updateOrCreateSet(seed.set1Content.name, seed.set1Content, true);
  const set2 = await updateOrCreateSet(seed.set2Content.name, seed.set2Content, false);

  // Set 1 tasks
  await updateOrCreateTask(seed.task1_1.descriptor, seed.task1_1, set1.id);
  await updateOrCreateTask(seed.task1_2.descriptor, seed.task1_2, set1.id);
  await updateOrCreateTask(seed.task1_3.descriptor, seed.task1_3, set1.id);

  // Set 2 tasks
  await updateOrCreateTask(seed.task2_1.descriptor, seed.task2_1, set2.id);
  await updateOrCreateTask(seed.task2_2.descriptor, seed.task2_2, set2.id);
  await updateOrCreateTask(seed.task2_3.descriptor, seed.task2_3, set2.id);
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
