"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const pagination_1 = require("../../helpers/pagination");
class BaseRepository {
    async create(entity) {
        return null;
    }
    async getById(id) {
        return null;
    }
    async list(filter, paginationOptions = {
        page: pagination_1.PAGINATION_DEFAULT_PAGE,
        limit: pagination_1.PAGINATION_DEFAULT_LIMIT,
    }) {
        return null;
    }
    async update(id, entity) {
        return null;
    }
    async delete(id) {
        return null;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base-repository.js.map