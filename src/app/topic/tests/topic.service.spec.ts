import { Test, TestingModule } from '@nestjs/testing';
import { TopicService } from '../topic.service';
import { TopicEntity } from '../entity/topic.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TopicService', () => {
  let topicService: TopicService;
  let topicRepository: Repository<TopicEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicService,
        {
          provide: getRepositoryToken(TopicEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    topicService = module.get<TopicService>(TopicService);
    topicRepository = module.get<Repository<TopicEntity>>(
      getRepositoryToken(TopicEntity),
    );
  });

  it('should be defined', () => {
    expect(topicService).toBeDefined();
    expect(topicRepository).toBeDefined();
  });
});
