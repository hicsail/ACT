import { IsArray, IsObject, IsOptional, MaxLength, MinLength } from "class-validator";

export class Pagination {
  sort: string[];

  filter: any;

  range: number[];
}
