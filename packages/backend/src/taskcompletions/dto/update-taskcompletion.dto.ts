import { PartialType } from '@nestjs/swagger';
import { CreateTaskCompletionDto } from './create-taskcompletion.dto';

export class UpdateTaskCompletionDto extends PartialType(
  CreateTaskCompletionDto,
) {}
