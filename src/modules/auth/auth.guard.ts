import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request =  context.switchToHttp().getRequest()
    const token = request.headers.authorization.split(' ')[1]
    
    console.log('req header auth', request.headers.authorization)
    console.log('token', token);
    if (token) {
      return true
    }
    throw new UnauthorizedException()
  }
}
