import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto, UpdateContentDto } from './dto/content.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Content')
@Controller('api/v1/content')
export class ContentController {

    constructor(private readonly contentService: ContentService) { }

    @Get()
    async index() {
        return await this.contentService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contentService.findAllByTrailId(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateContentDto) {
        return await this.contentService.create(body)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateContentDto) {
        return await this.contentService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.contentService.deleteById(id);
    }
}
