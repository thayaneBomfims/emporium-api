import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from './app/topic/topic.module';
import { TrailModule } from './app/trail/trail.module';
import { ContentModule } from './app/content/content.module';
import { UserModule } from './app/user/user.module';
import { ArticleModule } from './app/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '123'),
        database: configService.get('DB_DATABASE', 'emporium'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      })
    }),
    TopicModule,
    TrailModule,
    ContentModule,
    UserModule,
    ArticleModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
