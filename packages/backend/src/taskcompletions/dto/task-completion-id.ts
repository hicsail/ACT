import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TaskCompletionId {
  @IsString()
  @ApiProperty({ description: 'The task of the completion' })
  taskId: string;

  @IsString()
  @ApiProperty({ description: 'The user the completion is assocaited with' })
  userId: string;
}
