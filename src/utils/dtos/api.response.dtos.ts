export class ApiResponseBody {
  code?: number;
  message?: string;
  data?: object;
}

export class ApiResponse {
  statusCode: number;
  body: any;
}
