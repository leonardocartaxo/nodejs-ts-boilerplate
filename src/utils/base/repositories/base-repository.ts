import {
  Pagination, PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE,
  PaginationOptions
} from '../../helpers/pagination';

export abstract class BaseRepository<Entity> {
  async create(entity: Entity): Promise<Entity> {
    return null;
  }

  async getById(id: string): Promise<Entity> {
    return null;
  }

  async list(
    filter,
    paginationOptions: PaginationOptions = {
      page: PAGINATION_DEFAULT_PAGE,
      limit: PAGINATION_DEFAULT_LIMIT,
    }): Promise<Pagination<Entity>> {
    return null;
  }

  async update(id: string, entity: Entity): Promise<Entity> {
    return null;
  }

  async delete(id: string): Promise<boolean> {
    return null;
  }
}
