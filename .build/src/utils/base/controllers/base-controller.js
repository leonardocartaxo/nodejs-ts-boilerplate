"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const pagination_1 = require("../../helpers/pagination");
const error_handlers_1 = require("../../error.handlers");
class BaseController {
    baseService;
    constructor(baseService) {
        this.baseService = baseService;
    }
    async create(createDto) {
        try {
            return await this.baseService.create(createDto);
        }
        catch (error) {
            (0, error_handlers_1.handleControllerError)(error);
        }
    }
    async get(id) {
        try {
            return await this.baseService.get(id);
        }
        catch (error) {
            (0, error_handlers_1.handleControllerError)(error);
        }
    }
    async getAll(paginationOptions = {
        page: pagination_1.PAGINATION_DEFAULT_PAGE,
        limit: pagination_1.PAGINATION_DEFAULT_LIMIT,
    }) {
        try {
            return await this.baseService.getAll(paginationOptions);
        }
        catch (error) {
            (0, error_handlers_1.handleControllerError)(error);
        }
    }
    async update(id, updateDto) {
        try {
            return await this.baseService.update(id, updateDto);
        }
        catch (error) {
            (0, error_handlers_1.handleControllerError)(error);
        }
    }
    async delete(id) {
        try {
            return await this.baseService.delete(id);
        }
        catch (error) {
            (0, error_handlers_1.handleControllerError)(error);
            return null;
        }
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base-controller.js.map