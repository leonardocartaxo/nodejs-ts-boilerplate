"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoBaseRepository = void 0;
const pagination_1 = require("../../helpers/pagination");
const typegoose_1 = require("@typegoose/typegoose");
const typegoose_pagination_1 = require("../../helpers/typegoose-pagination");
class MongoBaseRepository {
    connection;
    classModel;
    model;
    constructor(connection, classModel) {
        this.connection = connection;
        this.classModel = classModel;
        this.model = (0, typegoose_1.getModelForClass)(this.classModel, { existingConnection: this.connection });
    }
    async create(entity) {
        return this.model.create(entity);
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
    async list(filterQuery, paginationOptions = {
        page: pagination_1.PAGINATION_DEFAULT_PAGE,
        limit: pagination_1.PAGINATION_DEFAULT_LIMIT,
    }) {
        return await (0, typegoose_pagination_1.paginate)(this.model, filterQuery, paginationOptions);
    }
    async getById(id) {
        return this.model.findById(id);
    }
    async update(id, entity) {
        return this.model.findByIdAndUpdate(id, entity);
    }
}
exports.MongoBaseRepository = MongoBaseRepository;
//# sourceMappingURL=mongo-base-repository.js.map