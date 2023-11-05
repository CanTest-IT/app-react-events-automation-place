import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { EventWithId} from '../../domain/event';
import ImagesService from '../../service/ImagesService';
import CategoryService from '../../service/CategoryService';

export const getRandomEvent = (): EventWithId => {
    return {
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        category: faker.helpers.arrayElement(CategoryService.getCategoryCodes()),
        price: parseFloat(faker.number.float({ min: 10, max: 100 }).toFixed(2)),
        dateFrom: faker.date.future().toISOString(),
        dateTo: faker.date.future().toISOString(),
        image: faker.helpers.arrayElement(ImagesService.getImages()),
        isPremium: faker.datatype.boolean(),
        id: uuidv4()
    }
}