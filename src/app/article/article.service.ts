import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ArticleEntity } from './entity/article.entity';
import {
  MessagesHelper,
  ArticleMessagesHelper,
} from '../../helpers/messages.helper';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { validationEntity, validationUserByEmail } from '../utils/validation';
import { ReqTokenParams } from '../utils/utils.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) { }

  async findAll(): Promise<ArticleEntity[]> {
    try {
      return await this.articleRepository.find({
        relations: {
          user: true,
          content: true,
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
    conditions: FindManyOptions<ArticleEntity>,
  ): Promise<ArticleEntity> {
    try {
      const article = await this.articleRepository.findOne({
        select: [
          'id',
          'title',
          'subtitle',
          'material',
          'updatedAt',
          'content',
          'user',
        ],
        where: conditions.where,
        relations: {
          content: true,
          user: true,
        },
      });

      if (!article) {
        throw new NotFoundException();
      }

      return article;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: ArticleMessagesHelper.NOT_FOUND_ARTICLE,
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

  async findAllByContent(
    conditions: FindManyOptions<ArticleEntity>,
  ): Promise<ArticleEntity[]> {
    try {
      const article = await this.articleRepository.find({
        select: [
          'id',
          'title',
          'subtitle',
          'material',
          'updatedAt',
          'content',
          'user',
        ],
        where: conditions.where,
        relations: {
          user: true,
        },
      });

      return article;
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

  async findAllByUser(
    conditions: FindManyOptions<ArticleEntity>,
  ): Promise<ArticleEntity[]> {
    try {
      const articles = await this.articleRepository.find({
        select: [
          'id',
          'title',
          'subtitle',
          'material',
          'updatedAt',
          'content',
          'user',
        ],
        where: conditions.where,
        relations: {
          user: true,
        },
      });

      return articles;
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

  async create(data: CreateArticleDto): Promise<ArticleEntity> {
    try {
      const article = this.articleRepository.create(data);

      await validationEntity(article);
      return await this.articleRepository.save(article);
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
    data: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.findOne({ where: { id: id } });

    await validationUserByEmail(article.user.email, req.user.email);

    try {
      this.articleRepository.merge(article, data);

      return await this.articleRepository.save(article);
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

  async deleteById(id: string, req: ReqTokenParams): Promise<any> {
    const article = await this.findOne({ where: { id: id } });

    await validationUserByEmail(article.user.email, req.user.email);

    try {
      await this.articleRepository.softDelete(id);
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
