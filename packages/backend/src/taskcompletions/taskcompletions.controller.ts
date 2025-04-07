import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Response, NotFoundException } from '@nestjs/common';
import { TaskCompletionsService } from './taskcompletions.service';
import { CreateTaskCompletionDto } from './dto/create-taskcompletion.dto';
import { UpdateTaskCompletionDto } from './dto/update-taskcompletion.dto';
import { TaskCompletionEntity } from './entities/taskcompletion.entity';
import { PaginationDTO, makeContentRange } from 'src/pagination/pagination.dto';
import { Response as Res } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { FindByUserTask } from './dto/find-by-user-task.dto';

@Controller('taskCompletions')
export class TaskCompletionsController {
  constructor(private readonly taskCompletionsService: TaskCompletionsService) {}

  @Post()
  @ApiResponse({ type: TaskCompletionEntity })
  create(@Body() createTaskCompletionDto: CreateTaskCompletionDto): Promise<TaskCompletionEntity> {
    return this.taskCompletionsService.create(createTaskCompletionDto);
  }

  @Get()
  @ApiResponse({ type: [TaskCompletionEntity] })
  async findAll(@Query() pagination: PaginationDTO, @Response() res: Res): Promise<any> {
    const result = await this.taskCompletionsService.findAll(pagination);

    // Determine content-range header
    const total = await this.taskCompletionsService.count();
    res.setHeader(
      'Content-Range',
      makeContentRange('tasks', pagination, total),
    );

    return res.json(result);
  }

  @Get(':id')
  @ApiResponse({ type: TaskCompletionEntity })
  async findOne(@Param('id') id: string): Promise<TaskCompletionEntity> {
    const found = await this.taskCompletionsService.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task Completion with id ${id} not found`);
    }
    return found;
  }

  @Patch(':id')
  @ApiResponse({ type: TaskCompletionEntity })
  async update(@Param('id') id: string, @Body() updateTaskCompletionDto: UpdateTaskCompletionDto): Promise<TaskCompletionEntity> {
    const updated = await this.taskCompletionsService.update(id, updateTaskCompletionDto);
    if (!updated) {
      throw new NotFoundException(`Task Completion with id ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCompletionsService.remove(id);
  }

  @Get('/by-user/completions')
  async findOrCreateByUserTask(@Query() findQuery: FindByUserTask) {
    return this.taskCompletionsService.findOrCreateByUserTask(findQuery);
  }
}
