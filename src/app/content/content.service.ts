import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentEntity } from './entity/content.entity';

@Injectable()
export class ContentService {

    constructor(
        @InjectRepository(ContentEntity)
        private readonly contentRepository: Repository<ContentEntity>
    ) { }


    async findAll() {
        return await this.contentRepository.find({
            relations: {
                trail: true
            }
        });
    }

    async findAllByTrailId(id: any) {
        return await this.contentRepository.find({
            where: {
                trail: {
                    id: id
                }
            },
            relations: {
                trail: true
            }
        });
    }

    async findOne(id: any) {
        try {
            return await this.contentRepository.findOne({
                where: { id: id },
                relations: {
                    trail: true
                }
            })
        } catch (error) {
            console.log('erro', error)
        }
    }

    async create(data: any) {
        await this.contentRepository.save(this.contentRepository.create(data))
    }

    async update(id: string, data: any) {
        const trail = await this.findOne(id);

        this.contentRepository.merge(trail, data);
        return await this.contentRepository.save(trail);
    }

    async deleteById(id: string) {
        await this.findOne(id);

        await this.contentRepository.softDelete(id)
    }
}
