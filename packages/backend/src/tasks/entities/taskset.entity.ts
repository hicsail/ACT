import { ApiProperty } from '@nestjs/swagger';
import { TaskSet } from '@prisma/client';


export class TaskSetEntity implements TaskSet {
  @ApiProperty({ description: 'Unique ID of the set' })
  id: string;

  @ApiProperty({ description: 'The name of the set' })
  name: string;

  @ApiProperty({ description: 'The description of the set' })
  description: string;
}
