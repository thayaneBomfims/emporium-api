import { Controller, Get, Post, Req, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';
import { TopicService } from './topic.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnDto } from '../utils/return.dto';
import { TopicMessagesHelper } from '../../helpers/messages.helper';
import { ReqTokenParams } from '../utils/utils.dto';

@ApiTags('Topic')
@Controller('api/v1/topic')
export class TopicController {

    constructor(private readonly topicService: TopicService) { }

    @Get()
    async index(): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.topicService.findAll()
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateTopicDto): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.CREATED,
            message: TopicMessagesHelper.SUCCESS_TOPIC,
            records: await this.topicService.create(body)
        }
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.topicService.findOne(
                { where: { id: id } }
            )
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateTopicDto,
        @Req() req: ReqTokenParams
    ): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.OK,
            message: TopicMessagesHelper.SUCCESS_UPDATE_TOPIC,
            records: await this.topicService.update(id, req, body)
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Req() req: ReqTokenParams
    ) {
        return await this.topicService.deleteById(id, req);
    }
}
