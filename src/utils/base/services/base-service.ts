import {
  Pagination,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  PaginationOptions
} from '../../helpers/pagination';
import {BaseRepository} from "../repositories/base-repository";

export abstract class BaseService<Entity, Dto, CreateDto, UpdateDto> {

  protected constructor(
    private baseRepository: BaseRepository<Entity>,
    private mapperEntityToDto: Function
  ) {}

  async create(createDto: CreateDto): Promise<Dto> {
    const entity = await this.baseRepository.create(createDto as unknown as Entity);

    return this.mapperEntityToDto(entity);
  }

  async get(id: string): Promise<Dto> {
    const entity = await this.baseRepository.getById(id);

    return this.mapperEntityToDto(entity);
  }

  async getAll(
    paginationOptions: PaginationOptions = {
    page: PAGINATION_DEFAULT_PAGE,
    limit: PAGINATION_DEFAULT_LIMIT,
    }, filter?: any
  ): Promise<Pagination<Dto>> {
    const pagination = await this.baseRepository.list(filter, paginationOptions);

    return {
      currentPage: pagination.currentPage,
      currentPageItensCount: pagination.currentPageItensCount,
      itemsPerPage: paginationOptions.limit ?? PAGINATION_DEFAULT_LIMIT,
      totalPages: pagination.totalPages,
      totalItens: pagination.totalItens,
      items: pagination.items.map((it) => this.mapperEntityToDto(it))
    };
  }

  async update(id: string, updateDto: UpdateDto): Promise<Dto> {
    const entity = await this.baseRepository.update(id, updateDto as unknown as Entity);

    return this.mapperEntityToDto(entity);
  }

  async delete(id: string): Promise<boolean> {
    return this.baseRepository.delete(id);
  }
}
