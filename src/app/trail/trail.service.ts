import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateTrailDto, UpdateTrailDto } from './dto/trail.dto';
import { TrailEntity } from './entity/trail.entity';

@Injectable()
export class TrailService {

    constructor(
        @InjectRepository(TrailEntity)
        private readonly trailRepository: Repository<TrailEntity>
    ) { }

    async findAll() {
        return await this.trailRepository.find({
            relations: {
                topic: true
            }
        });
    }

    async findOne(id: any) {
        try {
            return await this.trailRepository.findOne({
                where: { id: id },
                relations: {
                    topic: true
                }
            })
        } catch (error) {
            console.log('erro', error)
        }
    }

    async create(data: any) {
        await this.trailRepository.save(this.trailRepository.create(data))
    }

    async update(id: string, data: any) {
        const trail = await this.findOne(id);

        this.trailRepository.merge(trail, data);
        return await this.trailRepository.save(trail);
    }

    async deleteById(id: string) {
        await this.findOne(id);

        await this.trailRepository.softDelete(id)
    }

}
