import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';
import { TopicEntity } from './entity/topic.entity';
import { ReqTokenParams } from '../utils/utils.dto';
import {
  MessagesHelper,
  TopicMessagesHelper,
} from '../../helpers/messages.helper';
import { validationEntity, validationUserByEmail } from '../utils/validation';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) { }

  async findAll(): Promise<TopicEntity[]> {
    try {
      return await this.topicRepository.find();
    } catch (error) {
      console.log('aaa', error)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: MessagesHelper.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(
    conditions: FindManyOptions<TopicEntity>,
  ): Promise<TopicEntity> {
    try {
      const topic = await this.topicRepository.findOne({
        where: conditions.where,
      });

      if (!topic) {
        throw new NotFoundException();
      }
      return topic;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: TopicMessagesHelper.NOT_FOUND_TOPIC,
        });
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: MessagesHelper.INTERNAL_SERVER_ERROR,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async create(data: CreateTopicDto): Promise<TopicEntity> {
    try {
      const topic = this.topicRepository.create(data);
      await validationEntity(topic);

      return await this.topicRepository.save(topic);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: MessagesHelper.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    req: ReqTokenParams,
    data: UpdateTopicDto,
  ): Promise<TopicEntity> {
    const topic = await this.findOne({ where: { id: id } });

    try {
      this.topicRepository.merge(topic, data);
      return await this.topicRepository.save(topic);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: MessagesHelper.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteById(id: string, req: ReqTokenParams) {
    await this.findOne({ where: { id: id } });

    try {
      await this.topicRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: MessagesHelper.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
