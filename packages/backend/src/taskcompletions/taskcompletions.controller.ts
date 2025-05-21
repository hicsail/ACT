import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { CasdoorGuard } from '../casdoor/casdoor.guard';
import { UserCtx } from '../casdoor/user.context';
import { User } from 'casdoor-nodejs-sdk/lib/cjs/user';
import { TaskCompletionId } from './dto/task-completion-id';
import { AdminGuard } from '../casdoor/admin.guard';

@Controller('taskCompletions')
@ApiBearerAuth()
@UseGuards(CasdoorGuard)
export class TaskCompletionsController {
  constructor(private readonly taskCompletionsService: TaskCompletionsService) {}

  @Post()
  @ApiResponse({ type: TaskCompletionEntity })
  @UseGuards(AdminGuard)
  create(@Body() createTaskCompletionDto: CreateTaskCompletionDto): Promise<TaskCompletionEntity> {
    return this.taskCompletionsService.create(createTaskCompletionDto);
  }

  @Get()
  @ApiResponse({ type: [TaskCompletionEntity] })
  @UseGuards(AdminGuard)
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
  @UseGuards(AdminGuard)
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
  @ApiOperation({
    description: 'Get a task completion by inferring the user from the JWT and the task from the query'
  })
  @ApiResponse({ type: TaskCompletionEntity })
  async findOrCreateByTask(@Query() findQuery: FindByTask, @UserCtx() user: User): Promise<TaskCompletionEntity> {
    return this.findOrCreateByUserTask({
      task: findQuery.task,
      user: user.id!
    });
  }

  @Get('/next-incomplete')
  @ApiOperation({
    description: 'Get the next task completion for the user to go through'
  })
  @ApiResponse({ type: TaskCompletionEntity })
  async getNextIncomplete(@UserCtx() user: User): Promise<TaskCompletionEntity> {
    const next = await this.taskCompletionsService.getNextTaskCompletion(user);
    if (!next) {
      throw new NotFoundException(`No next task completion`);
    }
    return next;
  }

  @Get('/upload-url')
  @ApiOperation({
    description: 'Get the presigned URL to upload the recordeded video'
  })
  @ApiResponse({ type: String })
  async getVideoUploadURL(@Query('taskId') taskId: string, @UserCtx() user: User): Promise<string> {
    // TODO: Validate it is the correct user making the request
    return this.taskCompletionsService.getUploadUrl(taskId, user);
  }

  @Get('/view-url')
  @ApiOperation({
    description: 'Get the presigned URL to download a video'
  })
  @ApiResponse({ type: String })
  @UseGuards(AdminGuard)
  async getVideoDownloadURL(@Query('video') video: string): Promise<string> {
    return this.taskCompletionsService.getDownloadUrl(video);
  }

  @Delete('/video')
  @ApiOperation({
    description: 'Delete a video from the S3 bucket'
  })
  @UseGuards(AdminGuard)
  async deleteVideo(@Query('video') video: string): Promise<void> {
    await this.taskCompletionsService.deleteVideo(video);
  }
}
