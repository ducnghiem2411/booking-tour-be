import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService
  ) {}

  async generateToken(payload: Object, expired?: any) {
    const token = this.jwtService.sign(payload, {
      expiresIn: expired
    })
    return token
  }

  async getPayload(token) {
    const payload = this.jwtService.verify(token)
    return payload
  }
  
}