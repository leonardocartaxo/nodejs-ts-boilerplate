export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type BaseEntityKeys =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt';
