"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsApiResponseUtils = void 0;
const http_status_codes_1 = require("http-status-codes");
const api_response_dtos_1 = require("../../../utils/dtos/api.response.dtos");
class AwsApiResult {
    statusCode;
    code;
    message;
    body;
    constructor(body, statusCode = http_status_codes_1.StatusCodes.OK, code, message) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
        this.body = body;
    }
    toOkResponse() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify(this.body, null, 4),
        };
    }
    toErrorResponse() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                code: this.code,
                message: this.message,
                data: this.body,
            }, null, 4),
        };
    }
}
class AwsApiResponseUtils {
    static send(data) {
        const body = (data instanceof api_response_dtos_1.ApiResponse) ? data.body : data;
        return new AwsApiResult(body).toOkResponse();
    }
    static error(message, stack, status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, code = 1000) {
        const result = new AwsApiResult(stack, status, code, message);
        const errorResponse = result.toErrorResponse();
        console.error(errorResponse);
        return errorResponse;
    }
}
exports.AwsApiResponseUtils = AwsApiResponseUtils;
//# sourceMappingURL=aws.api.response.utils.js.map