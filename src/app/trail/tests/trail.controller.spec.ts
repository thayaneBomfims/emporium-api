import { Test, TestingModule } from '@nestjs/testing';
import { TrailController } from '../trail.controller';
import { TrailService } from '../trail.service';

describe('TrailController', () => {
  let trailController: TrailController;
  let trailService: TrailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailController],
      providers: [{
        provide: TrailService,
        useValue: {
          findAll: jest.fn(),
          create: jest.fn(),
          findOne: jest.fn(),
          findAllByTopicId: jest.fn(),
          update: jest.fn(),
          deleteById: jest.fn()
        }
      }]
    }).compile();

    trailController = module.get<TrailController>(TrailController);
    trailService = module.get<TrailService>(TrailService)
  });

  it('should be defined', () => {
    expect(trailController).toBeDefined();
    expect(trailService).toBeDefined();
  });
});
