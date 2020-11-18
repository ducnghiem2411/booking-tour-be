import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TokenModule } from '../token/token.module'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'

import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokenModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule {}
