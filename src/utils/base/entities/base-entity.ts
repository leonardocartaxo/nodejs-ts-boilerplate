export abstract class BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type BaseEntityKeys =
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt';
