import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus, HttpException, BadRequestException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnDto } from '../utils/return.dto';
import { UserMessagesHelper } from '../../helpers/messages.helper';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async index(): Promise<ReturnDto> {

        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.userService.findAll()
        }

    }

    @Post()
    async create(@Body() body: CreateUserDto): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.CREATED,
            message: UserMessagesHelper.SUCCESS_USER,
            records: await this.userService.create(body)
        }

    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async show(@Param('id', new ParseUUIDPipe()) id: string): Promise<ReturnDto> {

        const user = await this.userService.findOne(
            { where: { id: id } }
        )
        delete user.password

        return <ReturnDto>{
            status: HttpStatus.OK,
            records: user
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto): Promise<ReturnDto> {
        return <ReturnDto>{
            status: HttpStatus.OK,
            message: UserMessagesHelper.SUCCESS_UPDATE_USER,
            records: await this.userService.update(id, body)
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.deleteById(id);
    }
}
