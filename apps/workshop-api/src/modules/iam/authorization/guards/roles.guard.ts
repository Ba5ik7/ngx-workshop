import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../../../enums/role.enum';
import { IActiveUserData } from '../../../../interfaces/active-user-data.interface';
import { ROLES_KEY } from '../../../../decorators/role.decorator';
import { RequestKeys } from '../../../../enums/request-keys.emun';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!contextRoles) {
      return true;
    }
    const user: IActiveUserData = context.switchToHttp().getRequest()[
      RequestKeys.REQUEST_USER_KEY
    ];
    return contextRoles.some((role) => user.role === role);
  }
}
