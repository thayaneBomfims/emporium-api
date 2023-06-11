import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from '../content.service';
import { Repository } from 'typeorm';
import { ContentEntity } from '../entity/content.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ContentService', () => {
  let contentService: ContentService;
  let contentRepository: Repository<ContentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getRepositoryToken(ContentEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findAllByTrailId: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
    contentRepository = module.get<Repository<ContentEntity>>(
      getRepositoryToken(ContentEntity),
    );
  });

  it('should be defined', () => {
    expect(contentService).toBeDefined();
    expect(contentRepository).toBeDefined();
  });
});
