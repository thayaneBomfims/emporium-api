import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentEntity } from './entity/content.entity';
import { ContentController } from './content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity])],
  providers: [ContentService],
  exports: [ContentService],
  controllers: [ContentController]
})
export class ContentModule { }
