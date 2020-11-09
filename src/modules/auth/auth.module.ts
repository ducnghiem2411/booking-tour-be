import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports: [JwtStrategy]
})

export class AuthModule {}
