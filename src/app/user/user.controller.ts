import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpException, BadRequestException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async index() {
        try {
            return await this.userService.findAll();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro interno, contate o administrador do sistema.',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post()
    async create(@Body() body: any) {
        try {
            return await this.userService.create(body)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro interno, contate o administrador do sistema.',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        try {
            const user = await this.userService.findOne(id);

            if (!user) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Usuário não encontrado.',
                }, HttpStatus.NOT_FOUND)
            }

            return user
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro interno, contate o administrador do sistema.',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: any) {
        try {
            const updated_user = await this.userService.update(id, body);

            if (!updated_user) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Usuário não encontrado.',
                }, HttpStatus.NOT_FOUND)
            }

            return updated_user;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro interno, contate o administrador do sistema.',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        try {
            return await this.userService.deleteById(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro interno, contate o administrador do sistema.',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
