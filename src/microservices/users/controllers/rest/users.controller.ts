import {BaseController} from "../../../../utils/base/controllers/base-controller";
import {UserCreateDto, UserDto, UserUpdateDto} from "../../dtos/user.dto";
import {User} from "../../entities/user.entity";
import {UsersService} from "../../services/users.service";

export class UsersController extends BaseController<User, UserDto, UserCreateDto, UserUpdateDto> {
  constructor(usersService: UsersService) {
    super(usersService);
  }
}
