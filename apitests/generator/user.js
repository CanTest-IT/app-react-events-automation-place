import { faker } from '@faker-js/faker';

export const getRandomUser = () => {
    return {
        id: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: 19
    }
}