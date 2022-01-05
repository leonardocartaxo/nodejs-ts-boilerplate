import { BaseRepository } from './base-repository';
import {
  Pagination,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  PaginationOptions
} from '../../helpers/pagination';
import { Connection, FilterQuery, QueryOptions } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { paginate } from '../../helpers/typegoose-pagination';

export class MongoBaseRepository<Entity> implements BaseRepository<Entity> {
  private readonly model: ReturnModelType<AnyParamConstructor<any>, BeAnObject>;

  constructor (
		private readonly connection: Connection,
		private readonly classModel: AnyParamConstructor<any>,
		private readonly collectionName: string
	) {
    this.model = getModelForClass(
			this.classModel,
      {
        existingConnection: this.connection,
        schemaOptions: {
          collection: collectionName
        }
      }
		);
  }

  async create (entity: Entity): Promise<Entity> {
    const entitySaved = await this.model.create(entity);

    return entitySaved?._doc;
  }

  async delete (id: string): Promise<boolean> {
    return this.model.findByIdAndDelete(id);
  }

  async list (filterQuery: FilterQuery<Entity>, paginationOptions: PaginationOptions = {
    page: PAGINATION_DEFAULT_PAGE,
    limit: PAGINATION_DEFAULT_LIMIT
  }): Promise<Pagination<Entity>> {
    return paginate(this.model, filterQuery, paginationOptions);
  }

  async getById (id: string): Promise<Entity> {
    const entity = await this.model.findById(id);

    return entity?._doc;
  }

  async update (id: string, entity: Entity): Promise<Entity> {
    return this.model.findByIdAndUpdate(id, entity);
  }
}
