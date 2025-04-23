import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserEntity {
  @ApiProperty({ description: 'First name of the user' })
  @Expose()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @Expose()
  lastName: string;

  @ApiProperty({ description: 'Email  of the user' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'User name of the user' })
  @Expose()
  name: string;
}
