import { Injectable } from '@nestjs/common';
import { CreateTaskCompletionDto } from './dto/create-taskcompletion.dto';
import { UpdateTaskCompletionDto } from './dto/update-taskcompletion.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TaskCompletion } from '@prisma/client';
import { PaginationDTO } from 'src/pagination/pagination.dto';

@Injectable()
export class TaskCompletionsService {
  constructor (private readonly prismaService: PrismaService) {}

  create(createTaskCompletionDto: CreateTaskCompletionDto): Promise<TaskCompletion> {
    return this.prismaService.taskCompletion.create({
      data: createTaskCompletionDto
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
      where: { id }
    });
  }

  update(id: string, updateTaskCompletionDto: UpdateTaskCompletionDto): Promise<TaskCompletion | null> {
    return this.prismaService.taskCompletion.update({
      where: { id },
      data: updateTaskCompletionDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.taskCompletion.delete({
      where: { id }
    });
  }

  async count(): Promise<number> {
    return this.prismaService.taskCompletion.count();
  }
}
