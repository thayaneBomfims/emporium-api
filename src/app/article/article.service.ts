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
import * as AWS from 'aws-sdk';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) { }

  AWS_S3_BUCKET = process.env.BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.BUCKET_KEY,
    secretAccessKey: process.env.BUCKET_SECRET,
  });

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

  async create(
    file: Express.Multer.File,
    data: CreateArticleDto
  ): Promise<ArticleEntity> {

    console.log(file);
    const { originalname } = file;

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(originalname),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();

      data.material = String(s3Response.Location)

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
