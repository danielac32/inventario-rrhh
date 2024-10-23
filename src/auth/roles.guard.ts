import { Injectable, BadRequestException , ForbiddenException ,CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from './decorators/role-protected.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rol = this.reflector.get(META_ROLES, context.getHandler());
    if (!rol) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if( rol.includes( user.rol ) ) {
        return true;
    }
    throw new ForbiddenException(`User ${ user.name }, need valid role: ${ rol }`);
  }
}