import { prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { User } from '../entities/user.entity';

export class UserModel implements Omit<User, '_id'> {
  // @prop({ required: false })
  _id?: ObjectId;
  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop({ required: false })
  deletedAt: Date | null;

  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  document: string;

  @prop()
  address: string;

  public get id (): string {
    return this._id.toHexString();
  }
}
