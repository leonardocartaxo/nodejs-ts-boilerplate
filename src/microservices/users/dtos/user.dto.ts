import { BaseEntityKeys } from '../../../utils/base/entities/base-entity';
import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserCreateDto implements Omit<User, BaseEntityKeys> {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  document: string;
}

export class UserUpdateDto implements Omit<User, BaseEntityKeys> {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  document: string;
}

export class UserDto extends User {}

export class UserGetParamsDto {
  @IsString()
  id: string;
}

export const toUserDto = (entity: User): UserDto => {
  return {
    ...entity
  };
};
