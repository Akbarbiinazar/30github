import { CanActivate,Injectable, ForbiddenException, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions) {
          return true;
        }
    
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        const hasPermission = requiredPermissions.every((permission) =>
          user.permissions.includes(permission),
        );
    
        if (!hasPermission) {
          throw new ForbiddenException('You do not have permission to access this resource');
        }
    
        return true;
      }
}