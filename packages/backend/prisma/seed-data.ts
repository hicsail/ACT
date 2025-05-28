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
Ava’s mom is 28 years old. Her grandma is 51 years old. How many years older is Ava’s grandma than her mom?
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
  order: 1,
  descriptor: 'P1'
};

export const task1_2: Omit<CreateTaskDto, 'taskSetId'> = {
  category: 'english',
  title: 'Task 1.2 Think Aloud',
  preview: 'Click "start" to begin your this task. Fourth grade math context.',
  previewImage: '',
  timeSeconds: 5 * 60,
  description: `
*Note: This task stands alone. Do not assume your audience has knowledge of Task 1.1.
You are working with your fourth-grade class on word problems.
Your students can solve addition and subtraction problems, but the complexity of word problems can challenge your students. They are also familiar with adding and subtracting fractions with like denominators.
You are going to provide a think aloud to make sense of word problems. In your think aloud you want to address how you make sense of the context, quantities, mathematical relationships in the problem and how you can use a visual to represent what is happening in the problem.
  `,
  problemDescription: 'CeCe is making cookies with white and brown sugar. She puts 2/8 cup of white sugar in the cookie dough. Then she puts in the brown sugar. She has 7/8 cup of sugar in all. How much brown sugar is in the recipe?',
  taskDetails: 'Provide a think aloud to make sense of word problems.',
  prompts: [
    'Share the purpose for your think aloud with your students.',
    'Narrate your thinking about how you approach understanding this problem.',
    'Address how you make sense of the context, quantities, and mathematical relationships.',
    'Demonstrate how you might represent the context of the problem with manipulatives, a diagram or other visual.',
    'Ensure that you are modeling accuracy, clarity, and precision to mathematical language'
  ],
  order: 2,
  descriptor: 'P2'
};

export const task1_3: Omit<CreateTaskDto, 'taskSetId'> = {
  category: 'english',
  title: 'Task 1.3 Think Aloud',
  preview: 'Click "start" to begin your this task. Fifth grade math context.',
  previewImage: '',
  timeSeconds: 5 * 60,
  description: `
*Note: This task stands alone. Do not assume your audience has knowledge of Task 1.1 or Task 1.2.
You are working with your fifth-grade students on estimating the answer in math problems.
They are familiar with rounding to the nearest tens or hundreds place, and using tables. The challenge for students is when all of those skills are combined into a more complex problem. You are going to provide a think aloud to show how you make sense of problems that combine multiple skills.
  `,
  problemDescription: 'About how much would it cost to buy MP3 players for all 18 classrooms in your school? Use the table to answer the question.',
  taskDetails: 'Provide a think aloud to make sense of word problems like this one.',
  prompts: [
    'Share the purpose for your think aloud with your students.',
    'Narrate your thinking about how you approach understanding this problem.',
    'Address how you make sense of the context, quantities, and mathematical relationships.',
    'Demonstrate how you might represent the context of the problem with manipulatives, a diagram or other visual.',
    'Ensure that you are modeling accuracy, clarity, and precision to mathematical language.'
  ],
  order: 3,
  descriptor: 'P3'
};

export const task2_1: Omit<CreateTaskDto, 'taskSetId'> = {
  category: 'math',
  title: 'Task 2.1 Think Aloud',
  preview: 'Click "start" to begin your this task. Second grade math context.',
  previewImage: '',
  timeSeconds: 5 * 60,
  description: `
You are working with your second graders on word problems.
Your students can solve addition and subtraction problems, but the complexity of word problems can challenge your students.
You are going to enact a think aloud for students to witness your expert thinking as you make sense of the context and quantities in the word problem, and as you monitor your progress towards your goals for problem solving.
  `,
  problemDescription: 'There were 26 students in the cafeteria. There were 42 students on the playground. How many more students were on the playground than in the cafeteria?',
  taskDetails: 'Provide a think aloud to make sense of the word problem.',
  prompts: [
    'Share the purpose for your think aloud with your students',
    'Narrate your thinking about how you approach understanding this problem.',
    'Address how you make sense of the context, quantities, and mathematical relationships.',
    'Demonstrate how you might represent the context of the problem with manipulatives, a diagram or other visual.',
    'Ensure that you are modeling accuracy, clarity, and precision to mathematical language.'
  ],
  order: 1,
  descriptor: 'P4'
};

export const task2_2: Omit<CreateTaskDto, 'taskSetId'> = {
  category: 'math',
  title: 'Task 2.2 Think Aloud',
  preview: 'Click "start" to begin your this task. Fourth grade math context.',
  previewImage: '',
  timeSeconds: 5 * 60,
  description: `
You are working with your fourth-grade class on word problems. Your students can solve addition and subtraction problems, but the complexity of word problems can challenge your students. They are also familiar with adding and subtracting fractions with like denominators.
You are going to enact a think aloud for students to witness your expert thinking as you make sense of the context and quantities in the word problem, and as you monitor your progress towards your problem-solving goals.
  `,
  problemDescription: 'Diego and his cousin are sharing a pie. Diego ate 4/10 of the pie. His cousin ate some more. They ate 9/10 of the pie together. How much of the pie did his cousin eat?',
  taskDetails: 'Provide a think aloud to make sense of the word problem.',
  prompts: [
    'Share the purpose for your think aloud with your students.',
    'Narrate your thinking about how you approach understanding this problem.',
    'Address how you make sense of the context, quantities, and mathematical relationships.',
    'Demonstrate how you might represent the context of the problem with manipulatives, a diagram or other visual.',
    'Ensure that you are modeling accuracy, clarity, and precision to mathematical language.'
  ],
  order: 2,
  descriptor: 'P5'
};

export const task2_3: Omit<CreateTaskDto, 'taskSetId'> = {
  category: 'english',
  title: 'Task 2.3 Think Aloud',
  preview: 'Click "start" to begin your this task. Fifth grade math context.',
  previewImage: '',
  timeSeconds: 5 * 60,
  description: `
You are working with your fifth-grade students on estimating the answer in math problems.
They are familiar with rounding to the nearest tens or hundreds place, and using tables. The challenge for students is when all of those skills are combined into a more complex problem.
You are going to provide a think aloud to show how you make sense of problems that combine multiple skills and monitor your progress towards your problem-solving goals.
  `,
  problemDescription: 'Mrs. Molloy orders new supplies for the STEM club. About how much will it cost to purchase 14 coding robots? Use the table to answer the question.',
  taskDetails: 'Provide a think aloud to make sense of the word problem.',
  prompts: [
    'Share the purpose for your think aloud with your students.',
    'Narrate your thinking about how you approach understanding this problem.',
    'Address how you make sense of the context, quantities, and mathematical relationships.',
    'Demonstrate how you might represent the context of the problem with manipulatives, a diagram or other visual.',
    'Ensure that you are modeling accuracy, clarity, and precision to mathematical language.'
  ],
  order: 3,
  descriptor: 'P6'
};
