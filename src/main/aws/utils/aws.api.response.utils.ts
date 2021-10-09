import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../../utils/dtos/api.response.dtos';

class AwsApiResult {
  private readonly statusCode: number;
  private readonly code: number;
  private readonly message: string;
  private readonly body?: any;

  constructor(body?: any, statusCode = StatusCodes.OK, code?: number, message?: string) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.body = body;
  }

  toOkResponse(): ApiResponse {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.body, null, 4),
    };
  }

  toErrorResponse(): ApiResponse {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.body,
      },                   null, 4),
    };
  }
}

export class AwsApiResponseUtils {
  static send(data: any): ApiResponse {
    const body = (data instanceof ApiResponse) ? data.body : data;

    return new AwsApiResult(body).toOkResponse();
  }

  static error(
    message: string, stack?: any, status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, code: number = 1000,
  ): ApiResponse {
    const result = new AwsApiResult(stack, status, code, message);

    const errorResponse = result.toErrorResponse();

    console.error(errorResponse);

    return errorResponse;
  }
}
