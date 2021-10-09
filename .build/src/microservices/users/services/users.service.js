"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const base_service_1 = require("../../../utils/base/services/base-service");
const user_dto_1 = require("../dtos/user.dto");
class UsersService extends base_service_1.BaseService {
    usersRepository;
    constructor(usersRepository) {
        super(usersRepository, user_dto_1.toUserDto);
        this.usersRepository = usersRepository;
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map