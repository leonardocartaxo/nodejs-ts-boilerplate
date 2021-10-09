import {BaseRepository} from "./base-repository";
import {
  Pagination,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  PaginationOptions
} from "../../helpers/pagination";
import {Connection, FilterQuery, QueryOptions} from "mongoose";
import {getModelForClass} from "@typegoose/typegoose";
import {AnyParamConstructor, BeAnObject, ReturnModelType} from "@typegoose/typegoose/lib/types";
import {paginate} from "../../helpers/typegoose-pagination";

export class MongoBaseRepository<Entity> implements BaseRepository<Entity>{
  private readonly model: ReturnModelType<AnyParamConstructor<any>, BeAnObject>;

  constructor(private connection: Connection, private classModel: AnyParamConstructor<any>) {
    this.model = getModelForClass(this.classModel, { existingConnection: this.connection });
  }

  async create(entity: Entity): Promise<Entity> {
    return (await this.model.create(entity))?._doc;
  }

  async delete(id: string): Promise<boolean> {
    return this.model.findByIdAndDelete(id);
  }

  async list(filterQuery: FilterQuery<Entity>, paginationOptions: PaginationOptions = {
    page: PAGINATION_DEFAULT_PAGE,
    limit: PAGINATION_DEFAULT_LIMIT,
  }): Promise<Pagination<Entity>> {
    return await paginate(this.model, filterQuery, paginationOptions);
  }

  async getById(id: string): Promise<Entity> {
    return this.model.findById(id);
  }

  async update(id: string, entity: Entity): Promise<Entity> {
    return this.model.findByIdAndUpdate(id, entity);
  }
}
