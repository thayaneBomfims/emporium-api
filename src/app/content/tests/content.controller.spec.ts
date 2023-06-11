import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from '../content.controller';
import { ContentService } from '../content.service';

describe('ContentController', () => {
  let contentController: ContentController;
  let contentService: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        {
          provide: ContentService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findAllByTrailId: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    contentController = module.get<ContentController>(ContentController);
    contentService = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(contentController).toBeDefined();
    expect(contentService).toBeDefined();
  });
});
