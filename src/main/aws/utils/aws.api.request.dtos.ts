import { ApiRequest } from '../../../utils/dtos/api.request.dtos';

export const awsEventToApiRequest = (awsEvent: any): ApiRequest => {
  return { ...awsEvent, params: awsEvent.pathParameters };
};
