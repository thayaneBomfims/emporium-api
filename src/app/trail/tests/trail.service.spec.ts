import { Test, TestingModule } from '@nestjs/testing';
import { TrailService } from '../trail.service';
import { TrailEntity } from '../entity/trail.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TrailService', () => {
  let trailService: TrailService;
  let trailRepository: Repository<TrailEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrailService,
        {
          provide: getRepositoryToken(TrailEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findAllByTopicId: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn()
          }
        }

      ],
    }).compile();

    trailService = module.get<TrailService>(TrailService);
    trailRepository = module.get<Repository<TrailEntity>>(getRepositoryToken(TrailEntity))
  });

  it('should be defined', () => {
    expect(trailService).toBeDefined();
    expect(trailRepository).toBeDefined();
  });
});
