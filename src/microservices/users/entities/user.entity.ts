import { BaseEntity } from '../../../utils/base/entities/base-entity';

export class User extends BaseEntity {
  name: string;
  document: string;
  address: string;
}
