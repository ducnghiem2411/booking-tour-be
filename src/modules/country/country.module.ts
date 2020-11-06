import { Module, HttpException, HttpStatus } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { uuid } from 'uuidv4'


import { CountriesService } from './country.service';
import { CountriesController } from './country.controller';

import { Country, CountrySchema } from './schemas/country.schema';

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
  }
  cb(null, true);
}

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Country.name, schema: CountrySchema },
    ]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage : diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload')
        },
        filename: (req, file, cb) => {
          return cb(null, `${uuid()}${extname(file.originalname)}`)
        }
      })
    })
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService]
})

export class CountriesModule {}
