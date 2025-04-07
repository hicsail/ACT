import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindByUserTask {
  @IsString()
  @ApiProperty({ description: 'The user to search by' })
  user: string;

  @IsString()
  @ApiProperty({ description: 'The task to search by' })
  task: string;
}
