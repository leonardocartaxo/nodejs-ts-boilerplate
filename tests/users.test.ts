import * as usersMicroservice from '../src/microservices/users';
import * as dotenv from "dotenv";
import * as path from "path";
import {UserCreateDto, UserDto} from "../src/microservices/users/dtos/user.dto";
import {Pagination} from "../src/utils/helpers/pagination";

const dotenvPath = path.join(__dirname, '../', '.env');
dotenv.config({
  path: dotenvPath,
});

describe('Test user microservice', () => {
  test('test create an user', async () => {
    const userCreateDto:UserCreateDto ={
      name: 'me',
      address: '123 main street',
      document: '15969462241417'
    }
    const userDto = await usersMicroservice.create({
      body: userCreateDto
    }) as UserDto;

    expect(userDto.document).toEqual(userCreateDto.document);
  });

  test('test get an user', async () => {
    const id = '44155422';
    const userDto = await usersMicroservice.get({
      params: {
        id,
      },
    });

    expect(userDto).toBeTruthy();
  });

  test('test list users', async () => {
    const users = await usersMicroservice.getAll({}) as Pagination<UserDto>;

    expect(users.currentPage).toBeGreaterThanOrEqual(1);
  });
});
