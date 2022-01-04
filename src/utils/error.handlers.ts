import { ApiResponse } from './dtos/api.response.dtos';
import { StatusCodes } from 'http-status-codes';

export const handleControllerError = (error: any, request?: any): ApiResponse => {
  return handleError(error, 'controller', request);
};

export const handleRouterError = (error: any, request?: any): ApiResponse => {
  return handleError(error, 'router', request);
};

const handleError = (error: any, context?: string, request?: any): ApiResponse => {
  const errorLog: ErrorLog = {
    request,
    error,
    context,
    date: new Date()
  };
  console.error(`${JSON.stringify(errorLog)}`);

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
    body: error?.message ?? error
  };
};

class ErrorLog {
  context?: string;
  date?: Date;
  request?: any;
  error?: any;
}
