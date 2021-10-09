"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const mongo_base_repository_1 = require("../../../utils/base/repositories/mongo-base-repository");
const user_model_1 = require("../models/user.model");
class UsersRepository extends mongo_base_repository_1.MongoBaseRepository {
    connectionModel;
    constructor(connectionModel) {
        super(connectionModel, user_model_1.UserModel);
        this.connectionModel = connectionModel;
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map