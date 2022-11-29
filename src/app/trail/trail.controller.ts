import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateTrailDto, UpdateTrailDto } from './dto/trail.dto';
import { TrailService } from './trail.service';

@Controller('api/v1/trail')
export class TrailController {

    constructor(private readonly trailService: TrailService) { }

    @Get()
    async index() {
        return await this.trailService.findAll();
    }

    @Post()
    async create(@Body() body: CreateTrailDto) {
        return await this.trailService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.trailService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTrailDto) {
        return await this.trailService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.trailService.deleteById(id);
    }

}
