import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

describe('AuthController', () => {
  let authController: AuthController;
  let articleService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            validateUser: jest.fn()
          }
        },
        {
          provide: LocalStrategy,
          useValue: {
            validate: jest.fn()
          }
        },
        {
          provide: JwtStrategy,
          useValue: {
            validate: jest.fn()
          }
        }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    articleService = module.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(articleService).toBeDefined();
  });
});
