import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

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
        try {
            return await this.userRepository.findOne({
                where: { id: id },
                relations: {
                    topics: true
                }
            })
        } catch (error) {
            console.log('erro', error)
        }
    }

    async create(data: any) {
        await this.userRepository.save(this.userRepository.create(data))
    }

    async update(id: string, data: any) {
        const user = await this.findOne(id);

        this.userRepository.merge(user, data);
        return await this.userRepository.save(user);
    }

    async deleteById(id: string) {
        await this.findOne(id);

        await this.userRepository.delete(id)
    }
}
