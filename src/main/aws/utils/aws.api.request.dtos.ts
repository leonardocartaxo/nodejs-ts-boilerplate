import { ApiRequest } from '../../../utils/dtos/api.request.dtos';

export const awsEventToApiRequest = (awsEvent: any): ApiRequest => {
  try {
    awsEvent.body = JSON.parse(awsEvent?.body);
  } catch (e) {
    console.error(e);
  }

  return { ...awsEvent, params: awsEvent.pathParameters };
};
