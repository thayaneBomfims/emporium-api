import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnDto } from '../utils/return.dto';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { ArticleMessagesHelper } from '../../helpers/messages.helper';

@ApiTags('Article')
@Controller('api/v1/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Get()
  async index(): Promise<ReturnDto> {
    return <ReturnDto>{
      status: HttpStatus.OK,
      records: await this.articleService.findAll(),
    };
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string): Promise<ReturnDto> {
    return <ReturnDto>{
      status: HttpStatus.OK,
      records: await this.articleService.findOne({ where: { id: id } }),
    };
  }

  @Get('/content/:id')
  async showByContentId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReturnDto> {
    return <ReturnDto>{
      status: HttpStatus.OK,
      records: await this.articleService.findAllByContent({
        where: {
          content: {
            id: id,
          },
        },
      }),
    };
  }

  @Get('/user/:id')
  async showByUserId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReturnDto> {
    return <ReturnDto>{
      status: HttpStatus.OK,
      records: await this.articleService.findAllByUser({
        where: {
          user: {
            id: id,
          },
        },
      }),
    };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateArticleDto): Promise<ReturnDto> {
    return <ReturnDto>{
      status: HttpStatus.CREATED,
      message: ArticleMessagesHelper.SUCCESS_ARTICLE,
      records: await this.articleService.create(body),
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateArticleDto,
    @Req() req: any,
  ): Promise<ReturnDto> {
    return <ReturnDto>{
      status: HttpStatus.OK,
      message: ArticleMessagesHelper.SUCCESS_UPDATE_ARTICLE,
      records: await this.articleService.update(id, req, body),
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: any) {
    return await this.articleService.deleteById(id, req);
  }
}
