import { BadRequestException } from "@nestjs/common";
import { Transform, TransformFnParams } from "class-transformer";
import { IsOptional } from "class-validator";


export interface SortField {
  field: string;
  direction: 'asc' | 'desc'
}

const sortTransform = (params: TransformFnParams): SortField => {
  try {
    // Try to parse the field as JSON
    const raw = JSON.parse(params.value);

    // Check if the result is an array
    if (!Array.isArray(raw)) {
      throw new BadRequestException(`Expected an array to be passed in for sort field`);
    }

    // Make sure the correct fields are present
    if (raw.length != 2) {
      throw new BadRequestException(`Expected the sort field array to only be 2 elements`);
    }

    const field = raw[0];
    const direction = raw[1];

    // Make sure direction is valid
    if (typeof field !== 'string' || typeof direction !== 'string') {
      throw new BadRequestException(`Expected sort field to be two string`);
    }

    // Validation the direction
    const directionLower = direction.toLowerCase();
    if (directionLower !== 'asc' && directionLower !== 'desc') {
      throw new BadRequestException(`Expected direction to either be asc or desc, got: ${direction}`);
    }

    return {
      field,
      direction: directionLower
    };

  } catch(error) {
    throw new BadRequestException(`Failed to parse sorted field: ${params.value}`)
  }
};


export class PaginationDTO {
  @IsOptional()
  @Transform((params) => sortTransform(params))
  sort: SortField;
}
