import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from '../article.service';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let articleRepository: Repository<ArticleEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findAllByContent: jest.fn(),
            findAllByUser: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
    articleRepository = module.get<Repository<ArticleEntity>>(
      getRepositoryToken(ArticleEntity),
    );
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
    expect(articleRepository).toBeDefined();
  });
});
