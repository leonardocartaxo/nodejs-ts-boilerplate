import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../../utils/dtos/api.response.dtos';

class AwsApiResult {
  constructor (
		private readonly body?: any,
		private readonly statusCode = StatusCodes.OK,
		private readonly code?: number,
		private readonly message?: string
	) {}

  toResponse (): ApiResponse {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.body, null, 4)
    };
  }

  toErrorResponse (): ApiResponse {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.body
      },null, 4)
    };
  }

  toPdfResponse () {
    return {
      statusCode: this.statusCode,
      headers: {
        'Content-type': 'application/pdf'
      },
      body: this.body,
      isBase64Encoded: true
    };
  }
}

export class AwsApiResponseUtils {
  static send (data: any): ApiResponse {
    const body = (data instanceof ApiResponse) ? data.body : data;

    return new AwsApiResult(body, data?.statusCode).toResponse();
  }

  static sendPdf (data: Buffer): ApiResponse {
    const body = (data instanceof ApiResponse) ? data.body : data;

    return new AwsApiResult(body).toPdfResponse();
  }

  static error (
    message: string, stack?: any, status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, code: number = 1000
  ): ApiResponse {
    const result = new AwsApiResult(stack, status, code, message);

    const errorResponse = result.toErrorResponse();

    console.error(errorResponse);

    return errorResponse;
  }
}
