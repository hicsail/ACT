import { PartialType } from '@nestjs/swagger';
import { CreateTaskSetDto } from './create-taskset.dto';


export class UpdateTaskSetDto extends PartialType(CreateTaskSetDto) {}
