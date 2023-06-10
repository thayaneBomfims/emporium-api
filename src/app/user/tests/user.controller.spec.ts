import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import * as mockUser from './mock.test'

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          findAll: jest.fn().mockResolvedValue(mockUser.userEntityList),
          create: jest.fn().mockResolvedValue(mockUser.newUserEntity),
          findOne: jest.fn(),
          update: jest.fn(),
          deleteById: jest.fn()
        }
      }]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('user index', () => {

    it('test should return user list entity successfuly', async () => {

      const userList = await userController.index();

      expect(userList).toEqual(mockUser.getAllReturn)
      expect(userService.findAll).toHaveBeenCalledTimes(1)
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      expect(userController.index()).rejects.toThrowError()
    })

  });

  describe('user create', () => {

    it('test should create new user successfuly', async () => {

      const result = await userController.create(mockUser.createBody)

      expect(result).toEqual(mockUser.createUserReturn);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(mockUser.createBody);
    })

    it('test should throw an exception when internal error server', async () => {

      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(userController.create(mockUser.createBody)).rejects.toThrowError()
    })

  })

});
