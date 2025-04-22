import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Response,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { TaskCompletionsService } from './taskcompletions.service';
import { CreateTaskCompletionDto } from './dto/create-taskcompletion.dto';
import { UpdateTaskCompletionDto } from './dto/update-taskcompletion.dto';
import { TaskCompletionEntity } from './entities/taskcompletion.entity';
import { PaginationDTO, makeContentRange } from 'src/pagination/pagination.dto';
import { Response as Res } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindByUserTask } from './dto/find-by-user-task.dto';
import { FindByTask } from './dto/find-by-task.dto';
import { CasdoorGuard } from 'src/casdoor/casdoor.guard';
import { UserCtx } from '../casdoor/user.context';
import { User } from 'casdoor-nodejs-sdk/lib/cjs/user';
import { TaskCompletionId } from './dto/task-completion-id';
import { Task } from '@prisma/client';

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
    res.setHeader('Content-Range', makeContentRange('tasks', pagination, total));

    return res.json(result);
  }

  @Get('/id')
  @ApiResponse({ type: TaskCompletionEntity })
  async findOne(@Query() taskCompletionId: TaskCompletionId): Promise<TaskCompletionEntity> {
    const found = await this.taskCompletionsService.findOne(taskCompletionId);
    if (!found) {
      throw new NotFoundException(`Task Completion with id ${taskCompletionId} not found`);
    }
    return found;
  }

  @Patch()
  @ApiResponse({ type: TaskCompletionEntity })
  async update(
    @Query() taskCompletionId: TaskCompletionId,
    @Body() updateTaskCompletionDto: UpdateTaskCompletionDto
  ): Promise<TaskCompletionEntity> {
    const updated = await this.taskCompletionsService.update(taskCompletionId, updateTaskCompletionDto);
    if (!updated) {
      throw new NotFoundException(`Task Completion with id ${taskCompletionId} not found`);
    }
    return updated;
  }

  @Delete()
  remove(@Query() taskCompletionId: TaskCompletionId) {
    return this.taskCompletionsService.remove(taskCompletionId);
  }

  @Get('/by-user/query')
  @ApiOperation({
    description: 'Get a task completion by providing the user and task'
  })
  @ApiResponse({ type: TaskCompletionEntity })
  async findOrCreateByUserTask(@Query() findQuery: FindByUserTask): Promise<TaskCompletionEntity> {
    return this.taskCompletionsService.findOrCreateByUserTask(findQuery);
  }

  @Get('/by-user/header')
  @UseGuards(CasdoorGuard)
  @ApiOperation({
    description: 'Get a task completion by inferring the user from the JWT and the task from the query'
  })
  @ApiResponse({ type: TaskCompletionEntity })
  @ApiBearerAuth()
  async findOrCreateByTask(@Query() findQuery: FindByTask, @UserCtx() user: User): Promise<TaskCompletionEntity> {
    return this.findOrCreateByUserTask({
      task: findQuery.task,
      user: user.id!
    });
  }

  @Get('/next-incomplete')
  @UseGuards(CasdoorGuard)
  @ApiOperation({
    description: 'Get the next task completion for the user to go through'
  })
  @ApiResponse({ type: TaskCompletionEntity })
  @ApiBearerAuth()
  async getNextIncomplete(@UserCtx() user: User): Promise<TaskCompletionEntity> {
    const next = await this.taskCompletionsService.getNextTaskCompletion(user.id!);
    if (!next) {
      throw new NotFoundException(`No next task completion`);
    }
    return next;
  }

  @Get('/upload-url')
  @UseGuards(CasdoorGuard)
  @ApiOperation({
    description: 'Get the presigned URL to upload the recordeded video'
  })
  @ApiResponse({ type: String })
  @ApiBearerAuth()
  async getVideoUploadURL(@Query('taskId') taskId: string, @UserCtx() user: User): Promise<string> {
    // TODO: Validate it is the correct user making the request
    return this.taskCompletionsService.getUploadUrl(taskId, user);
  }
}
