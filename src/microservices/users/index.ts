import { Connection } from 'mongoose';
import { RequestValidator } from '../../utils/request.validator';
import { ApiRequest } from '../../utils/dtos/api.request.dtos';
import { handleRouterError } from '../../utils/error.handlers';
import { ApiResponse } from '../../utils/dtos/api.response.dtos';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/rest/users.controller';
import { UserGetParamsDto, UserDto, UserCreateDto } from './dtos/user.dto';
import { Pagination } from '../../utils/helpers/pagination';

export default class UsersMicroservice {
  private readonly usersRepository!: UsersRepository;
  private readonly usersService!: UsersService;
  private readonly usersController!: UsersController;

  constructor (dbConnection: Connection) {
    this.usersRepository = new UsersRepository(dbConnection);
    this.usersService = new UsersService(this.usersRepository);
    this.usersController = new UsersController(this.usersService);
  }

  async create (req: ApiRequest): Promise<UserDto | ApiResponse> {
    try {
      await RequestValidator.validate({ req, reqBodySchema: UserCreateDto, authenticate: false });

      const body = req.body as UserCreateDto;

      return await this.usersController.create(body);
    } catch (error) {
      return handleRouterError(error);
    }
  }

  async get (req: ApiRequest): Promise<UserDto | ApiResponse> {
    try {
      await RequestValidator.validate({ req, reqParamsSchema: UserGetParamsDto, authenticate: false });

      const params = req.params as UserGetParamsDto;

      return await this.usersController.get(params.id);
    } catch (error) {
      return handleRouterError(error);
    }
  }

  async getAll (req: ApiRequest): Promise<Pagination<UserDto> | ApiResponse> {
    try {
      await RequestValidator.validate({ req, authenticate: false });

      return await this.usersController.getAll();
    } catch (error) {
      return handleRouterError(error);
    }
  }
}

// let usersRepository!: UsersRepository;
// let usersService!: UsersService;
// let usersController!: UsersController;
//
// const init = async (dbConnection?: Connection): Promise<void> => {
//   if (!dbConnection) {
//     dbConnection = await DBManager.getMongoConnection();
//   }
//   if (!usersRepository) {
//     usersRepository = new UsersRepository(dbConnection);
//   }
//   if (!usersService) {
//     usersService = new UsersService(usersRepository);
//   }
//   if (!usersController) {
//     usersController = new UsersController(usersService);
//   }
// };
//
// export const create = async (req: ApiRequest, dbConnection?: Connection): Promise<UserDto | ApiResponse> => {
//   try {
//     await RequestValidator.validate({ req, reqBodySchema: UserCreateDto, authenticate: false });
//     await init(dbConnection);
//
//     const body = req.body as UserCreateDto;
//
//     return await usersController.create(body);
//   } catch (error) {
//     return handleRouterError(error);
//   }
// };
//
// export const get = async (req: ApiRequest, dbConnection?: Connection): Promise<UserDto | ApiResponse> => {
//   try {
//     await RequestValidator.validate({ req, reqParamsSchema: UserGetParamsDto, authenticate: false });
//     await init(dbConnection);
//
//     const params = req.params as UserGetParamsDto;
//
//     return await usersController.get(params.id);
//   } catch (error) {
//     return handleRouterError(error);
//   }
// };
//
// export const getAll = async (
//   req: ApiRequest, dbConnection?: Connection
// ): Promise<Pagination<UserDto> | ApiResponse> => {
//   try {
//     await RequestValidator.validate({ req, authenticate: false });
//     await init(dbConnection);
//
//     return await usersController.getAll();
//   } catch (error) {
//     return handleRouterError(error);
//   }
// };
