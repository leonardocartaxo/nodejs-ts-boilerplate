import {MongoBaseRepository} from "../../../utils/base/repositories/mongo-base-repository";
import {Connection} from "mongoose";
import {User} from "../entities/user.entity";
import {UserModel} from "../models/user.model";

export class UsersRepository extends MongoBaseRepository<User> {
  constructor(private connectionModel: Connection) {
    super(connectionModel, UserModel);
  }
}
