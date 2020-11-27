import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { fileStorage } from 'src/shared/file-storage'
import { imageFilter } from 'src/shared/file-filter'

import { TokenModule } from '../token/token.module'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'

import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage : fileStorage
    }),
    TokenModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule {}
