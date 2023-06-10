import { ReturnDto } from "src/app/utils/return.dto";
import { UserEntity } from "../entity/user.entity";
import { CreateUserDto } from "../dto/user.dto";
import { UserMessagesHelper } from "../../../helpers/messages.helper";

export const userEntityList: UserEntity[] = [
    new UserEntity({
        id: '1',
        name: 'fake-name',
        public_name: 'public-fake-name',
        email: 'fakeemail@fake.com',
        password: 'Fake!passw0rd',
        instagram: 'https://www.instagram.com/fake-name/',
        facebook: 'https://www.facebook.com/fake-name/',
        telegram: 'https://web.telegram.org/k/#-0000000',
        active: true
    }),
    new UserEntity({
        id: '2',
        name: 'fake-name2',
        public_name: 'public-fake-name2',
        email: 'fakeemail2@fake.com',
        password: 'Fake!passw0rd',
        instagram: 'https://www.instagram.com/fake-name/',
        facebook: 'https://www.facebook.com/fake-name/',
        telegram: 'https://web.telegram.org/k/#-0000000',
        active: false
    }),
]

export const getAllReturn: ReturnDto = {
    status: 200,
    records: userEntityList
}

export const getOneReturn: ReturnDto = {
    status: 200,
    records: userEntityList[0]
}

export const createBody: CreateUserDto = {
    name: 'test-name',
    email: 'testemail@test.com',
    password: 'Fake!passw0rd',
    public_name: 'public-test-name',
    instagram: 'https://www.instagram.com/fake-name/',
    facebook: 'https://www.facebook.com/fake-name/',
    telegram: 'https://web.telegram.org/k/#-0000000'
};

export const newUserEntity: UserEntity = new UserEntity({
    id: '1',
    active: true,
    name: 'test-name',
    email: 'testemail@test.com',
    password: 'Fake!passw0rd',
    public_name: 'public-test-name',
    instagram: 'https://www.instagram.com/fake-name/',
    facebook: 'https://www.facebook.com/fake-name/',
    telegram: 'https://web.telegram.org/k/#-0000000'
})

export const createUserReturn: ReturnDto = {
    status: 201,
    message: UserMessagesHelper.SUCCESS_USER,
    records: newUserEntity
}

export const updatedUserEntity: UserEntity = new UserEntity({
    id: '2',
    name: 'fake-name2',
    public_name: 'public-fake-name2',
    email: 'fakeemail2@fake.com',
    password: 'Fake!passw0rd',
    instagram: 'https://www.instagram.com/fake-name/',
    facebook: 'https://www.facebook.com/fake-name/',
    telegram: 'https://web.telegram.org/k/#-0000000',
    active: true
})

export const updateReturn: ReturnDto = {
    status: 200,
    message: UserMessagesHelper.SUCCESS_UPDATE_USER,
    records: updatedUserEntity
}