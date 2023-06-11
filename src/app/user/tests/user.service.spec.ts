import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import * as mockUser from './mock.test';
import { Repository } from 'typeorm';
import { NotFoundException, HttpStatus } from '@nestjs/common';
import { UserMessagesHelper } from '../../../helpers/messages.helper';

jest.mock('../../utils/passwordHash.ts', () => ({
  hashPassword: jest.fn((password: string) => {
    return Promise.resolve(`hashed-${password}`);
  }),
}));

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(mockUser.userEntityList),
            findOne: jest.fn().mockResolvedValue(mockUser.userEntityList[0]),
            create: jest.fn().mockResolvedValue(mockUser.newUserEntity),
            save: jest.fn().mockResolvedValue(mockUser.newUserEntity),
            merge: jest.fn().mockResolvedValue(mockUser.updatedUserEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('test should return a list of user entity successfuly', async () => {
      const result = await userService.findAll();
      expect(result).toEqual(mockUser.userEntityList);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('test should return a user entity successfuly', async () => {
      const result = await userService.findOne({ where: { id: '1' } });
      expect(result).toEqual(mockUser.userEntityList[0]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('test should throw an not found excpetion when user not found', () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      expect(userService.findOne({ where: { id: '3' } })).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      expect(
        userService.findOne({ where: { id: '1' } }),
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('test should create a new user entity successfuly', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await userService.create(mockUser.createBody);

      expect(result).toEqual(mockUser.newUserEntity);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      expect(userService.create(mockUser.createBody)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('test should update a user entity successfuly', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(mockUser.userEntityList[1]);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(mockUser.updatedUserEntity);

      const result = await userService.update(
        '2',
        mockUser.reqTokenParams,
        mockUser.userEntityList[1],
      );

      expect(result).toEqual(mockUser.updatedUserEntity);
      expect(userRepository.merge).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      expect(
        userService.update(
          '2',
          mockUser.reqTokenParams,
          mockUser.userEntityList[1],
        ),
      ).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('test should delete a user entity succesfully', async () => {
      const result = await userService.deleteById('1');

      expect(result).toBeUndefined();
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('test should throw an exception when internal error server', () => {
      jest.spyOn(userRepository, 'delete').mockRejectedValueOnce(new Error());

      expect(userService.deleteById('1')).rejects.toThrowError();
    });
  });
});
