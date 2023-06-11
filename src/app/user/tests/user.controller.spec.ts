import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import * as mockUser from './mock.test';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUser.userEntityList),
            create: jest.fn().mockResolvedValue(mockUser.newUserEntity),
            findOne: jest.fn().mockResolvedValue(mockUser.userEntityList[0]),
            update: jest.fn().mockResolvedValue(mockUser.updatedUserEntity),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('user index', () => {
    it('test should return user list entity successfuly', async () => {
      const userList = await userController.index();

      expect(userList).toEqual(mockUser.getAllReturn);
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      expect(userController.index()).rejects.toThrowError();
    });
  });

  describe('user create', () => {
    it('test should create new user successfuly', async () => {
      const result = await userController.create(mockUser.createBody);

      expect(result).toEqual(mockUser.createUserReturn);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(mockUser.createBody);
    });

    it('test should throw an exception when internal error server', async () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(userController.create(mockUser.createBody)).rejects.toThrowError();
    });
  });

  describe('user show', () => {
    it('test should return user entity successfuly', async () => {
      const user = await userController.show('1');

      expect(user).toEqual(mockUser.getOneReturn);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenLastCalledWith({
        where: { id: '1' },
      });
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

      expect(userController.show('1')).rejects.toThrowError();
    });
  });

  describe('user update', () => {
    it('test should update user successfuly', async () => {
      const result = await userController.update(
        '2',
        mockUser.userEntityList[1],
        mockUser.reqTokenParams,
      );

      expect(result).toEqual(mockUser.updateReturn);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith(
        '2',
        mockUser.reqTokenParams,
        mockUser.userEntityList[1],
      );
    });

    it('test should throw an exception when internal error server', async () => {
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      expect(
        userController.update(
          '2',
          mockUser.userEntityList[1],
          mockUser.reqTokenParams,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('user destroy', () => {
    it('test should return undefined when user entity delete successfuly', async () => {
      const user = await userController.destroy('1');

      expect(user).toBeUndefined();
      expect(userService.deleteById).toHaveBeenCalledTimes(1);
      expect(userService.deleteById).toHaveBeenLastCalledWith('1');
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userService, 'deleteById').mockRejectedValueOnce(new Error());

      expect(userController.destroy('1')).rejects.toThrowError();
    });
  });
});
