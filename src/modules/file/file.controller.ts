import { Controller, Get, HttpException, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Get files')
@Controller('upload')
export class FilesController {
  constructor(

  ) {}
  
  @Get('/:name')
  async serve(@Param('name') name: string, @Res() res): Promise<any> {
    try {
      res.sendFile(name, { root: 'upload' })
    } catch (e) {
      throw new HttpException({
        ...e,
      }, e.statusCode)
    }
  }

}