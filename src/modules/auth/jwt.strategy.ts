import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy {
  constructor(
    private jwtService: JwtService
  ) {}

  async generateToken(payload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  async getPayload(token) {
    const payload = this.jwtService.decode(token)
    return payload
  }
  
}