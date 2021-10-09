"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.get = exports.create = void 0;
const request_validator_1 = require("../../utils/request.validator");
const error_handlers_1 = require("../../utils/error.handlers");
const users_repository_1 = require("./repositories/users.repository");
const users_service_1 = require("./services/users.service");
const users_controller_1 = require("./controllers/rest/users.controller");
const user_dto_1 = require("./dtos/user.dto");
const db_manager_1 = require("../../utils/helpers/db-manager");
let usersRepository;
let usersService;
let usersController;
const init = async (dbConnection) => {
    if (!dbConnection) {
        dbConnection = await db_manager_1.DBManager.getMongoConnection();
    }
    if (!usersRepository) {
        usersRepository = new users_repository_1.UsersRepository(dbConnection);
    }
    if (!usersService) {
        usersService = new users_service_1.UsersService(usersRepository);
    }
    if (!usersController) {
        usersController = new users_controller_1.UsersController(usersService);
    }
};
const create = async (req, dbConnection) => {
    try {
        await request_validator_1.RequestValidator.validate({ req, reqBodySchema: user_dto_1.UserCreateDto, authenticate: false });
        await init(dbConnection);
        const body = req.body;
        return await usersController.create(body);
    }
    catch (error) {
        return (0, error_handlers_1.handleRouterError)(error);
    }
};
exports.create = create;
const get = async (req, dbConnection) => {
    try {
        await request_validator_1.RequestValidator.validate({ req, reqParamsSchema: user_dto_1.UserGetParamsDto, authenticate: false });
        await init(dbConnection);
        const params = req.params;
        return await usersController.get(params.id);
    }
    catch (error) {
        return (0, error_handlers_1.handleRouterError)(error);
    }
};
exports.get = get;
const getAll = async (req, dbConnection) => {
    try {
        await request_validator_1.RequestValidator.validate({ req, authenticate: false });
        await init(dbConnection);
        return await usersController.getAll();
    }
    catch (error) {
        return (0, error_handlers_1.handleRouterError)(error);
    }
};
exports.getAll = getAll;
//# sourceMappingURL=index.js.map