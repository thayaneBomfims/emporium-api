import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { CreateTrailDto, UpdateTrailDto } from './dto/trail.dto';
import { TrailService } from './trail.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/trail')
export class TrailController {

    constructor(private readonly trailService: TrailService) { }

    @Get()
    async index() {
        return await this.trailService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: CreateTrailDto) {
        return await this.trailService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.trailService.findAllByTopicI(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTrailDto) {
        return await this.trailService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.trailService.deleteById(id);
    }

}
