import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';
import { TopicService } from './topic.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Topic')
@Controller('api/v1/topic')
export class TopicController {

    constructor(private readonly topicService: TopicService) { }

    @Get()
    async index() {
        return await this.topicService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateTopicDto) {
        return await this.topicService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.topicService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTopicDto) {
        return await this.topicService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.topicService.deleteById(id);
    }
}
