import { Controller, Get, Req, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { CreateTrailDto, UpdateTrailDto } from './dto/trail.dto';
import { TrailService } from './trail.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnDto } from '../utils/return.dto';
import { TrailMessagesHelper } from '../../helpers/messages.helper';
import { ReqTokenParams } from '../utils/utils.dto';

@ApiTags('Trail')
@Controller('api/v1/trail')
export class TrailController {

    constructor(private readonly trailService: TrailService) { }

    @Get()
    async index(): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.trailService.findAll()
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateTrailDto): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.CREATED,
            message: TrailMessagesHelper.SUCCESS_TRAIL,
            records: await this.trailService.create(body)
        }
    }

    @Get(':id')
    async showByTopicId(@Param('id', new ParseUUIDPipe()) id: string): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.trailService.findAllByTopicId(
                {
                    where: {
                        topic: {
                            id: id
                        }
                    }
                }
            )
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateTrailDto,
        @Req() req: ReqTokenParams
    ): Promise<ReturnDto> {

        return <ReturnDto>{
            status: HttpStatus.OK,
            message: TrailMessagesHelper.SUCCESS_UPDATE_TRAIL,
            records: await this.trailService.update(id, req, body)
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: ReqTokenParams) {
        return await this.trailService.deleteById(id, req);
    }

}
