import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class TaskEntity implements Task {
  @ApiProperty({ description: 'Unique ID of the task' })
  id: string;

  @ApiProperty({ description: 'The ID of the set the task belongs to' })
  taskSetId: string;

  @ApiProperty({ description: 'Category the task falls under' })
  category: string;

  @ApiProperty({ description: 'Title of the task' })
  title: string;

  @ApiProperty({ description: 'Preview text describing the task' })
  preview: string;

  @ApiProperty({ description: 'Preview image shown along with the task' })
  previewImage: string;

  @ApiProperty({ description: 'Duration of the task in seconds' })
  timeSeconds: number;

  @ApiProperty({ description: 'Task description given to the user' })
  description: string;

  @ApiProperty({ description: 'Problem overview for the user' })
  problemDescription: string;

  @ApiProperty({ description: 'Additional details for the user to follow' })
  taskDetails: string;

  @ApiProperty({ description: 'Prompts for the user to meet' })
  prompts: JsonValue;

  @ApiProperty({ description: 'Order the tasks are presented to the user' })
  order: number;

  @ApiProperty({ description: 'User provided ID for the task' })
  descriptor: string;
}
