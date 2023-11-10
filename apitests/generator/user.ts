import { faker } from '@faker-js/faker';
import { User } from '../../domain/user';

export const getRandomUser = (): User => {
    return getRandomUserWithLogin(faker.internet.userName())
}

export const getRandomUserWithLogin = (login: string): User => {
    return {
        login,
        password: faker.internet.password(),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: 19
    }
}