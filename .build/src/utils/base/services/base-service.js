"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const pagination_1 = require("../../helpers/pagination");
class BaseService {
    baseRepository;
    mapperEntityToDto;
    constructor(baseRepository, mapperEntityToDto) {
        this.baseRepository = baseRepository;
        this.mapperEntityToDto = mapperEntityToDto;
    }
    async create(createDto) {
        const entity = await this.baseRepository.create(createDto);
        return this.mapperEntityToDto(entity);
    }
    async get(id) {
        const entity = await this.baseRepository.getById(id);
        return this.mapperEntityToDto(entity);
    }
    async getAll(paginationOptions = {
        page: pagination_1.PAGINATION_DEFAULT_PAGE,
        limit: pagination_1.PAGINATION_DEFAULT_LIMIT,
    }, filter) {
        const pagination = await this.baseRepository.list(filter, paginationOptions);
        return {
            currentPage: pagination.currentPage,
            currentPageItensCount: pagination.currentPageItensCount,
            itemsPerPage: paginationOptions.limit ?? pagination_1.PAGINATION_DEFAULT_LIMIT,
            totalPages: pagination.totalPages,
            totalItens: pagination.totalItens,
            items: pagination.items.map((it) => this.mapperEntityToDto(it))
        };
    }
    async update(id, updateDto) {
        const entity = await this.baseRepository.update(id, updateDto);
        return this.mapperEntityToDto(entity);
    }
    async delete(id) {
        return this.baseRepository.delete(id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base-service.js.map