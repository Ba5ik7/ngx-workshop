import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IActiveUserData } from '../interfaces/active-user-data.interface';
import { RequestKeys } from '../enums/request-keys.emun';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IActiveUserData | undefined =
      request[RequestKeys.REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
