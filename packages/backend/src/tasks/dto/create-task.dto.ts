import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDto implements Omit<Task, 'id'> {
  @ApiProperty({ description: 'Category the task falls under' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'The set the task should belong to' })
  @IsString()
  taskSetId: string;

  @ApiProperty({ description: 'Title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Preview text describing the task ' })
  @IsString()
  preview: string;

  @ApiProperty({ description: 'Preview image shown along with task' })
  @IsString()
  previewImage: string;

  @ApiProperty({ description: 'Duration of the task in seconds' })
  @IsNumber()
  timeSeconds: number;
}
