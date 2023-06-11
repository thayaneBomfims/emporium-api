import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { TrailEntity } from './entity/trail.entity';
import { ReqTokenParams } from '../utils/utils.dto';
import {
  MessagesHelper,
  TrailMessagesHelper,
} from '../../helpers/messages.helper';
import { CreateTrailDto, UpdateTrailDto } from './dto/trail.dto';
import { validationEntity, validationUserByEmail } from '../utils/validation';

@Injectable()
export class TrailService {
  constructor(
    @InjectRepository(TrailEntity)
    private readonly trailRepository: Repository<TrailEntity>,
  ) {}

  async findAll(): Promise<TrailEntity[]> {
    try {
      return await this.trailRepository.find({
        relations: {
          topic: true,
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

  async findAllByTopicId(
    conditions: FindManyOptions<TrailEntity>,
  ): Promise<TrailEntity[]> {
    try {
      return await this.trailRepository.find({
        select: ['id', 'name', 'description', 'topic', 'user'],
        where: conditions.where,
        relations: {
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
    conditions: FindManyOptions<TrailEntity>,
  ): Promise<TrailEntity> {
    try {
      const trail = await this.trailRepository.findOne({
        where: conditions.where,
        relations: {
          topic: true,
          user: true,
        },
      });

      if (!trail) {
        throw new NotFoundException();
      }
      return trail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: TrailMessagesHelper.NOT_FOUND_TRAIL,
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

  async create(data: CreateTrailDto): Promise<TrailEntity> {
    try {
      const trail = this.trailRepository.create(data);
      await validationEntity(trail);

      return await this.trailRepository.save(trail);
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

  async update(id: string, req: ReqTokenParams, data: UpdateTrailDto) {
    const trail = await this.findOne({ where: { id: id } });

    await validationUserByEmail(trail.user.email, req.user.email);

    try {
      this.trailRepository.merge(trail, data);
      return await this.trailRepository.save(trail);
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
      await this.trailRepository.softDelete(id);
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
