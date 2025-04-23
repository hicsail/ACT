import { BadRequestException } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional } from 'class-validator';

export interface SortField {
  field: string;
  direction: 'asc' | 'desc';
}

export interface RangeField {
  start: number;
  end: number;
}

export interface FilterField {
  [field: string]: string;
}

const sortTransform = (params: TransformFnParams): SortField => {
  let raw: any;
  try {
    // Try to parse the field as JSON
    raw = JSON.parse(params.value);
  } catch (error) {
    throw new BadRequestException(`Failed to parse sorted field: ${params.value}`);
  }

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
};

const rangeTransform = (params: TransformFnParams): RangeField => {
  let raw: any;
  try {
    // Try to parse the field as JSON
    raw = JSON.parse(params.value);
  } catch (error) {
    console.log(error);
    throw new BadRequestException(`Failed to parse range field: ${params.value}`);
  }

  // Check if the result is an array
  if (!Array.isArray(raw)) {
    throw new BadRequestException(`Expected an array to be passed in for sort field`);
  }

  // Make sure the correct fields are present
  if (raw.length != 2) {
    throw new BadRequestException(`Expected the sort field array to only be 2 elements`);
  }

  const start = raw[0];
  const end = raw[1];

  // Make sure direction is valid
  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new BadRequestException(`Expected sort field to be two string`);
  }

  if (end < start) {
    throw new BadRequestException('Order for range needs to be start, end');
  }

  return {
    start,
    end
  };
};

const filterTransform = (params: TransformFnParams): FilterField => {
  let raw: any;
  try {
    // Try to parse the field as JSON
    raw = JSON.parse(params.value);
  } catch (error) {
    console.log(error);
    throw new BadRequestException(`Failed to parse range field: ${params.value}`);
  }

  // Check if the result is an array
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    throw new BadRequestException(`Expected an object to be passed in`);
  }

  // If the subfield is an array, need to transform the payload to
  // match Prism's format
  for (const key in raw) {
    if (Array.isArray(raw[key])) {
      raw[key] = { in: raw[key] };
    }
  }

  return raw;
};

export class PaginationDTO {
  @IsOptional()
  @Transform(sortTransform)
  sort?: SortField;

  @IsOptional()
  @Transform(rangeTransform)
  range?: RangeField;

  @IsOptional()
  @Transform(filterTransform)
  filter?: FilterField;
}

export const makeContentRange = (name: string, pagination: PaginationDTO, total: number): string => {
  if (pagination.range) {
    return `${name} ${pagination.range.start}-${pagination.range.end > total ? total - 1 : pagination.range.end}/${total}`;
  }
  return `${name} ${0}-${total - 1}/${total}`;
};
