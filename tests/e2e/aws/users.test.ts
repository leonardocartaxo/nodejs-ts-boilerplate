import * as dotenv from 'dotenv';
import * as path from 'path';
import * as usersHandler from '../../../src/main/aws/handlers/usersHandler';
import { UserCreateDto, UserDto } from '../../../src/microservices/users/dtos/user.dto';
import { Pagination } from '../../../src/utils/helpers/pagination';
import { getMongoInMemoryUri, stopMongoInMemory } from '../../utils/mongo-in-memory-db-manager';
import Constants from '../../../src/utils/constants';

const dotenvPath = path.join(__dirname, '../../../', '.env');
dotenv.config({
  path: dotenvPath
});

describe('Test user AWS handler', () => {
  beforeEach(async () => {
    Constants.getInstance().DB_MONGO_URI = await getMongoInMemoryUri();
  });

  afterEach(async () => {
    await stopMongoInMemory();
  });

  const userCreateTemplateDto: UserCreateDto = {
    name: 'me',
    address: '123 main street',
    document: '15969462241417'
  };

  const createUser = async (userCreateDto: UserCreateDto): Promise<UserDto> => {
    const res = await usersHandler.create({
      body: userCreateDto
    });

    return JSON.parse(res?.body) as UserDto;
  };

  const testCreateUser = async (userCreateDto: UserCreateDto) => {
    const userDto = await createUser(userCreateDto);

    expect(userDto?.document).toEqual(userCreateDto?.document);
  };

  test('test create an user', async () => {
    await testCreateUser(userCreateTemplateDto);
  });

  test('test get an user', async () => {
    const userDto = await createUser(userCreateTemplateDto);
    const res = await usersHandler.get({
      pathParameters: {
        id: userDto._id
      }
    });

    const user = JSON.parse(res?.body) as UserDto;

    expect(userDto?._id).toEqual(user?._id);
  });

  test('test list users', async () => {
    await createUser(userCreateTemplateDto);
    await createUser({ ...userCreateTemplateDto, document: '123' });
    await createUser({ ...userCreateTemplateDto, document: '456' });
    const res = await usersHandler.getAll({});

    const users = JSON.parse(res?.body) as Pagination<UserDto>;

    expect(users.totalItems).toEqual(3);
  });
});
