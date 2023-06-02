import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ReturnDto } from '../utils/return.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll() {
        return await this.userRepository.find({
            relations: {
                topics: true
            }
        });
    }

    async findOne(id: any) {
        return await this.userRepository.findOne({
            where: { id: id },
            relations: {
                topics: true
            }
        })
    }

    async create(data: CreateUserDto): Promise<ReturnDto> {

        const user = await this.userRepository.findOne({
            where: { email: data.email }
        })

        if (!user) {
            const newUser = this.userRepository.create(data)
            newUser.active = false

            const validationErrors = await validate(newUser);

            if (validationErrors.length > 0) {
                const errorMessages = validationErrors.map((
                    error
                ) => Object.values(error.constraints)).join(', ');
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: `Erro de campos: ${errorMessages}`,
                }, HttpStatus.BAD_REQUEST)
            }

            newUser.password = bcrypt.hashSync(newUser.password, 8)
            return await this.userRepository.save(newUser)
                .then(() => {
                    delete newUser.password
                    return <ReturnDto>{
                        status: HttpStatus.CREATED,
                        message: "Usuário cadastrado com sucesso!",
                        records: newUser
                    }
                })
                .catch(() => {
                    throw new HttpException({
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: 'Houve um erro no cadastro deste usuário!',
                    }, HttpStatus.INTERNAL_SERVER_ERROR)
                })
        } else {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Um usuário com este e-mail já existe!',
            }, HttpStatus.CONFLICT)
        }
    }

    async update(id: string, data: any) {
        const user = await this.findOne(id);

        this.userRepository.merge(user, data);
        return await this.userRepository.save(user);
    }

    async deleteById(id: string) {
        await this.findOne(id);
        return await this.userRepository.delete(id)
    }
}
