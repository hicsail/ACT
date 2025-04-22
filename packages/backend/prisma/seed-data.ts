import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { CreateTaskSetDto } from '../src/tasks/dto/create-taskset.dto';

export const set1Content: CreateTaskSetDto = {
  name: 'Set 1',
  description: 'First task set'
};

export const set2Content: CreateTaskSetDto = {
  name: 'Set 2',
  description: 'Second task set'
};

export const task1_1: Omit<CreateTaskDto, 'taskSetId'> = {
  category: 'math',
  title: 'Task 1.1 Think Aloud',
  preview: 'Click "start" to begin your this task. Second grade math context.',
  previewImage: '',
  timeSeconds: 5 * 60,
  description: `
You are working with your second graders on word problems.
Your students can solve addition and subtraction problems, but the complexity of word problems can challenge your students.
You are going to provide a think aloud to make sense of word problems In your think aloud you want to address how you make sense of the context, quantities, mathematical relationships in the problem and how you can use a visual to represent what is happening in the problem.
  `,
  problemDescription: `
Ava’s mom is 28 years old. Her grandma is 51. How much older is Ava’s grandma than her mom?
  `,
  taskDetails: 'Provide a think aloud to make sense of word problems.',
  prompts: [
    'Provide a think aloud to make sense of word problems.',
    'Share the purpose for your think aloud with your students.',
    'Narrate your thinking about how you approach understanding this problem.',
    'Address how you make sense of the context, quantities, and mathematical relationships.',
    'Demonstrate how you might represent the context of the problem with manipulatives, a diagram or other visual.',
    'Ensure that you are modeling accuracy, clarity, and precision to mathematical language.'
  ],
  order: 1
};
