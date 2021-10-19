import { ApiResponse } from './dtos/api.response.dtos';
import { StatusCodes } from 'http-status-codes';

export const handleControllerError = (error: any): ApiResponse => {
  console.error(`controller error: ${error}`);

  return handleError(error);
};

export const handleRouterError = (error: any): ApiResponse => {
  console.error(`handler error: ${error instanceof Object ? JSON.stringify(error) : error }`);

  return handleError(error);
};

const handleError = (error: any): ApiResponse => {
  if (error instanceof ApiResponse) {
    return error;
  }

  if (error?.response?.status) {
    const apiResponse = new ApiResponse();
    apiResponse.statusCode = error?.response?.status;
    apiResponse.body = error?.response?.data;

    return apiResponse;
  }

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: error?.message ?? error,
  };
};
