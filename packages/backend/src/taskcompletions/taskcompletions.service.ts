import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTaskCompletionDto } from './dto/create-taskcompletion.dto';
import { UpdateTaskCompletionDto } from './dto/update-taskcompletion.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TaskCompletion } from '@prisma/client';
import { PaginationDTO } from '../pagination/pagination.dto';
import { TasksService } from '../tasks/tasks.service';
import { FindByUserTask } from './dto/find-by-user-task.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'casdoor-nodejs-sdk/lib/cjs/user';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3_PROVIDER } from 'src/s3/s3.provider';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class TaskCompletionsService {
  private readonly taskIteration: string;
  private readonly bucket: string;
  private readonly expiration: number;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskService: TasksService,
    @Inject(S3_PROVIDER) private readonly s3: S3Client,
    configService: ConfigService
  ) {
    this.taskIteration = configService.getOrThrow<string>('meta.taskIteration');
    this.bucket = configService.getOrThrow<string>('s3.bucket');
    this.expiration = configService.getOrThrow<number>('s3.signedExpiration');
  }

  create(createTaskCompletionDto: CreateTaskCompletionDto): Promise<TaskCompletion> {
    return this.prismaService.taskCompletion.create({
      data: createTaskCompletionDto
    });
  }

  findAll(pagination: PaginationDTO): Promise<TaskCompletion[]> {
    return this.prismaService.taskCompletion.findMany({
      where: pagination.filter,
      take: pagination.range ? pagination.range.end - pagination.range.start : undefined,
      skip: pagination.range ? pagination.range.start : undefined,
      orderBy: pagination.sort ? { [pagination.sort.field]: pagination.sort.direction } : undefined
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
      data: updateTaskCompletionDto
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

  async findOrCreateByUserTask(findQuery: FindByUserTask): Promise<TaskCompletion> {
    // Check if one exists
    const existing = await this.prismaService.taskCompletion.findFirst({
      where: { user: findQuery.user, taskId: findQuery.task }
    });

    // If an existing task completion is found, return it
    if (existing) {
      return existing;
    }

    // Make sure the task exists
    const task = await this.taskService.findOne(findQuery.task);
    if (!task) {
      throw new BadRequestException(`Cannot find or create task completion for non-existant task: ${findQuery.task}`);
    }

    // Create the task completion
    return await this.create({
      taskId: findQuery.task,
      complete: false,
      video: '',
      user: findQuery.user
    });
  }

  async getUploadUrl(taskCompletionId: string, user: User): Promise<string> {
    // Get the task completion
    const taskCompletion = await this.findOne(taskCompletionId);
    if (!taskCompletion) {
      throw new BadRequestException(`Task Completion not found: ${taskCompletionId}`);
    }

    // Get the name of the file
    const filename = this.getVideoNameFormat(taskCompletion, user);

    // Construct the upload request
    const request = new PutObjectCommand({ Bucket: this.bucket, Key: filename });
    return getSignedUrl(this.s3, request, { expiresIn: this.expiration });
  }

  private getVideoNameFormat(taskCompletion: TaskCompletion, user: User): string {
    // TODO: Determine site ID and descriptor ID
    return `${this.taskIteration}_SiteId_${user.id!}_${taskCompletion.taskId}`;
  }
}
