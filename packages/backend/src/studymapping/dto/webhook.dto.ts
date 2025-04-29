import { Transform } from "class-transformer";

export class UserPayload {
  application: string;
  organization: string;
  username: string;
  name: string;
  password: string;
  email: string;
}

export class ResponsePayload {
  status: 'ok' | 'error';
  msg: string;
}

export class WebhookPayload {
  id: number;

  owner: string;

  name: string;

  createdTime: string;

  organization: string;

  clientIp: string;

  @Transform((params) => JSON.parse(params.value))
  object: UserPayload;

  method: string;

  requestUri: string;

  action: 'signup' | 'login' | 'logout' | 'update';

  language: 'en';

  statusCode: number;

  isTriggered: false;

  extendedUser: null

  response: string;
}
