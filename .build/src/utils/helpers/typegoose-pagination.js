"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const pagination_1 = require("./pagination");
const paginate = async (model, filterQuery, paginationOptions = {
    page: pagination_1.PAGINATION_DEFAULT_PAGE,
    limit: pagination_1.PAGINATION_DEFAULT_LIMIT,
}) => {
    const cursor = model.find(filterQuery);
    const totalItens = await cursor.count();
    const totalPages = Math.ceil(totalItens / paginationOptions.limit);
    const items = await model.find(filterQuery)
        .skip((paginationOptions.page - 1) * paginationOptions.limit)
        .limit(paginationOptions.limit);
    return {
        currentPage: paginationOptions.page,
        itemsPerPage: paginationOptions.limit ?? pagination_1.PAGINATION_DEFAULT_LIMIT,
        currentPageItensCount: items.length,
        totalItens,
        totalPages,
        items,
    };
};
exports.paginate = paginate;
//# sourceMappingURL=typegoose-pagination.js.map