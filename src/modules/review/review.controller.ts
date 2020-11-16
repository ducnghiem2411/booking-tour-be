import { Body, Controller, Get, Post, HttpException, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';

import { UserGuard } from '../auth/auth.guard'
import { ReviewService } from './review.service'
import { TokenService } from '../token/token.service'

import { CreateReviewDTO } from './dto/input.dto'
import { ReviewDTO } from './dto/output.dto'

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewsService: ReviewService,
    private readonly tokenService: TokenService
  ) {}
  
  @Post()
  // @ApiBody({ schema: CreateReviewDTO })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return created reviews', type: CreateReviewDTO })
  async create(@Req() req, @Body() body: CreateReviewDTO): Promise<CreateReviewDTO> {
    let result
    const token = req.headers.authorization.split(' ')[1]
    const user = await this.tokenService.getPayload(token)
    try {
      result = await this.reviewsService.create(user, body);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @ApiOkResponse({ description: 'Return all review', type: [ReviewDTO] })
  async getAll(): Promise<ReviewDTO[]> {
    let result
    try {
      result = await this.reviewsService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Return deleted review' })
  async delete(@Req() req, @Param('id') id: string): Promise<string> {
    let result
    try {
      result = await this.reviewsService.delete(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

}