import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, Response, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { Response as Res } from 'express';
import { makeContentRange, PaginationDTO } from '../pagination/pagination.dto';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CasdoorGuard } from 'src/casdoor/casdoor.guard';
import { AdminGuard } from 'src/casdoor/admin.guard';

@Controller('tasks')
@ApiBearerAuth()
@UseGuards(CasdoorGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiResponse({ type: TaskEntity })
  @UseGuards(AdminGuard)
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiResponse({ type: [TaskEntity] })
  async findAll(@Query() pagination: PaginationDTO, @Response() res: Res): Promise<any> {
    const result = await this.tasksService.findAll(pagination);

    // Determine content-range header
    const total = await this.tasksService.count();
    res.setHeader('Content-Range', makeContentRange('tasks', pagination, total));

    return res.json(result);
  }

  @Get(':id')
  @ApiResponse({ type: TaskEntity })
  async findOne(@Param('id') id: string): Promise<TaskEntity> {
    const found = await this.tasksService.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  @Patch(':id')
  @ApiResponse({ type: TaskEntity })
  @UseGuards(AdminGuard)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const updated = await this.tasksService.update(id, updateTaskDto);
    if (!updated) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(id);
  }

  @Get('/active/tasks')
  @ApiResponse({ type: [TaskEntity] })
  async getActiveTasks(): Promise<TaskEntity[]> {
    return this.tasksService.getActiveTasks();
  }
}
