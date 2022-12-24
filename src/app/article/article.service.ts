import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entity/article.entity';

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>
    ) { }


    async findAll() {
        return await this.articleRepository.find({
            relations: {
                content: true,
                user: true
            }
        });
    }

    async findAllByContentId(Contentid: any) {
        return await this.articleRepository.find({
            where: {
                content: {
                    id: Contentid
                }
            },
            relations: {
                content: true,
                user: true
            }
        });
    }

    async findOne(id: any) {
        try {
            return await this.articleRepository.findOne({
                where: { id: id },
                relations: {
                    content: true,
                    user: true
                }
            })
        } catch (error) {
            console.log('erro', error)
        }
    }

    async create(data: any) {
        await this.articleRepository.save(this.articleRepository.create(data))
    }

    async update(id: string, data: any) {
        const trail = await this.findOne(id);

        this.articleRepository.merge(trail, data);
        return await this.articleRepository.save(trail);
    }

    async deleteById(id: string) {
        await this.findOne(id);

        await this.articleRepository.softDelete(id)
    }
}
