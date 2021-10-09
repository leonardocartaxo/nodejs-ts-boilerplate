"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
const class_transformer_validator_1 = require("class-transformer-validator");
const http_status_codes_1 = require("http-status-codes");
class RequestValidator {
    static async getValidSchema(classType, body) {
        return (0, class_transformer_validator_1.transformAndValidate)(classType, body, { validator: { whitelist: true } });
    }
    static async validate(schema) {
        if (schema?.authenticate) {
            const token = schema?.req?.headers?.Authorization ?? '';
            if (!token?.includes(process.env.AUTHENTICATION_TOKEN)) {
                throw {
                    statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                };
            }
        }
        if (schema.reqParamsSchema) {
            const params = schema.req.params instanceof Object ? schema.req.params : JSON.parse(schema.req.params);
            schema.req.params = await this.getValidSchema(schema.reqParamsSchema, params);
        }
        else {
            schema.req.params = undefined;
        }
        if (schema.reqBodySchema) {
            const body = schema.req.body instanceof Object ? schema.req.body : JSON.parse(schema.req.body);
            schema.req.body = await this.getValidSchema(schema.reqBodySchema, body);
        }
        else {
            schema.req.body = undefined;
        }
        if (schema.reqQuerySchema && schema.req.query) {
            if (schema.req?.query?.page) {
                schema.req.query.page = Number(schema.req.query.page);
            }
            if (schema.req?.query?.limit) {
                schema.req.query.limit = Number(schema.req.query.limit);
            }
            schema.req.query = await this.getValidSchema(schema.reqQuerySchema, schema.req.query);
        }
        else {
            schema.req.query = undefined;
        }
    }
}
exports.RequestValidator = RequestValidator;
class RequestValidatorSchema {
    req;
    authenticate = true;
    reqParamsSchema;
    reqBodySchema;
    reqQuerySchema;
}
//# sourceMappingURL=request.validator.js.map