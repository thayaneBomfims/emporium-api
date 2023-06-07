import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpException, BadRequestException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async index() {
        try {
            return await this.userService.findAll();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: MessagesHelper.INTERNAL_SERVER_ERROR,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        try {
            const user = await this.userService.findOne(
                { where: { id: id } }
            );

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
                error: MessagesHelper.INTERNAL_SERVER_ERROR,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: any) {
        try {
            const updatedUser = await this.userService.update(id, body);

            if (!updatedUser) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Usuário não encontrado.',
                }, HttpStatus.NOT_FOUND)
            }

            return updatedUser;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: MessagesHelper.INTERNAL_SERVER_ERROR,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        try {
            return await this.userService.deleteById(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: MessagesHelper.INTERNAL_SERVER_ERROR,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
