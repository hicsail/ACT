import { Body, Controller, Post, Get, Patch, Delete, Query, Response, Param, NotFoundException } from '@nestjs/common';
import { TaskSetService } from './taskset.service';
import { CreateTaskSetDto } from './dto/create-taskset.dto';
import { UpdateTaskSetDto } from './dto/update-taskset.dto';
import { TaskSetEntity } from './entities/taskset.entity';
import { PaginationDTO, makeContentRange } from 'src/pagination/pagination.dto';
import { Response as Res } from 'express';

@Controller('set')
export class TaskSetController {
  constructor(private readonly taskSetService: TaskSetService) {}

  @Post()
  create(@Body() createTaskSetDto: CreateTaskSetDto): Promise<TaskSetEntity> {
    return this.taskSetService.create(createTaskSetDto);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDTO, @Response() res: Res): Promise<any> {
    const result = await this.taskSetService.findAll(pagination);

    // Determine content-range header
    const total = await this.taskSetService.count();
    res.setHeader(
      'Content-Range',
      makeContentRange('tasks', pagination, total),
    );

    return res.json(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskSetEntity> {
    const found = await this.taskSetService.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskSetDto,
  ): Promise<TaskSetEntity> {
    const updated = await this.taskSetService.update(id, updateTaskDto);
    if (!updated) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.taskSetService.remove(id);
  }
}
