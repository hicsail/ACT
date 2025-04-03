import { ApiProperty } from "@nestjs/swagger";
import { Task } from "@prisma/client";

export class CreateTaskDto implements Omit<Task, 'id'> {
  @ApiProperty({ description: 'Category the task falls under' })
  category: string;

  @ApiProperty({ description: 'Title of the task' })
  title: string;

  @ApiProperty({ description: 'Preview text describing the task '})
  preview: string;

  @ApiProperty({ description: 'Preview image shown along with task' })
  previewImage: string;

  @ApiProperty({ description: 'Duration of the task in seconds' })
  timeSeconds: number;
}
