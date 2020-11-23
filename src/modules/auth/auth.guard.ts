import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common'

import { TokenService } from '../token/token.service'
import { su } from 'src/config'
@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request =  context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const payload = await this.tokenService.getPayload(token)
      if (payload) {
        return true
      }
    }
    throw new UnauthorizedException()
  }
  
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request =  context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const payload = await this.tokenService.getPayload(token)
      if (su.includes(payload.email)) {
        return true
      }
    }
    throw new ForbiddenException()
  }
  
}
