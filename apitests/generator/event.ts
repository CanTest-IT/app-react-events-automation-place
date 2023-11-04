import { faker } from '@faker-js/faker';
import { Event} from '../../domain/event';
import ImagesService from '../../service/ImagesService';
import CategoryService from '../../service/CategoryService';

export const getRandomEvent = (): Event => {
    return {
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        category: faker.helpers.arrayElement(CategoryService.getCategoryCodes()),
        price: parseFloat(faker.number.float({ min: 10, max: 100 }).toFixed(2)),
        dateFrom: faker.date.future().toISOString(),
        dateTo: faker.date.future().toISOString(),
        image: faker.helpers.arrayElement(ImagesService.getImages()),
        isPremium: faker.datatype.boolean()
    }
}