import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from '../article.controller';
import { ArticleService } from '../article.service';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findAllByContent: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    articleController = module.get<ArticleController>(ArticleController);
    articleService = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(articleController).toBeDefined();
    expect(articleService).toBeDefined();
  });
});
