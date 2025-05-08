import { ApiProperty } from '@nestjs/swagger';
import { StudyMapping } from '@prisma/client';


export class StudyMappingEntity implements StudyMapping {
  @ApiProperty({ description: 'Placeholder ID for the admin client' })
  id: string;

  @ApiProperty({ description: 'Email of the user' })
  email: string;

  @ApiProperty({ description: 'Unique study ID for the user' })
  studyId: string;

  @ApiProperty({ description: 'Region the user is in' })
  region: string;
}
