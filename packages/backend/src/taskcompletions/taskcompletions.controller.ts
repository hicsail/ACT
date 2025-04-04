import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskCompletionsService } from './taskcompletions.service';
import { CreateTaskCompletionDto } from './dto/create-taskcompletion.dto';
import { UpdateTaskCompletionDto } from './dto/update-taskcompletion.dto';

@Controller('taskCompletions')
export class TaskCompletionsController {
  constructor(private readonly taskCompletionsService: TaskCompletionsService) {}

  @Post()
  create(@Body() createTaskCompletionDto: CreateTaskCompletionDto) {
    return this.taskCompletionsService.create(createTaskCompletionDto);
  }

  @Get()
  findAll() {
    return this.taskCompletionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskCompletionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskCompletionDto: UpdateTaskCompletionDto) {
    return this.taskCompletionsService.update(+id, updateTaskCompletionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCompletionsService.remove(+id);
  }
}
