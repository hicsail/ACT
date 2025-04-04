import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskSetDto } from './dto/create-taskset.dto';
import { TaskSet } from '@prisma/client';
import { PaginationDTO } from 'src/pagination/pagination.dto';
import { UpdateTaskSetDto } from './dto/update-taskset.dto';


@Injectable()
export class TaskSetService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskSetDto: CreateTaskSetDto): Promise<TaskSet> {
    return this.prismaService.taskSet.create({
      data: {
        ...createTaskSetDto,
        active: false
      }
    });
  }

  async findAll(pagination: PaginationDTO): Promise<TaskSet[]> {
    return this.prismaService.taskSet.findMany({
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

  async findOne(id: string): Promise<TaskSet | null> {
    return this.prismaService.taskSet.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateTaskSetDto: UpdateTaskSetDto): Promise<TaskSet | null> {
    return this.prismaService.taskSet.update({
      where: { id },
      data: updateTaskSetDto
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.taskSet.delete({
      where: { id }
    });
  }

  async count(): Promise<number> {
    return this.prismaService.taskSet.count();
  }

  async setActive(id: string): Promise<TaskSet> {
    // First mark all others as inactive
    await this.prismaService.taskSet.updateMany({
      data: {
        active: false
      }
    });

    // Now mark the single task set as active
    return this.prismaService.taskSet.update({
      where: { id },
      data: {
        active: true
      }
    })
  }

  async getActive(): Promise<TaskSet | null> {
    return this.prismaService.taskSet.findFirst({
      where: { active: true }
    });
  }
}
