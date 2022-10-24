import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';
import { TopicEntity } from './entity/topic.entity';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(TopicEntity)
        private readonly topicRepository: Repository<TopicEntity>
    ) { }

    async findAll() {
        return await this.topicRepository.find();
    }

    async findOne(id: any) {
        try {
            return await this.topicRepository.findOne(id)
        } catch (error) {
            console.log('erro', error)
        }
    }

    async create(data: CreateTopicDto) {
        return await this.topicRepository.save(this.topicRepository.create(data))
    }

    async update(id: string, data: UpdateTopicDto) {
        const topic = await this.findOne(id);

        this.topicRepository.merge(topic, data);
        return await this.topicRepository.save(topic);
    }

    async deleteById(id: string) {
        await this.findOne(id);

        await this.topicRepository.softDelete(id)
    }
}
