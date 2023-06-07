import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode, Header, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Article')
@Controller('api/v1/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Get()
    async index() {
        return await this.articleService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.articleService.findOne(id);
    }

    @Get('/content/:id')
    async showByContentId(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.articleService.findAllByContentId(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: any) {
        return await this.articleService.create(body)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: any) {
        return await this.articleService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.articleService.deleteById(id);
    }
}
