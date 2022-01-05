import { Connection, createConnection } from 'mongoose';
import { Context } from 'aws-lambda';

import { AwsApiResponseUtils } from '../utils/aws.api.response.utils';
import { awsEventToApiRequest } from '../utils/aws.api.request.dtos';
import UsersMicroservice from '../../../microservices/users';
import Constants from '../../../utils/constants';
import { ApiResponse } from '../../../utils/dtos/api.response.dtos';

let connection!: Connection;
let usersMicroservice!: UsersMicroservice;

const init = async () => {
  if (!connection) {
    connection = await createConnection(Constants.getInstance().DB_MONGO_URI);
  }
  if (!usersMicroservice) {
    usersMicroservice = new UsersMicroservice(connection);
  }
};

export const create = async (event: any, context?: Context): Promise<ApiResponse> => {
  try {
    await init();
    const req = awsEventToApiRequest(event);

    const res = await usersMicroservice.create(req);

    return AwsApiResponseUtils.send(res);
  } catch (e) {
    return AwsApiResponseUtils.error(e);
  }
};

export const get = async (event: any, context?: Context): Promise<ApiResponse> => {
  try {
    await init();
    const req = awsEventToApiRequest(event);

    const res = await usersMicroservice.get(req);

    return AwsApiResponseUtils.send(res);
  } catch (e) {
    return AwsApiResponseUtils.error(e);
  }
};

export const getAll = async (event: any, context?: Context): Promise<ApiResponse> => {
  try {
    await init();
    const req = awsEventToApiRequest(event);

    const res = await usersMicroservice.getAll(req);

    return AwsApiResponseUtils.send(res);
  } catch (e) {
    return AwsApiResponseUtils.error(e);
  }
};
