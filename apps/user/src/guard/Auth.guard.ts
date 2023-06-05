import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
        ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride('role', [
        context.getHandler(),
        context.getClass(),
        ]);
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: "thIsIsaSecretnihoihjnkbkjgbguggj"
          }
        );

        if(role && (role !== payload.role)){
            return false;
        }
        
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch(e) {        
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      return request.cookies["jwt"];
    }
  }