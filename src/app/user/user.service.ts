import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { hashPassword } from '../utils/passwordHash';
import { validationEntity, validationUserByEmail } from '../utils/validation';
import {
  MessagesHelper,
  UserMessagesHelper,
} from '../../helpers/messages.helper';
import { ReqTokenParams } from '../utils/utils.dto';

import { TopicService } from "../topic/topic.service"

@Injectable()
export class UserService {
  constructor(
    private readonly topicService: TopicService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        relations: {
          topics: true,
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

  async findOne(conditions: FindManyOptions<UserEntity>): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        select: [
          'id',
          'name',
          'public_name',
          'email',
          'password',
          'instagram',
          'facebook',
          'telegram',
          'active',
          'topics'
        ],
        where: conditions.where,
        relations: {
          topics: true,
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: UserMessagesHelper.NOT_FOUND_USER,
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

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      const newUser = this.userRepository.create(data);

      await validationEntity(newUser);
      newUser.password = await hashPassword(newUser.password);

      return await this.userRepository
        .save(newUser)
        .then(() => {
          delete newUser.password;
          return newUser;
        })
        .catch(() => {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: MessagesHelper.INTERNAL_SERVER_ERROR,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    } else {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: UserMessagesHelper.EMAIL_INVALID,
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(
    id: string,
    req: ReqTokenParams,
    data: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findOne({ where: { id: id } });
    await validationUserByEmail(user.email, req.user.email);

    const topic = await this.topicService.findOne({ where: { id: data.topic } })
    user.topics.push(topic)

    this.userRepository.merge(user, data);
    try {
      const updated_user = await this.userRepository.save(user);
      delete updated_user.password;
      return updated_user;
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

  async deleteById(id: string): Promise<any> {
    await this.findOne({ where: { id: id } });

    try {
      return await this.userRepository.delete(id);
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
