import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicEntity } from '../topic/entity/topic.entity';
import { TrailEntity } from '../trail/entity/trail.entity';
import { ArticleEntity } from '../article/entity/article.entity';
import { ContentEntity } from '../content/entity/content.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TopicEntity, TrailEntity, ArticleEntity, ContentEntity])
    ],
    providers: [SearchService],
    controllers: [SearchController]
})
export class SearchModule { }
