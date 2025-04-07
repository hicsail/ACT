import { TaskCompletion } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskCompletionDto
  implements Omit<TaskCompletion, 'id' | 'completion'>
{
  @ApiProperty({
    description: 'The ID of the task associated with the completion',
  })
  taskId: string;

  @ApiProperty({ description: 'If the completion has been finished' })
  complete: boolean;

  @ApiProperty({ description: 'The location of the video' })
  video: string;

  @ApiProperty({ description: 'The ID of the user who made the completion' })
  user: string;
}
