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
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3_PROVIDER } from 'src/s3/s3.provider';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { TaskCompletionId } from './dto/task-completion-id';

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

  findOne(taskCompletionId: TaskCompletionId): Promise<TaskCompletion | null> {
    return this.prismaService.taskCompletion.findUnique({
      where: { taskCompletionId: taskCompletionId }
    });
  }

  update(
    taskCompletionId: TaskCompletionId,
    updateTaskCompletionDto: UpdateTaskCompletionDto
  ): Promise<TaskCompletion | null> {
    return this.prismaService.taskCompletion.update({
      where: { taskCompletionId: taskCompletionId },
      data: updateTaskCompletionDto
    });
  }

  async remove(taskCompletionId: TaskCompletionId): Promise<void> {
    await this.prismaService.taskCompletion.delete({
      where: { taskCompletionId: taskCompletionId }
    });
  }

  async count(): Promise<number> {
    return this.prismaService.taskCompletion.count();
  }

  async findOrCreateByUserTask(findQuery: FindByUserTask): Promise<TaskCompletion> {
    // Check if one exists
    const existing = await this.prismaService.taskCompletion.findFirst({
      where: { userId: findQuery.user, taskId: findQuery.task }
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
      userId: findQuery.user
    });
  }

  async getUploadUrl(taskId: string, user: User): Promise<string> {
    // Get the task completion
    const taskCompletion = await this.findOne({
      taskId,
      userId: user.id!
    });
    if (!taskCompletion) {
      throw new BadRequestException(`Task Completion not found: ${taskId}`);
    }

    // Get the name of the file
    const filename = await this.getVideoNameFormat(taskCompletion, user);

    // Construct the upload request
    const request = new PutObjectCommand({ Bucket: this.bucket, Key: filename });
    return getSignedUrl(this.s3, request, { expiresIn: this.expiration });
  }

  async getDownloadUrl(video: string): Promise<string> {
    const request = new GetObjectCommand({ Bucket: this.bucket, Key: video });
    return getSignedUrl(this.s3, request, { expiresIn: this.expiration });
  }

  /**
   * Get the next task completion for the user to complete or null if non are left
   */
  async getNextTaskCompletion(user: User): Promise<TaskCompletion | null> {
    // First, make sure the task completions for the user exists
    await this.getOrCreateTaskCompletions(user);

    // Now we know all of the task completions exist, its just a matter of
    // getting the one that matches the following criteria
    //
    // 1. From the active task set
    // 2. From the list of incomplete task completions
    // 3. Ordered by the task's order field
    return this.prismaService.taskCompletion.findFirst({
      where: {
        complete: false,
        userId: user.id!,
        task: {
          taskSet: {
            active: true
          }
        }
      },
      orderBy: {
        task: {
          order: 'asc'
        }
      }
    });
  }

  async deleteVideo(video: string): Promise<void> {
    const request = new DeleteObjectCommand({ Bucket: this.bucket, Key: video });
    await this.s3.send(request);
  }

  private async getVideoNameFormat(taskCompletion: TaskCompletion, user: User): Promise<string> {
    // Try to get the task ID
    const task = await this.taskService.findOne(taskCompletion.taskId);
    if (!task) {
      console.error(`Missing task id ${taskCompletion.taskId}`);
    }
    const descriptor = task ? task.descriptor : 'MISSING';
    return this.getVideoNameFormatTask(user, descriptor);
  }

  private getVideoNameFormatTask(user: User, taskDescriptor: string): string {
    // Try to get the studyID and site ID off of the user object
    const studyID = user.affiliation ? user.affiliation : user.id!;
    const site = user.location ? user.location : 'UNKNOWN';

    return `${this.taskIteration}_${site}_${studyID}_${taskDescriptor}.webm`;
  }

  /**
   * Gets or creates all the task completions based on the active task set
   */
  private async getOrCreateTaskCompletions(user: User): Promise<TaskCompletion[]> {
    const activeTasks = await this.taskService.getActiveTasks();

    return await this.prismaService.$transaction(
      activeTasks.map((task) =>
        this.prismaService.taskCompletion.upsert({
          where: { taskCompletionId: { taskId: task.id, userId: user.id! } },
          update: {},
          create: {
            taskId: task.id,
            userId: user.id!,
            complete: false,
            video: this.getVideoNameFormatTask(user, task.descriptor)
          }
        })
      )
    );
  }
}
