import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';
import { Pagination } from 'src/shared/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prismaService.task.create({
      data: createTaskDto,
    });
  }

  async findAll(pagination: Pagination): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.prismaService.task.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    return this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.task.delete({
      where: { id },
    });
  }
}
