import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ArticleService } from './article.service';

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

    @Post()
    async create(@Body() body: any) {
        return await this.articleService.create(body)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: any) {
        return await this.articleService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.articleService.deleteById(id);
    }
}
