import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('api/v1/topic')
export class TopicController {

    constructor(private readonly topicService: TopicService) { }

    @Get()
    async index() {
        return await this.topicService.findAll();
    }

    @Post()
    async create(@Body() body: any) {
        return await this.topicService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.topicService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: any) {
        return await this.topicService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.topicService.deleteById(id);
    }
}
