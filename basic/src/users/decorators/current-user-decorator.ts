import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // CurrentUser 데코레이터는 인수를 받지 않을 것이므로 인자를 받는 첫번째 인자에 never타입을 지정합니다.
  (data: never, context: ExecutionContext) => {
    // context HTTP 요청을 가져옵니다.
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  }
);
