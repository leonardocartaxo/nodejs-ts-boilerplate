
import {BaseService} from "../../../utils/base/services/base-service";
import {toUserDto, UserCreateDto, UserDto, UserUpdateDto} from "../dtos/user.dto";
import {UsersRepository} from "../repositories/users.repository";
import {User} from "../entities/user.entity";

export class UsersService extends BaseService<User, UserDto, UserCreateDto, UserUpdateDto>{
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository, toUserDto);
  }
}
