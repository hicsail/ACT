import { ApiProperty } from '@nestjs/swagger';
import { TaskSet } from '@prisma/client';


export class TaskSetEntity implements TaskSet {
  @ApiProperty({ description: 'Unique ID of the set' })
  id: string;

  @ApiProperty({ description: 'If this is the current set being used' })
  active: boolean;

  @ApiProperty({ description: 'The name of the set' })
  name: string;

  @ApiProperty({ description: 'The description of the set' })
  description: string;
}
