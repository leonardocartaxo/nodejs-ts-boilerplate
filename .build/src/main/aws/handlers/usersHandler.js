"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.get = exports.create = void 0;
const usersMicroservice = __importStar(require("../../../microservices/users"));
const aws_api_response_utils_1 = require("../utils/aws.api.response.utils");
const aws_api_request_dtos_1 = require("../utils/aws.api.request.dtos");
const db_manager_1 = require("../../../utils/helpers/db-manager");
let connection;
const init = async () => {
    if (!connection) {
        connection = await db_manager_1.DBManager.getMongoConnection();
    }
};
const create = async (event, context) => {
    try {
        await init();
        const req = (0, aws_api_request_dtos_1.awsEventToApiRequest)(event);
        const res = await usersMicroservice.create(req, connection);
        return aws_api_response_utils_1.AwsApiResponseUtils.send(res);
    }
    catch (e) {
        return aws_api_response_utils_1.AwsApiResponseUtils.error(e);
    }
};
exports.create = create;
const get = async (event, context) => {
    try {
        await init();
        const req = (0, aws_api_request_dtos_1.awsEventToApiRequest)(event);
        const res = await usersMicroservice.get(req, connection);
        return aws_api_response_utils_1.AwsApiResponseUtils.send(res);
    }
    catch (e) {
        return aws_api_response_utils_1.AwsApiResponseUtils.error(e);
    }
};
exports.get = get;
const getAll = async (event, context) => {
    try {
        await init();
        const req = (0, aws_api_request_dtos_1.awsEventToApiRequest)(event);
        const res = await usersMicroservice.getAll(req, connection);
        return aws_api_response_utils_1.AwsApiResponseUtils.send(res);
    }
    catch (e) {
        return aws_api_response_utils_1.AwsApiResponseUtils.error(e);
    }
};
exports.getAll = getAll;
//# sourceMappingURL=usersHandler.js.map