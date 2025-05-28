import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({ description: 'Task description given to the user' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Problem overview for the user' })
  @IsString()
  problemDescription: string;

  @ApiProperty({ description: 'Additional details for the user to follow' })
  @IsString()
  taskDetails: string;

  @ApiProperty({ description: 'Prompts for the user to meet' })
  @IsArray()
  @IsString({ each: true })
  prompts: string[];

  @ApiProperty({ description: 'Order the tasks are presented to the user' })
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'User provided ID for the task' })
  @IsString()
  descriptor: string;

  @ApiProperty({ description: 'Optional content image' })
  @IsString()
  @IsOptional()
  contentImage: string | null;
}
