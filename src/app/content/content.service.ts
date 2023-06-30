import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ContentEntity } from './entity/content.entity';
import { ReqTokenParams } from '../utils/utils.dto';
import {
  ContentMessagesHelper,
  MessagesHelper,
} from '../../helpers/messages.helper';
import { CreateContentDto } from './dto/content.dto';
import { validationEntity, validationUserByEmail } from '../utils/validation';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
  ) { }

  async findAll(): Promise<ContentEntity[]> {
    try {
      return await this.contentRepository.find({
        relations: {
          trail: true,
          user: true,
        },
      });
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

  async findAllByTrailId(
    conditions: FindManyOptions<ContentEntity>,
  ): Promise<ContentEntity[]> {
    try {
      return await this.contentRepository.find({
        select: ['id', 'name', 'trail', 'articles', 'user'],
        where: conditions.where,
        relations: {
          trail: true,
          user: true,
        },
      });
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

  async findOne(
    conditions: FindManyOptions<ContentEntity>,
  ): Promise<ContentEntity> {
    try {
      const content = await this.contentRepository.findOne({
        where: conditions.where,
        relations: {
          trail: true,
          user: true,
        },
      });

      if (!content) {
        throw new NotFoundException();
      }
      return content;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: ContentMessagesHelper.NOT_FOUND_CONTENT,
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

  async create(data: CreateContentDto): Promise<ContentEntity> {
    try {
      const content = this.contentRepository.create(data);
      await validationEntity(content);

      return await this.contentRepository.save(content);
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

  async update(id: string, req: ReqTokenParams, data: any) {
    const content = await this.findOne({ where: { id: id } });

    await validationUserByEmail(content.user.email, req.user.email);

    try {
      this.contentRepository.merge(content, data);
      return await this.contentRepository.save(content);
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
      await this.contentRepository.softDelete(id);
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
