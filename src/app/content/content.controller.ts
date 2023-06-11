import { Controller, Get, Post, Put, Delete, Body, Req, Param, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto, UpdateContentDto } from './dto/content.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnDto } from '../utils/return.dto';
import { ContentMessagesHelper } from '../../helpers/messages.helper';

@ApiTags('Content')
@Controller('api/v1/content')
export class ContentController {

    constructor(private readonly contentService: ContentService) { }

    @Get()
    async index(): Promise<ReturnDto> {

        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.contentService.findAll()
        }
    }

    @Get(':id')
    async showByTrailId(@Param('id', new ParseUUIDPipe()) id: string): Promise<ReturnDto> {

        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.contentService.findAllByTrailId(
                { where: { id: id } }
            )
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateContentDto): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.CREATED,
            message: ContentMessagesHelper.SUCCESS_CONTENT,
            records: await this.contentService.create(body)
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateContentDto,
        @Req() req: any
    ): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.OK,
            message: ContentMessagesHelper.SUCCESS_UPDATE_CONTENT,
            records: await this.contentService.update(id, req, body)
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: any) {
        return await this.contentService.deleteById(id, req);
    }
}
