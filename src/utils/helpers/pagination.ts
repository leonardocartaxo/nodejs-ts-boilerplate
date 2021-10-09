import { IsInt, IsOptional } from 'class-validator';

export const PAGINATION_DEFAULT_PAGE = 1;
export const PAGINATION_DEFAULT_LIMIT = 10;

export class PaginationOptions {
  @IsInt()
  @IsOptional()
  page?: number;
  @IsInt()
  @IsOptional()
  limit?: number;
}

export class Pagination<Entity> {
  currentPage: number;
  itemsPerPage: number;
  currentPageItensCount: number;
  totalPages: number;
  totalItens: number;
  items: Entity[];
}
