import {Context, Handler} from 'aws-lambda';

import * as usersMicroservice from '../../../microservices/users';
import {AwsApiResponseUtils} from '../utils/aws.api.response.utils';
import {awsEventToApiRequest} from '../utils/aws.api.request.dtos';
import {Connection} from "mongoose";
import {DBManager} from "../../../utils/helpers/db-manager";

let connection: Connection;

const init = async () => {
  if (!connection) {
    connection = await DBManager.getMongoConnection();
  }
};

export const create: Handler = async (event: any, context: Context) => {
  try {
    await init();
    const req = awsEventToApiRequest(event);

    const res = await usersMicroservice.create(req, connection);

    return AwsApiResponseUtils.send(res);
  } catch (e) {
    return AwsApiResponseUtils.error(e);
  }
};

export const get: Handler = async (event: any, context: Context) => {
  try {
    await init();
    const req = awsEventToApiRequest(event);

    const res = await usersMicroservice.get(req, connection);

    return AwsApiResponseUtils.send(res);
  } catch (e) {
    return AwsApiResponseUtils.error(e);
  }
};

export const getAll: Handler = async (event: any, context: Context) => {
  try {
    await init();
    const req = awsEventToApiRequest(event);

    const res = await usersMicroservice.getAll(req, connection);

    return AwsApiResponseUtils.send(res);
  } catch (e) {
    return AwsApiResponseUtils.error(e);
  }
};
