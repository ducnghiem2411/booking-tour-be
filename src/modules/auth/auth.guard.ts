import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common'

import { TokenService } from '../token/token.service'

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
      if (payload.email === 'nghiemld@gmail.com') { //temporary
        return true
      }
    }
    throw new ForbiddenException()
  }
  
}
