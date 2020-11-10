import { Module } from '@nestjs/common';

import { TokenModule } from '../token/token.module';
import { UserGuard, AdminGuard } from './auth.guard';

@Module({
  imports: [TokenModule],
  providers: [UserGuard, AdminGuard],
  exports: [UserGuard, AdminGuard]
})

export class AuthModule {}
