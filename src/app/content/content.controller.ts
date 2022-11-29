import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto, UpdateContentDto } from './dto/content.dto';

@Controller('api/v1/content')
export class ContentController {

    constructor(private readonly contentService: ContentService) { }

    @Get()
    async index() {
        return await this.contentService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contentService.findOne(id);
    }

    @Post()
    async create(@Body() body: CreateContentDto) {
        return await this.contentService.create(body)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateContentDto) {
        return await this.contentService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contentService.deleteById(id);
    }
}
