import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskCompletionDto } from './dto/create-taskcompletion.dto';
import { UpdateTaskCompletionDto } from './dto/update-taskcompletion.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TaskCompletion } from '@prisma/client';
import { PaginationDTO } from '../pagination/pagination.dto';
import { TasksService } from '../tasks/tasks.service';
import { FindByUserTask } from './dto/find-by-user-task.dto';

@Injectable()
export class TaskCompletionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskService: TasksService,
  ) {}

  create(
    createTaskCompletionDto: CreateTaskCompletionDto,
  ): Promise<TaskCompletion> {
    return this.prismaService.taskCompletion.create({
      data: createTaskCompletionDto,
    });
  }

  findAll(pagination: PaginationDTO): Promise<TaskCompletion[]> {
    return this.prismaService.taskCompletion.findMany({
      where: pagination.filter,
      take: pagination.range
        ? pagination.range.end - pagination.range.start
        : undefined,
      skip: pagination.range ? pagination.range.start : undefined,
      orderBy: pagination.sort
        ? { [pagination.sort.field]: pagination.sort.direction }
        : undefined,
    });
  }

  findOne(id: string): Promise<TaskCompletion | null> {
    return this.prismaService.taskCompletion.findUnique({
      where: { id },
    });
  }

  update(
    id: string,
    updateTaskCompletionDto: UpdateTaskCompletionDto,
  ): Promise<TaskCompletion | null> {
    return this.prismaService.taskCompletion.update({
      where: { id },
      data: updateTaskCompletionDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.taskCompletion.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prismaService.taskCompletion.count();
  }

  async findOrCreateByUserTask(
    findQuery: FindByUserTask,
  ): Promise<TaskCompletion> {
    // Check if one exists
    const existing = await this.prismaService.taskCompletion.findFirst({
      where: { user: findQuery.user, taskId: findQuery.task },
    });

    // If an existing task completion is found, return it
    if (existing) {
      return existing;
    }

    // Make sure the task exists
    const task = await this.taskService.findOne(findQuery.task);
    if (!task) {
      throw new BadRequestException(
        `Cannot find or create task completion for non-existant task: ${findQuery.task}`,
      );
    }

    // Create the task completion
    return await this.create({
      taskId: findQuery.task,
      complete: false,
      video: '',
      user: findQuery.user,
    });
  }
}
