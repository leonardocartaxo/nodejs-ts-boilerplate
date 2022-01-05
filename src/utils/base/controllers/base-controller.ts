import {
  Pagination,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  PaginationOptions
} from '../../helpers/pagination';
import { handleControllerError } from '../../error.handlers';
import { BaseService } from '../services/base-service';
import { ApiResponse } from '../../dtos/api.response.dtos';

export abstract class BaseController<Entity, Dto, CreateDto, UpdateDto> {
  protected constructor (private readonly baseService: BaseService<Entity, Dto, CreateDto, UpdateDto>) {
  }

  public async create (createDto: CreateDto): Promise<Dto | ApiResponse> {
    try {
      return await this.baseService.create(createDto);
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async get (id: string): Promise<Dto | ApiResponse> {
    try {
      return await this.baseService.get(id);
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async getAll (paginationOptions: PaginationOptions = {
    page: PAGINATION_DEFAULT_PAGE,
    limit: PAGINATION_DEFAULT_LIMIT
  }): Promise<Pagination<Dto>> {
    try {
      return await this.baseService.getAll(paginationOptions);
    } catch (error) {
      handleControllerError(error);
    }
  }

  async update (id: string, updateDto: UpdateDto): Promise<Dto> {
    try {
      return await this.baseService.update(id, updateDto);
    } catch (error) {
      handleControllerError(error);
    }
  }

  async delete (id: string): Promise<boolean> {
    try {
      return await this.baseService.delete(id);
    } catch (error) {
      handleControllerError(error);
      return null;
    }
  }
}
