"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRouterError = exports.handleControllerError = void 0;
const api_response_dtos_1 = require("./dtos/api.response.dtos");
const http_status_codes_1 = require("http-status-codes");
const handleControllerError = (error) => {
    console.error(`controller error: ${error}`);
    if (error instanceof api_response_dtos_1.ApiResponse) {
        return error;
    }
    return {
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        body: error?.message ?? error,
    };
};
exports.handleControllerError = handleControllerError;
const handleRouterError = (error) => {
    console.error(`handler error: ${error}`);
    if (error instanceof api_response_dtos_1.ApiResponse) {
        return error;
    }
    return {
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        body: error?.message ?? error,
    };
};
exports.handleRouterError = handleRouterError;
//# sourceMappingURL=error.handlers.js.map