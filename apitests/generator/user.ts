import { faker } from '@faker-js/faker';
import { User } from '../../domain/user';

export const getRandomUser = (): User => {
    return {
        id: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: 19
    }
}