import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicEntity } from '../topic/entity/topic.entity';
import { Like, Repository } from 'typeorm';
import { searchTypes } from "../../helpers/search.helper";
import { TrailEntity } from '../trail/entity/trail.entity';
import { ArticleEntity } from '../article/entity/article.entity';
import { ContentEntity } from '../content/entity/content.entity';

@Injectable()
export class SearchService {

    constructor(
        @InjectRepository(TopicEntity) private readonly topicRepository: Repository<TopicEntity>,
        @InjectRepository(TrailEntity) private readonly trailRepository: Repository<TrailEntity>,
        @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(ContentEntity) private readonly contentRepository: Repository<ContentEntity>
    ) { }

    async searchDatabase(term: string): Promise<any> {

        const likeKeyword = `%${term}%`;
        const returnSearch = [];

        const topicResults = await this.topicRepository
            .createQueryBuilder('topic')
            .where('unaccent(topic.name) ILIKE unaccent(:keyword)', { keyword: likeKeyword })
            .getMany();

        returnSearch.push({
            type: searchTypes.TOPIC,
            data: topicResults
        })

        const trailResults = await this.trailRepository
            .createQueryBuilder('trail')
            .where('unaccent(trail.name) ILIKE unaccent(:keyword)', { keyword: likeKeyword })
            .getMany();

        returnSearch.push({
            type: searchTypes.TRAIL,
            data: trailResults
        })

        const contentResults = await this.contentRepository
            .createQueryBuilder('content')
            .where('unaccent(content.name) ILIKE unaccent(:keyword)', { keyword: likeKeyword })
            .getMany();

        returnSearch.push({
            type: searchTypes.CONTENT,
            data: contentResults
        })

        const articleResults = await this.articleRepository
            .createQueryBuilder('article')
            .where('unaccent(article.title) ILIKE unaccent(:keyword)', { keyword: likeKeyword })
            .orWhere('unaccent(article.subtitle) ILIKE unaccent(:keyword)', { keyword: likeKeyword })
            .getMany();

        returnSearch.push({
            type: searchTypes.ARTICLE,
            data: articleResults
        })

        return returnSearch;
    }
}
