import { ApiProperty } from '@nestjs/swagger';
import { TaskSet } from '@prisma/client';

export class CreateTaskSetDto implements Omit<TaskSet, 'id' | 'active'> {
  @ApiProperty({ description: 'Name of the task set' })
  name: string;

  @ApiProperty({ description: 'Description of the task set' })
  description: string;
}
