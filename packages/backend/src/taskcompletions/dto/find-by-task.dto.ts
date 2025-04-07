import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class FindByTask {
  @IsString()
  @ApiProperty({ description: 'The task to search by' })
  task: string;
}
