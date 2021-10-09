import { ApiResponse } from './dtos/api.response.dtos';
import { StatusCodes } from 'http-status-codes';

export const handleControllerError = (error: any): ApiResponse => {
  console.error(`controller error: ${error}`);

  if (error instanceof ApiResponse) {
    return error;
  }

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: error?.message ?? error,
  };
};

export const handleRouterError = (error: any): ApiResponse => {
  console.error(`handler error: ${error}`);

  if (error instanceof ApiResponse) {
    return error;
  }

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: error?.message ?? error,
  };
};
