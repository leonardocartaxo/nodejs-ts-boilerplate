"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsEventToApiRequest = void 0;
const awsEventToApiRequest = (awsEvent) => {
    return { ...awsEvent, params: awsEvent.pathParameters };
};
exports.awsEventToApiRequest = awsEventToApiRequest;
//# sourceMappingURL=aws.api.request.dtos.js.map