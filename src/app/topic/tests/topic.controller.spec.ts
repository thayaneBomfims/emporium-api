import { Test, TestingModule } from '@nestjs/testing';
import { TopicController } from '../topic.controller';
import { TopicService } from '../topic.service';

describe('TopicController', () => {
  let topicController: TopicController;
  let topicService: TopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicController],
      providers: [{
        provide: TopicService,
        useValue: {
          findAll: jest.fn(),
          create: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          deleteById: jest.fn()
        }
      }]
    }).compile();

    topicController = module.get<TopicController>(TopicController);
    topicService = module.get<TopicService>(TopicService)
  });

  it('should be defined', () => {
    expect(topicController).toBeDefined();
    expect(topicService).toBeDefined();
  });
});
