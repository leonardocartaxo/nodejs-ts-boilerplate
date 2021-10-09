import {AnyParamConstructor, BeAnObject, ReturnModelType} from "@typegoose/typegoose/lib/types";
import {PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE, PaginationOptions} from "./pagination";
import {FilterQuery} from "mongoose";

export const paginate = async <Entity>(
  model: ReturnModelType<AnyParamConstructor<any>, BeAnObject>,
  filterQuery: FilterQuery<Entity>,
  paginationOptions: PaginationOptions = {
    page: PAGINATION_DEFAULT_PAGE,
    limit: PAGINATION_DEFAULT_LIMIT,
  }
) => {
  const cursor = model.find(filterQuery);
  const totalItens = await cursor.count();
  const totalPages = Math.ceil(totalItens / paginationOptions.limit);
  const items = await model.find(filterQuery)
    .skip((paginationOptions.page - 1) * paginationOptions.limit)
    .limit(paginationOptions.limit);

  return {
    currentPage: paginationOptions.page,
    itemsPerPage: paginationOptions.limit ?? PAGINATION_DEFAULT_LIMIT,
    currentPageItensCount: items.length,
    totalItens,
    totalPages,
    items,
  }
}
