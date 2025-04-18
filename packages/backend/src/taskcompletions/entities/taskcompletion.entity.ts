import { ApiProperty } from '@nestjs/swagger';
import { TaskCompletion } from '@prisma/client';

export class TaskCompletionEntity implements TaskCompletion {
  @ApiProperty({
    description: 'The ID of the task associated with the completion'
  })
  taskId: string;

  @ApiProperty({ description: 'If the completion has been finished' })
  complete: boolean;

  @ApiProperty({ description: 'The location of the video' })
  video: string;

  @ApiProperty({ description: 'The ID of the user who made the completion' })
  userId: string;
}
