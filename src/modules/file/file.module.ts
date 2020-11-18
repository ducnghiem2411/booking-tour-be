import { Module } from '@nestjs/common'

import { FilesController } from './file.controller'

@Module({
  imports: [],
  controllers: [FilesController],
})

export class FileModule {}