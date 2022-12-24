import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async index() {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() body: any) {
        return await this.userService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: any) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.deleteById(id);
    }
}
