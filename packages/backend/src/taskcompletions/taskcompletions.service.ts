import { Injectable } from '@nestjs/common';
import { CreateTaskCompletionDto } from './dto/create-taskcompletion.dto';
import { UpdateTaskCompletionDto } from './dto/update-taskcompletion.dto';

@Injectable()
export class TaskCompletionsService {
  create(createTaskCompletionDto: CreateTaskCompletionDto) {
    return 'This action adds a new taskCompletion';
  }

  findAll() {
    return `This action returns all taskCompletions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskCompletion`;
  }

  update(id: number, updateTaskCompletionDto: UpdateTaskCompletionDto) {
    return `This action updates a #${id} taskCompletion`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskCompletion`;
  }
}
