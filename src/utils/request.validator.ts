import { ClassType, transformAndValidate } from 'class-transformer-validator';
import { ApiRequest } from './dtos/api.request.dtos';
import { StatusCodes } from 'http-status-codes';

export class RequestValidator {
  static async getValidSchema<T extends object> (classType: ClassType<T>, body: any): Promise<any> {
    return transformAndValidate(classType, body, { validator: { whitelist: true } });
  }

  static async validate (schema: RequestValidatorSchema): Promise<any> {
    if (schema?.authenticate) {
      const token = schema?.req?.headers?.Authorization ?? '';
      if (!token?.includes(process.env.AUTHENTICATION_TOKEN)) {
        throw {
          statusCode: StatusCodes.UNAUTHORIZED
        };
      }
    }
    if (schema.reqParamsSchema) {
      const params = schema.req.params instanceof Object ? schema.req.params : JSON.parse(schema.req.params);
      schema.req.params = await this.getValidSchema(schema.reqParamsSchema, params);
    } else {
      schema.req.params = undefined;
    }

    if (schema.reqBodySchema) {
      const body = schema.req.body instanceof Object ? schema.req.body : JSON.parse(schema.req.body);
      schema.req.body = await this.getValidSchema(schema.reqBodySchema, body);
    } else {
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
    } else {
      schema.req.query = undefined;
    }
  }
}

class RequestValidatorSchema {
  req: ApiRequest;
  authenticate = true;
  reqParamsSchema?: any;
  reqBodySchema?: any;
  reqQuerySchema?: any;
}
